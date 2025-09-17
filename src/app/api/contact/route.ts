import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xvgqlaor";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

// Basic in-memory rate limiter (per-process). Suitable for small deployments.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window per IP
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const arr = ipHits.get(ip) || [];
  const recent = arr.filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function getClientIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const ip = (req.headers.get("x-real-ip") || "").trim();
  return ip || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    // Origin check (best-effort)
    const origin = req.headers.get("origin") || "";
    const host = req.headers.get("host") || "";
    if (origin && !origin.includes(host)) {
      // Reject obvious cross-site posts
      return NextResponse.json({ error: "Invalid origin" }, { status: 400 });
    }

    const formData = await req.formData();

    const name = String(formData.get("name") || "").slice(0, 200);
    const email = String(formData.get("email") || "").slice(0, 200);
    const message = String(formData.get("message") || "").slice(0, 5000);
    const honeypot = String(formData.get("_gotcha") || "");
    const ts = Number(formData.get("ts") || 0);
    const turnstileToken = String(formData.get("turnstileToken") || "");

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Honeypot: pretend success but ignore
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Minimum fill time (~1.5s)
    const now = Date.now();
    if (ts && now - ts < 1500) {
      return NextResponse.json({ error: "Form submitted too quickly" }, { status: 429 });
    }

    // Rate limit
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try later." }, { status: 429 });
    }

    // Turnstile verification
    if (!TURNSTILE_SECRET_KEY) {
      return NextResponse.json({ error: "Server misconfiguration (captcha secret)" }, { status: 500 });
    }
    if (!turnstileToken) {
      return NextResponse.json({ error: "Captcha required" }, { status: 400 });
    }
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: ip,
      }),
    });
    const verifyData = (await verifyRes.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!verifyData.success) {
      return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
    }

    // Forward to Formspree
    const forward = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (!forward.ok) {
      let msg = "Upstream error";
      try {
        const data = await forward.json();
        msg = (data as any)?.error || msg;
      } catch {}
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


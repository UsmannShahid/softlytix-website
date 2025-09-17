"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "success"; message: string } | { kind: "error"; message: string };

export default function Page() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [ts, setTs] = useState<number>(0);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Set form start timestamp on mount
  useEffect(() => {
    setTs(Date.now());
  }, []);

  // Render Turnstile when script is ready
  useEffect(() => {
    const w = window as any;
    let mounted = true;
    function tryRender() {
      if (!mounted) return;
      if (w && w.turnstile && containerRef.current && siteKey) {
        try {
          w.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => setCaptchaToken(token),
            "error-callback": () => setCaptchaToken(""),
            "expired-callback": () => setCaptchaToken(""),
            action: "contact",
            theme: "auto",
          });
          return;
        } catch {}
      }
      setTimeout(tryRender, 150);
    }
    tryRender();
    return () => {
      mounted = false;
    };
  }, [siteKey]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot bot trap
    const gotcha = String(formData.get("_gotcha") || "");
    if (gotcha) return;

    setStatus({ kind: "loading" });
    if (!captchaToken) {
      setStatus({ kind: "error", message: "Please complete the captcha" });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: (() => {
          formData.set("ts", String(ts));
          formData.set("turnstileToken", captchaToken);
          return formData;
        })(),
      });
      if (res.ok) {
        form.reset();
        setStatus({ kind: "success", message: "Thanks! We’ll get back to you shortly." });
      } else {
        let message = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          message = data?.error || message;
        } catch {}
        setStatus({ kind: "error", message });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-6 bg-white">
      {/* Turnstile script */}
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-16 items-stretch">
        {/* Contact Form */}
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">Let’s Talk</h1>
          <p className="text-lg text-[#374151] mb-8">
            Have a question or want to discuss a project? Drop us a message and we’ll get back within 24 hours.
          </p>

          <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Name</label>
              <Input id="name" name="name" type="text" required placeholder="Your name" className="rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" className="rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="message">Message</label>
              <Textarea id="message" name="message" rows={5} required placeholder="How can we help?" className="rounded-lg" />
            </div>
            {/* Honeypot */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="mb-3" ref={containerRef} />
            <div className="flex items-center gap-3">
              <motion.div
                animate={status.kind === "success" ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={status.kind === "loading"}
                  className={`rounded-full px-7 ${status.kind === "loading" ? "animate-pulse" : ""}`}
                >
                  {status.kind === "success" && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mr-1.5"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.span>
                  )}
                  {status.kind === "loading" ? "Sending…" : status.kind === "success" ? "Sent!" : "Send"}
                </Button>
              </motion.div>
              <div aria-live="polite" className="min-h-[1.25rem]">
                <AnimatePresence mode="wait">
                  {status.kind === "success" && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-green-600"
                    >
                      {status.message}
                    </motion.p>
                  )}
                  {status.kind === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-red-600"
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Info / Visual */}
        <Card className="bg-[#F9FAFB] p-0 rounded-xl shadow h-full">
          <CardContent className="p-8 text-left space-y-4 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-heading">Contact Info</h2>
            <p className="text-[#374151] text-sm">Softlytix AI Solutions</p>
            <p className="text-[#374151] text-sm">support@softlytix.com</p>
            <p className="text-[#374151] text-sm">+1 (123) 456-7890</p>
            <hr className="my-4" />
            <p className="text-[#374151] text-sm">We're based in Lahore, Pakistan but work with clients worldwide.</p>
            <div className="mt-4 w-full max-h-64 flex-1 flex items-end">
              <Image
                src="/undraw_contact-us_kcoa.svg"
                alt="Contact illustration"
                width={640}
                height={320}
                className="w-full object-contain"
                priority={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

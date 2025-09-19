"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Globe,
  Workflow,
  Boxes,
  Bot,
  Mail,
  ChevronLeft,
  ChevronRight,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type Service = {
  id: string;
  icon: LucideIcon;
  labelTop: string;
  labelBottom: string;
  title: string;
  description: string;
  useCases: string[];
  href: string;
};

export const services: readonly Service[] = [
  {
    id: "webapps",
    icon: Globe,
    labelTop: "AI Websites",
    labelBottom: "& Web Apps",
    title: "AI Websites & Web Apps",
    description:
      "Launch a site or app that answers questions, books meetings, and adapts to each visitor — without adding headcount.",
    useCases: [
      "24/7 booking and instant FAQs via AI chat.",
      "Personalized pages that convert better by visitor intent.",
      "In‑app AI assistant that guides users to success.",
    ],
    href: "/contact",
  },
  {
    id: "automation",
    icon: Workflow,
    labelTop: "Workflow",
    labelBottom: "Automation",
    title: "Workflow Automation",
    description:
      "Remove busywork. Let AI handle follow‑ups, data entry, and reporting so your team stays focused.",
    useCases: [
      "7–10 hours/week saved with automated client reports.",
      "Requests triaged and routed to the right team automatically.",
      "Daily plain‑English summaries to Slack or email.",
    ],
    href: "/contact",
  },
  {
    id: "saas",
    icon: Boxes,
    labelTop: "Custom AI",
    labelBottom: "SaaS Products",
    title: "Custom AI SaaS Products",
    description:
      "Validate and launch a focused AI product fast — from concept and UX to billing and deployment.",
    useCases: [
      "Resume builder tailored to job seekers.",
      "Niche lead finder with automatic AI scoring.",
      "Vertical‑specific knowledge assistant that learns your domain.",
    ],
    href: "/contact",
  },
  {
    id: "voice",
    icon: Bot,
    labelTop: "Voice",
    labelBottom: "Chatbots",
    title: "Voice Chatbots",
    description: "Answer chats and calls instantly. Book, qualify, and support customers with natural voice and chat.",
    useCases: [
      "Property inquiries answered 24/7 with helpful context.",
      "Phone agent books and confirms appointments for you.",
      "Smart IVR that deflects Tier‑1 support calls.",
    ],
    href: "/contact",
  },
  {
    id: "crm",
    icon: Mail,
    labelTop: "AI Email",
    labelBottom: "& CRM Assistants",
    title: "AI Email & CRM Assistants",
    description:
      "Keep your pipeline moving — draft, score, and follow up with context pulled straight from your CRM.",
    useCases: [
      "Auto‑draft replies that match your tone and context.",
      "Lead scoring and routing to the right owner.",
      "Long threads summarized into crisp deal notes.",
    ],
    href: "/contact",
  },
] as const;

export default function ServicesTabs() {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(services[0].id);
  const [focusIndex, setFocusIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tablistRef = useRef<HTMLDivElement | null>(null);

  // Respond to search param changes (e.g., header links to a specific service)
  useEffect(() => {
    const fromQuery = searchParams?.get("service");
    if (!fromQuery) return;
    if (fromQuery === active) return;
    const idx = services.findIndex((s) => s.id === fromQuery);
    if (idx >= 0) {
      setActive(services[idx].id);
      setFocusIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    // Initialize from URL (?service=...) or hash (#service=...)
    const fromQuery = searchParams?.get("service");
    let fromHash: string | null = null;
    if (typeof window !== "undefined") {
      const m = window.location.hash.match(/service=([^&]+)/);
      fromHash = m ? decodeURIComponent(m[1]) : null;
    }
    const candidate = fromQuery || fromHash;
    if (candidate) {
      const idx = services.findIndex((s) => s.id === candidate);
      if (idx >= 0) {
        setActive(services[idx].id);
        setFocusIndex(idx);
        // Scroll the selected into view on mobile
        setTimeout(() => tabRefs.current[idx]?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", inline: "center", block: "nearest" }), 0);
      }
    }
    // Ensure focus index is valid when list changes
    setFocusIndex((i) => Math.min(Math.max(i, 0), services.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIndex = useMemo(
    () => services.findIndex((s) => s.id === active),
    [active]
  );

  const moveToIndex = (next: number, select = true) => {
    const clamped = (next + services.length) % services.length;
    setFocusIndex(clamped);
    if (select) setActive(services[clamped].id);
    const el = tabRefs.current[clamped];
    try {
      (el as any)?.focus?.({ preventScroll: true });
    } catch {
      el?.focus();
    }
    // Center the focused/active tab in view on small screens
    if (tablistRef.current && el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      if (e.key === "ArrowRight") moveToIndex(focusIndex + 1, false);
      if (e.key === "ArrowLeft") moveToIndex(focusIndex - 1, false);
      if (e.key === "Home") moveToIndex(0, false);
      if (e.key === "End") moveToIndex(services.length - 1, false);
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(services[focusIndex].id);
    }
  };

  const panelId = `services-panel-${active}`;
  const tablistId = "services-tablist";
  const [copied, setCopied] = useState(false);

  // Update URL on selection (shareable & restorable)
  useEffect(() => {
    // Keep URL in sync for deep-linking without forcing a section hash
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("service", active);
    // Preserve current hash; do not force "#solutions" to avoid jumping on refresh
    window.history.replaceState({}, "", url.toString());
  }, [active]);

  return (
    <div className="w-full">
      {/* Segmented track with mobile nav controls */}
      <div className="relative">
        {/* Mobile nav arrows */}
        <div className="md:hidden flex items-center justify-between mb-3">
          <button
            aria-label="Previous service"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm"
            onClick={() => moveToIndex(focusIndex - 1)}
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          <button
            aria-label="Next service"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm"
            onClick={() => moveToIndex(focusIndex + 1)}
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex justify-center">
          <div
            id={tablistId}
            ref={tablistRef}
            role="tablist"
            aria-label="Services"
            className={cn(
              "inline-flex items-stretch gap-0",
              "rounded-2xl bg-white border border-gray-200 p-1 md:p-1.5 shadow-sm",
              "overflow-x-auto md:overflow-visible max-w-full",
              "[scrollbar-width:none]",
              "focus:outline-none"
            )}
            style={{ WebkitOverflowScrolling: "touch" }}
            onKeyDown={onKeyDown}
          >
              {services.map((s, i) => {
                const selected = s.id === active;
                const TabIcon = s.icon;
                const tabId = `tab-${s.id}`;
                return (
              <div key={s.id}>
                <button
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={tabId}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={i === focusIndex ? 0 : -1}
                  onClick={() => {
                    setActive(s.id);
                    setFocusIndex(i);
                  }}
                  onFocus={() => setFocusIndex(i)}
                  className={cn(
                    "relative isolate inline-flex select-none items-center justify-center",
                    "h-16 md:h-20 min-w-[120px] md:min-w-[160px] px-3 md:px-4",
                    "transition-colors",
                    selected ? "text-white" : "text-gray-600",
                    // Rounded ends to match connected segmented control
                    i === 0 ? "rounded-l-xl" : "",
                    i === services.length - 1 ? "rounded-r-xl" : "",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  )}
                >
                  {/* selection background */}
                  {selected && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : "active-pill"}
                      className="absolute inset-0 -z-10 rounded-xl bg-[#0B1220] shadow-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <motion.span
                    className="flex flex-col items-center justify-center gap-1"
                    initial={false}
                    animate={{ scale: selected ? 1.0 : 1.0 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: selected ? 1.0 : 1.02 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  >
                    <TabIcon
                      className={cn("h-5 w-5", selected ? "text-white" : "text-gray-500")}
                    />
                    <span className="leading-tight text-[12px] md:text-[13px] font-medium text-center">
                      {s.labelTop}
                      <br />
                      <span className={cn("font-normal", selected ? "text-white/90" : "text-gray-500")}>{s.labelBottom}</span>
                    </span>
                  </motion.span>
                </button>
              </div>
              );
            })}
          </div>
        </div>

        {/* Hide scrollbar visually for WebKit */}
        <style jsx>{`
          #${tablistId}::-webkit-scrollbar { display: none; height: 0; }
        `}</style>
      </div>

      {/* Tab panel */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-6 md:mt-8"
      >
        <motion.div
          key={active}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-auto max-w-3xl"
        >
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-sm p-6 md:p-7">
            <h3 className="text-xl md:text-2xl font-semibold text-heading mb-2 text-center">
              {services[activeIndex]?.title}
            </h3>
            <p className="text-[#374151] text-center mb-5">
              {services[activeIndex]?.description}
            </p>
            <ul className="text-[#374151] grid gap-2 text-sm md:text-[15px] list-disc pl-5">
              {services[activeIndex]?.useCases.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                <Link href={services[activeIndex]?.href ?? "/contact"}>Get Started</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (typeof window === "undefined") return;
                  const url = new URL(window.location.href);
                  url.searchParams.set("service", services[activeIndex]?.id ?? "");
                  url.hash = "solutions";
                  navigator.clipboard
                    .writeText(url.toString())
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    })
                    .catch(() => {});
                }}
                aria-label="Copy link to this service"
                title="Copy link to this service"
              >
                <Share2 className="h-4 w-4" /> {copied ? "Copied" : "Share"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

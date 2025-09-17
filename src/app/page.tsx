"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { Bot, RotateCcw, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const floatY = {
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const services = [
  {
    icon: Bot,
    title: "AI Lead Qualification",
    description:
      "Smart chatbots that qualify leads, answer FAQs, and route hot prospects to your inbox.",
    delay: 0,
  },
  {
    icon: RotateCcw,
    title: "Workflow Automation",
    description:
      "Automate repetitive admin like follow-ups, reminders, onboarding, and scheduling with AI agents.",
    delay: 0.1,
  },
  {
    icon: Mail,
    title: "AI Email Assistant",
    description:
      "Train an agent to send personalized emails based on your offers, lead data, and past messages.",
    delay: 0.2,
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Prevent browser scroll anchoring/restoration from loading slightly scrolled
    if (typeof window !== "undefined") {
      const { history } = window;
      const prev = (history as any).scrollRestoration;
      try {
        (history as any).scrollRestoration = "manual";
      } catch {}
      // Ensure we land at the very top on initial mount
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      // Restore previous behavior on unmount
      return () => {
        try {
          (history as any).scrollRestoration = prev ?? "auto";
        } catch {}
      };
    }
  }, []);
  return (
    <>
      {/* Lottie web component loader */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      {/* Hero Section */}
      <section
        className="relative overflow-hidden hero-scroll text-center px-6 bg-[#0B1220]"
        style={{ overflowAnchor: "none" }}
      >
        {/* Dark nebula glows */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-primary-dark/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Subtle starfield and meteor (client-only to avoid SSR randomness) */}
        {mounted && <Stars />}
        {mounted && <Meteor />}

        <div className="relative pt-24 sm:pt-28 pb-16 max-w-6xl mx-auto flex flex-col items-center justify-center gap-10 min-h-[70vh]">
          <motion.div
            className="w-full max-w-3xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-5 md:mb-7 leading-tight text-white"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              AI-Powered Solutions for Modern Business
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-5 md:mb-7"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Softlytix delivers smart tools that help you move faster, work
              smarter, and grow stronger.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              <Link
                href="/about"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Learn more
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 text-sm text-gray-400"
            >
              Trusted by founders, coaches, and agencies.
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {mounted && <LottiePlayer />}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-[#F9FAFB] text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_ai-agent_pdkp.svg"
                alt=""
                width={140}
                height={140}
                className="mx-auto w-36"
                priority={false}
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
              What We Offer
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Automations that free your time and elevate customer experience.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                transition={{ delay: service.delay }}
              >
                <Card className="group bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200/70 hover:ring-primary/30 transition-all duration-300 h-full hover:-translate-y-0.5">
                  <CardContent className="p-0 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-heading">{service.title}</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_screen-time_f7ev.svg"
                alt=""
                width={140}
                height={140}
                className="mx-auto w-36"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
              Built to Empower Service Businesses with AI
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#374151] text-lg mb-6">
              Softlytix is your partner in intelligent automation—helping coaches,
              agencies, and creators save time, grow faster, and work smarter with
              AI-powered tools tailored to their workflow.
            </p>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
            >
              <Link
                href="/about"
                className="inline-block text-primary font-semibold hover:underline underline-offset-4"
              >
                Learn more about our mission →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-[#F9FAFB] text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_testimonials_4c7y.svg"
                alt=""
                width={140}
                height={140}
                className="mx-auto w-36"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200/70">
              <CardContent className="p-0">
                <p className="relative text-[#374151] text-lg italic mb-4">
                  <span className="absolute -left-4 -top-3 text-3xl text-primary/30" aria-hidden>
                    “
                  </span>
                  Softlytix automated 80% of our admin work. Now we focus on
                  growth instead of chasing leads. Game‑changer!
                </p>
                <p className="font-semibold text-[#004B87]">— Alex R., Founder at LaunchCo</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_sign-up_qamz.svg"
                alt=""
                width={140}
                height={140}
                className="mx-auto w-36"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-2">
              Ready to Automate Your Workflow?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#374151] text-lg mb-6">
              Let's explore how Softlytix can help you save time and scale smarter with tailored AI.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md"
              >
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Lottie player wrapper (client only)
function LottiePlayer() {
  // Use the user-provided local file (space encoded)
  const src = "/animations/AI%20Tools.json";

  return (
    <div className="relative">
      {/* @ts-expect-error - custom element provided by lottiefiles script */}
      <lottie-player
        autoplay
        loop
        mode="normal"
        background="transparent"
        speed="0.6"
        src={src}
        aria-label="Animated illustration of AI enhancing business workflows"
        style={{
          width: "100%",
          height: "clamp(220px, 38vw, 340px)",
          maxWidth: "520px",
          margin: "0 auto",
          opacity: 0.95,
        }}
        className="block"
      />
      {/* subtle glow behind for theme harmony */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-primary/10 to-primary-dark/10 blur-xl" />
    </div>
  );
}

// Starfield background using Framer Motion (client-only)
function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60 + 5,
      size: Math.random() * 1.8 + 0.6,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 8px rgba(255,255,255,0.35)",
          }}
          initial={{ opacity: 0.28 }}
          animate={{ opacity: [0.22, 0.5, 0.28] }}
          transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Shooting meteor inspired by the requested dark hero reference
function Meteor() {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      initial={{ x: 240, y: 0, rotate: -35, opacity: 0 }}
      animate={{ x: -240, y: 0, opacity: [0, 0.7, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 10.5, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="w-44 h-[2px] bg-gradient-to-l from-white/0 via-white/60 to-white/90 rounded-full" />
        <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_12px_3px_rgba(255,255,255,0.7)]" />
      </div>
    </motion.div>
  );
}

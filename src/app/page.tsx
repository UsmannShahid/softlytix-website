"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { Globe, RotateCcw, Rocket, MessageCircle, Mail } from "lucide-react";
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

// services grid (legacy) removed per updated design

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
              className="text-4xl md:text-6xl font-heading font-bold mb-5 md:mb-7 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white/95 to-primary/90"
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
              We build intelligent websites, apps, automations, and SaaS products that help you save time, serve customers better, and grow faster.
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
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href="#solutions">Explore Solutions</Link>
              </Button>
            </motion.div>

            {/* Removed trusted-by line per request */}
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
      <section id="solutions" className="py-20 px-6 bg-[#F9FAFB] text-center">
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
                width={180}
                height={180}
                className="mx-auto w-44"
                priority={false}
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
              Smart Solutions Tailored to Your Business
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              From AI-powered websites to custom SaaS products, we design tools that solve real problems for service businesses, startups, and agencies.
            </p>
          </motion.div>

          {/* Solution Blocks with Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={staggerContainer}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-center">
              {/* AI Websites & Web Apps */}
              <motion.div
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="w-full max-w-sm md:col-span-2 lg:col-span-1"
              >
                <Card className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                  <CardContent className="relative p-0">
                    <motion.div
                      className="mb-4 inline-grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Globe className="w-8 h-8" aria-hidden />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-heading">AI Websites & Web Apps</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      Create websites and apps enhanced with AI features like chatbots, personalization, and analytics.
                    </p>
                    <p className="mt-3 text-sm text-[#004B87] font-medium">Use case</p>
                    <p className="text-sm text-[#374151]">A coaching website that books appointments and answers FAQs 24/7.</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Workflow Automation */}
              <motion.div
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="w-full max-w-sm md:col-span-2 lg:col-span-1"
              >
                <Card className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                  <CardContent className="relative p-0">
                    <motion.div
                      className="mb-4 inline-grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <RotateCcw className="w-8 h-8" aria-hidden />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-heading">Workflow Automation</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      Eliminate repetitive tasks with AI-driven automation—from follow-ups to reporting.
                    </p>
                    <p className="mt-3 text-sm text-[#004B87] font-medium">Use case</p>
                    <p className="text-sm text-[#374151]">An agency automates client reports, saving 10+ hours every month.</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Custom AI SaaS Products */}
              <motion.div
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="w-full max-w-sm md:col-span-2 lg:col-span-1"
              >
                <Card className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                  <CardContent className="relative p-0">
                    <motion.div
                      className="mb-4 inline-grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Rocket className="w-8 h-8" aria-hidden />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-heading">Custom AI SaaS Products</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      Build and launch scalable AI SaaS platforms—from idea to deployment.
                    </p>
                    <p className="mt-3 text-sm text-[#004B87] font-medium">Use case</p>
                    <p className="text-sm text-[#374151]">An entrepreneur creates an AI-powered resume builder SaaS for job seekers.</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Voice & Chat AI Assistants */}
              <motion.div
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="w-full max-w-sm md:col-span-2 lg:col-span-1"
              >
                <Card className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                  <CardContent className="relative p-0">
                    <motion.div
                      className="mb-4 inline-grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <MessageCircle className="w-8 h-8" aria-hidden />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-heading">Voice & Chat AI Assistants</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      Engage customers with conversational AI via chat or voice.
                    </p>
                    <p className="mt-3 text-sm text-[#004B87] font-medium">Use case</p>
                    <p className="text-sm text-[#374151]">A real estate business uses a voice chatbot to answer property inquiries anytime.</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Email & CRM Assistants */}
              <motion.div
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="w-full max-w-sm md:col-span-2 lg:col-span-1"
              >
                <Card className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                  <CardContent className="relative p-0">
                    <motion.div
                      className="mb-4 inline-grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Mail className="w-8 h-8" aria-hidden />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-heading">AI Email & CRM Assistants</h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      Personalize outreach and manage leads directly in your CRM.
                    </p>
                    <p className="mt-3 text-sm text-[#004B87] font-medium">Use case</p>
                    <p className="text-sm text-[#374151]">A startup uses AI to re-engage cold leads and boost conversions.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Removed legacy services grid per updated design */}
        </div>
      </section>

      {/* Demo / Apps Showcase */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_browsing_z5g5.svg"
                alt=""
                width={180}
                height={180}
                className="mx-auto w-44"
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
              Explore What We're Building
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              We’re continuously building AI tools to solve everyday business challenges. Here’s our first demo:
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 text-left">
            <Card className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-gray-200/70 h-full">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-heading mb-1">AI Voice Chat App</h3>
                <p className="text-sm text-[#374151] mb-4">Experience real-time conversations powered by AI.</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white">
                  <Link href="/demo/voice-chat">Try the Demo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <motion.div className="mb-8" variants={floatY} aria-hidden>
              <Image
                src="/undraw_profile_d7qw.svg"
                alt=""
                width={180}
                height={180}
                className="mx-auto w-44"
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
              Our Mission
            </h2>
            <p className="text-[#374151] text-lg">
              We believe AI should empower, not replace. Our mission is to help businesses save time, scale faster, and keep the human touch intact by combining custom solutions with powerful AI.
            </p>
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
                width={180}
                height={180}
                className="mx-auto w-44"
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
                width={180}
                height={180}
                className="mx-auto w-44"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-2">
              Ready to Build Smarter with AI?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#374151] text-lg mb-6">
              Let’s explore how we can design the right AI-powered solution for your business.
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
                <Link href="/contact">Contact Us</Link>
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
      initial={{ x: 340, y: -180, rotate: -45, opacity: 0 }}
      animate={{ x: -340, y: 220, opacity: [0, 0.7, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 10.5, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="w-44 h-[2px] bg-gradient-to-l from-white/0 via-white/60 to-white/90 rounded-full" />
        <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_12px_3px_rgba(255,255,255,0.7)]" />
      </div>
    </motion.div>
  );
}

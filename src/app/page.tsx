"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, RotateCcw, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
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
  return (
    <>
      {/* Hero Section */}
      <section className="hero-scroll bg-gradient-to-br from-[#E0F3FC] via-[#FFFFFF] to-[#FFFFFF] text-center md:text-left px-6">
        <div className="pt-20 sm:pt-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="md:w-1/2"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold text-heading mb-6 md:mb-8 leading-tight"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              AI-Powered Solutions for Modern Business
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-[#374151] mb-6 md:mb-8"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Softlytix delivers smart tools that help you move faster, work smarter, and grow stronger.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full shadow">
                <Link href="/contact">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/Spotflytix Hero Image.png"
              alt="Softlytix AI Illustration"
              width={500}
              height={400}
              className="w-full max-w-md mx-auto md:mx-0"
              priority
            />
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
            <motion.div
              className="mb-12"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            >
              <Image
                src="/undraw_ai-agent_pdkp.svg"
                alt="AI Agent Graphic"
                width={160}
                height={160}
                className="mx-auto w-40"
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-12">
              What We Offer
            </h2>
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
                <Card className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 h-full">
                  <CardContent className="p-0 text-center">
                    <service.icon className="w-10 h-10 mx-auto text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-heading">{service.title}</h3>
                    <p className="text-[#374151] text-sm">{service.description}</p>
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
            <motion.div
              className="mb-12"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
            >
              <Image
                src="/undraw_screen-time_f7ev.svg"
                alt="Screen Time Graphic"
                width={160}
                height={160}
                className="mx-auto w-40"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-12">
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
              Softlytix is your partner in intelligent automation — helping coaches, agencies, and creators save time, grow faster, and work smarter with AI-powered tools tailored to their workflow.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link href="/about" className="inline-block text-primary font-semibold hover:underline transition-colors duration-200">
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
            <motion.div
              className="mb-12"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 2 }}
            >
              <Image
                src="/undraw_testimonials_4c7y.svg"
                alt="Testimonial Graphic"
                width={160}
                height={160}
                className="mx-auto w-40"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-12">
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white p-6 rounded-xl shadow-md">
              <CardContent className="p-0">
                <p className="text-[#374151] text-lg italic mb-4">
                  "Softlytix automated 80% of our admin work. Now we focus on growth instead of chasing leads. Game-changer!"
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
            <motion.div
              className="mb-12"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 3 }}
            >
              <Image
                src="/undraw_sign-up_qamz.svg"
                alt="Signup Graphic"
                width={160}
                height={160}
                className="mx-auto w-40"
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full shadow">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Handshake, Activity } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
};

export default function Page() {
  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Intro */}
      <section className="pt-28 sm:pt-32 pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-16 items-center">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-4">
              About Softlytix
            </h1>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            variants={fadeInUp}
          >
            <p className="text-lg text-[#374151] leading-relaxed">
              We’re a team passionate about empowering service businesses with AI.
              Our tools help you automate tasks, personalize communication, and
              scale operations — without hiring a full tech team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 px-6 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-1 md:order-none"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/undraw_visionary-technology_f6b3.svg"
              alt="Visionary technology illustration"
              width={640}
              height={480}
              className="w-full max-w-md mx-auto md:mx-0"
              priority={false}
            />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-[#374151] leading-relaxed">
              We envision a world where automation isn’t cold or robotic — but
              personalized, intuitive, and empowering. Softlytix helps small
              businesses compete with enterprise capabilities using AI tools that
              think and act like team members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ethical Values */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-heading mb-12"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            Our Ethical Values
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              variants={fadeInUp}
            >
              <Card className="bg-[#F9FAFB] p-6 rounded-xl shadow-sm ring-1 ring-gray-200/70 hover:shadow transition text-center">
                <CardContent className="p-0">
                  <div className="w-10 h-10 mx-auto mb-4 grid place-items-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-heading mb-2">Trust & Transparency</h3>
                  <p className="text-sm text-[#374151]">
                    We build systems you can rely on — with clear data usage,
                    control, and AI behavior.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              variants={fadeInUp}
            >
              <Card className="bg-[#F9FAFB] p-6 rounded-xl shadow-sm ring-1 ring-gray-200/70 hover:shadow transition text-center">
                <CardContent className="p-0">
                  <div className="w-10 h-10 mx-auto mb-4 grid place-items-center rounded-full bg-primary/10 text-primary">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-heading mb-2">Human-Centered Design</h3>
                  <p className="text-sm text-[#374151]">
                    Our tools are designed to enhance — not replace — human
                    creativity and relationships.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              variants={fadeInUp}
            >
              <Card className="bg-[#F9FAFB] p-6 rounded-xl shadow-sm ring-1 ring-gray-200/70 hover:shadow transition text-center">
                <CardContent className="p-0">
                  <div className="w-10 h-10 mx-auto mb-4 grid place-items-center rounded-full bg-primary/10 text-primary">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-heading mb-2">Responsible Automation</h3>
                  <p className="text-sm text-[#374151]">
                    We automate ethically — ensuring fairness, relevance, and
                    positive impact in every workflow.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-[#F9FAFB] text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            Stay Ahead with AI Insights
          </motion.h2>
          <motion.p
            className="text-lg text-[#374151] mb-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            variants={fadeInUp}
          >
            Subscribe to our monthly newsletter for the latest in AI automation,
            tools, and strategies for service businesses.
          </motion.p>

          <motion.form
            onSubmit={onSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            variants={fadeInUp}
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 rounded-full"
            />
            <Button type="submit" className="rounded-full bg-primary hover:bg-primary-dark">
              Subscribe
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  );
}

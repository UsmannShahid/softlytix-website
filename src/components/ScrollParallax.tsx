"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  y?: [number, number];
  opacity?: [number, number];
  scale?: [number, number];
  className?: string;
};

// Simple reusable scroll-parallax wrapper.
// Uses element's viewport progress to map to transforms.
export default function ScrollParallax({ children, y = [16, -8], opacity = [0.8, 1], scale, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const translateY = useTransform(scrollYProgress, [0, 1], y);
  const op = useTransform(scrollYProgress, [0, 1], opacity);
  const sc = scale ? useTransform(scrollYProgress, [0, 1], scale) : undefined;

  return (
    <motion.div ref={ref} style={{ y: translateY, opacity: op, scale: sc }} className={className}>
      {children}
    </motion.div>
  );
}


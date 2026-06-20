"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-margin-mobile md:px-margin-desktop">
      {/* Decorative blur orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-4 py-1.5 rounded-full font-medium text-sm mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
          100% Live &amp; Interactive
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-[40px] md:text-5xl lg:text-6xl font-bold text-on-background leading-[1.1] tracking-tight mb-6"
        >
          Simple AI. Learn AI using AI.{" "}
          <span className="text-primary-container">No Code. No Complexity.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10"
        >
          100% Live, practical, and Simple training. Learn how to use advanced AI
          tools through real-world examples that save you hours every single week.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeInUp}>
          <a
            href="https://chat.whatsapp.com/G9Rk7RvcygFJ5t5I2Y5ur3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-container to-secondary-container/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-transform hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <MessageCircle size={22} />
            Join the Live WhatsApp Community
          </a>
        </motion.div>

        {/* Hero video card */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="relative bg-white rounded-2xl shadow-card border border-outline-variant/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-container/5 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-center gap-0">
              <div className="flex-1 p-8 md:p-12 space-y-4">
                <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Live Session Preview
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-on-background">
                  Practical Automation for Content Teams
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Watch as we build a complete content pipeline using modern AI tools
                  — from ideation to published draft in under 15 minutes.
                </p>
              </div>
              <div className="w-full md:w-[480px] lg:w-[560px] p-6 md:p-8 md:pl-0">
                <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 bg-black">
                  <video
                    className="w-full h-auto aspect-video object-cover"
                    poster="/videos/poster.jpg"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Simple AI Academy introduction video"
                  >
                    <source
                      src="/videos/SimpleAi Intro optimized.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MessageCircle } from "lucide-react";

export default function HeroSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-margin-mobile md:px-margin-desktop">
      {/* Decorative blur orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        key={lang}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-[40px] md:text-5xl lg:text-6xl font-bold text-on-background leading-[1.1] tracking-tight mb-6"
        >
          {t("hero.headline")}{" "}
          <span className="text-primary-container">{t("hero.headlineAccent")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10"
        >
          {t("hero.subheadline")}
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
            {t("hero.cta")}
          </a>
        </motion.div>

        {/* Hero video */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-black">
            <video
              className="w-full h-auto aspect-video object-cover"
              poster="/videos/poster.jpg"
              controls
              playsInline
              preload="metadata"
              aria-label={t("hero.videoLabel")}
            >
              <source
                src="/videos/SimpleAi Intro optimized.mp4"
                type="video/mp4"
              />
              {t("hero.videoFallback")}
            </video>
            {/* Top label bar */}
            <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-6 py-3">
              <p className="text-white text-sm font-medium text-center">
                {t("hero.videoLabel")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-on-surface-variant text-sm">
            {t("hero.videoCaption")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

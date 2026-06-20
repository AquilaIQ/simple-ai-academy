"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Tv, CheckCircle, Zap } from "lucide-react";

export default function CoreValuesSection() {
  const { t, lang } = useLanguage();

  const values = [
    {
      icon: Tv,
      title: t("values.title1"),
      body: t("values.body1"),
    },
    {
      icon: CheckCircle,
      title: t("values.title2"),
      body: t("values.body2"),
    },
    {
      icon: Zap,
      title: t("values.title3"),
      body: t("values.body3"),
    },
  ];

  return (
    <section
      id="values"
      className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface-container-low"
    >
      <div className="max-w-container-max mx-auto">
        <motion.div
          key={lang}
          className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={scaleIn}
              custom={index}
              whileHover={{ y: -4 }}
              className="bg-white p-10 rounded-2xl shadow-card border border-outline-variant/30 transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-primary mb-6">
                <value.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                {value.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {value.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

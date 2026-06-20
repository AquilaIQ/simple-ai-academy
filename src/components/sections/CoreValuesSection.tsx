"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { Tv, CheckCircle, Zap } from "lucide-react";

const values = [
  {
    icon: Tv,
    title: "100% Live Sessions",
    body: "No boring pre-recorded lectures. Ask questions and see AI tools run in real-time.",
  },
  {
    icon: CheckCircle,
    title: "Dead Simple Examples",
    body: "We skip the heavy tech jargon. If you can type a text message, you can master these tools.",
  },
  {
    icon: Zap,
    title: "Instant Utility",
    body: "Every tool we showcase is selected to solve everyday problems, automate tasks, and amplify your output.",
  },
];

export default function CoreValuesSection() {
  return (
    <section
      id="values"
      className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface-container-low"
    >
      <div className="max-w-container-max mx-auto">
        <motion.div
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

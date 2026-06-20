"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function FooterSection() {
  return (
    <footer
      id="faq"
      className="bg-surface-container-low border-t border-outline-variant/30"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            Ready to simplify your work?
          </h2>
          <a
            href="https://chat.whatsapp.com/G9Rk7RvcygFJ5t5I2Y5ur3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary-container transition-colors group text-lg"
          >
            <MessageCircle size={20} />
            Join the WhatsApp Community
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <div className="w-full h-px bg-outline-variant/30 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-on-surface-variant text-sm font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} The Simple AI Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-on-surface-variant text-sm font-medium hover:text-secondary-container transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-on-surface-variant text-sm font-medium hover:text-secondary-container transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-on-surface-variant text-sm font-medium hover:text-secondary-container transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

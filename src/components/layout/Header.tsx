"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Values", href: "#values" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-200 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-outline-variant/30 py-3 shadow-sm"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <nav
          className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="text-xl font-bold text-primary tracking-tight"
            aria-label="Simple AI Academy Home"
          >
            Simple AI Academy
          </a>

          <div className="hidden md:flex items-center gap-gutter">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-container text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all hover:opacity-90 shadow-md"
            >
              Join WhatsApp
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[49] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
          <span id="mobile-menu-title" className="text-lg font-bold text-primary">
            Menu
          </span>
          <button
            aria-label="Close menu"
            className="text-on-surface-variant p-2"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary font-medium text-base py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-secondary-container text-white px-6 py-3 rounded-lg font-medium text-base transition-all hover:opacity-90 shadow-md"
            onClick={() => setMobileOpen(false)}
          >
            Join the Live WhatsApp Community
          </a>
        </div>
      </div>
    </>
  );
}

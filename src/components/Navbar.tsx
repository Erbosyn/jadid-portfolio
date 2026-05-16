"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "kk" ? "ru" : "kk");
  };

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.portfolio, href: "#portfolio" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-white/10 py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
          JADID<span className="text-[#00d2ff]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white hover:text-glow transition-all"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all glass px-3 py-1.5 rounded-full"
          >
            <Globe size={16} />
            {locale.toUpperCase()}
          </button>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-[#00d2ff] transition-all"
          >
            {t.nav.admin}
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLocale} className="text-gray-300">
            {locale.toUpperCase()}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full glass border-b border-white/10 py-4 px-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-lg"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-[#00d2ff] text-lg"
          >
            {t.nav.admin}
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

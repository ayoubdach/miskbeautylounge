import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Calendar } from "lucide-react";
import { cn } from "../utils/cn";

const navLinks = [
  { label: "Prestations", href: "#prestations" },
  { label: "Galerie", href: "#gallery" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

interface NavbarProps {
  onOpenBookingWizard: () => void;
  onOpenQuiz: () => void;
}

export function Navbar({ onOpenBookingWizard, onOpenQuiz }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 1.8 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
          scrolled ? "glass shadow-[0_1px_30px_rgba(59,34,49,0.12)]" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 transition-all duration-400 lg:px-8">
          <div className="flex items-center gap-6">
            <a href="#" className="group">
              <h1
                className={cn(
                  "font-display font-normal tracking-[1.5px] transition-all duration-300",
                  scrolled ? "text-[22px]" : "text-[26px]"
                )}
                style={{
                  color: scrolled ? "var(--rich-rose)" : "#ffffff",
                  textShadow: scrolled ? "none" : "0 2px 12px rgba(59, 34, 49, 0.5)",
                }}
              >
                Misk Beauty Lounge
              </h1>
              <p
                className="mt-1 font-sans text-[8px] font-medium uppercase tracking-[4px]"
                style={{ color: scrolled ? "var(--pre-dawn-sky)" : "var(--island-sunset)" }}
              >
                Institut d'Excellence · Menzah5
              </p>
            </a>

            {/* Live Opening Pill */}
            <div
              className="hidden xl:flex items-center gap-2 rounded-full border px-3.5 py-1 backdrop-blur-md"
              style={{
                backgroundColor: scrolled ? "rgba(232, 148, 195, 0.15)" : "rgba(255, 255, 255, 0.08)",
                borderColor: scrolled ? "rgba(232, 148, 195, 0.3)" : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[1px]" style={{ color: scrolled ? "var(--rich-rose)" : "#FFFFFF" }}>
                Actuellement Ouvert
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-sans text-xs font-medium uppercase tracking-[1.5px] transition-colors duration-300"
                style={{ color: scrolled ? "var(--rich-rose)" : "#ffffff" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--magenta)] transition-all duration-400 group-hover:w-full"
                />
              </a>
            ))}

            {/* AI Diagnostic Quick Trigger */}
            <button
              onClick={onOpenQuiz}
              className="group flex items-center gap-1.5 rounded-full border px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[1px] transition-all duration-300 hover:scale-105"
              style={{
                borderColor: scrolled ? "var(--pre-dawn-sky)" : "rgba(232,148,195,0.6)",
                backgroundColor: scrolled ? "rgba(232,148,195,0.1)" : "rgba(255,255,255,0.06)",
                color: scrolled ? "var(--rich-rose)" : "#FFFFFF",
              }}
            >
              <Sparkles size={14} className="text-[var(--magenta)]" />
              Diagnostic
            </button>

            {/* Premium Interactive Booking Button */}
            <button
              onClick={onOpenBookingWizard}
              className="flex items-center gap-2 rounded-full px-7 py-3 font-sans text-xs font-bold uppercase tracking-[1.5px] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(223,144,213,0.6)]"
              style={{
                background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
                color: "var(--rich-rose)",
                boxShadow: "0 4px 18px rgba(223, 144, 213, 0.4)",
              }}
            >
              <Calendar size={15} />
              Réserver
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[1001] flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={28} color="#ffffff" />
            ) : (
              <Menu size={28} color={scrolled ? "var(--rich-rose)" : "#ffffff"} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-7"
            style={{ backgroundColor: "rgba(59, 34, 49, 0.98)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-[32px] font-normal tracking-[2px] transition-colors duration-300 hover:text-[var(--magenta)]"
                style={{ color: "var(--island-sunset)" }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => {
                setMobileOpen(false);
                onOpenQuiz();
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--island-sunset)] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[1.5px] text-[var(--island-sunset)]"
            >
              <Sparkles size={16} />
              Diagnostic IA Beauté
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                setMobileOpen(false);
                onOpenBookingWizard();
              }}
              className="flex items-center gap-2 rounded-full px-10 py-4 font-sans text-xs font-bold uppercase tracking-[2px]"
              style={{
                background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
                color: "var(--rich-rose)",
              }}
            >
              <Calendar size={18} />
              Réserver Maintenant
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

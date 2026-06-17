import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, CalendarCheck } from "lucide-react";

const mockNotifications = [
  {
    name: "Salma B.",
    action: "vient de réserver un",
    item: "Pack Misk Signature Head Spa",
    time: "Il y a 3 min",
    icon: Sparkles,
    color: "var(--magenta)",
  },
  {
    name: "Emna G.",
    action: "a laissé un avis Google",
    item: "5.0 ★★★★★",
    time: "Il y a 12 min",
    icon: Star,
    color: "var(--island-sunset)",
  },
  {
    name: "Nour M.",
    action: "a réservé sa prestation",
    item: "Balayage Miel & Glaze",
    time: "Il y a 24 min",
    icon: CalendarCheck,
    color: "var(--pre-dawn-sky)",
  },
  {
    name: "Cyrine T.",
    action: "vient d'offrir une",
    item: "Carte Cadeau VIP (150 DT)",
    time: "Il y a 41 min",
    icon: Sparkles,
    color: "var(--magenta)",
  },
];

export function CustomerToast() {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  useEffect(() => {
    // Show first notification after 6 seconds
    const initialTimer = setTimeout(() => {
      setCurrentIdx(0);
    }, 6000);

    // Rotate notification every 28 seconds
    const interval = setInterval(() => {
      setCurrentIdx((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % mockNotifications.length;
      });
    }, 28000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Hide after 7 seconds of display
  useEffect(() => {
    if (currentIdx !== null) {
      const hideTimer = setTimeout(() => {
        setCurrentIdx(null);
      }, 7500);
      return () => clearTimeout(hideTimer);
    }
  }, [currentIdx]);

  const activeNotif = currentIdx !== null ? mockNotifications[currentIdx] : null;

  return (
    <AnimatePresence>
      {activeNotif && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="fixed bottom-28 left-8 z-[98] hidden items-center gap-3.5 rounded-2xl border px-4 py-3.5 shadow-[0_12px_36px_rgba(59,34,49,0.18)] backdrop-blur-2xl sm:flex max-w-[340px]"
          style={{
            backgroundColor: "rgba(253, 245, 249, 0.92)",
            borderColor: "rgba(232, 148, 195, 0.4)",
          }}
        >
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, var(--rich-rose), var(--pre-dawn-sky))" }}
          >
            <activeNotif.icon size={18} color="var(--island-sunset)" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-sans text-xs">
              <strong style={{ color: "var(--rich-rose)" }}>{activeNotif.name}</strong>
              <span style={{ color: "var(--black-raspberry)" }}>{activeNotif.action}</span>
            </div>
            <div className="font-serif text-xs font-semibold" style={{ color: "var(--pre-dawn-sky)" }}>
              {activeNotif.item}
            </div>
            <span className="mt-0.5 font-sans text-[9px] font-medium uppercase tracking-[1px]" style={{ color: "rgba(89,66,79,0.5)" }}>
              {activeNotif.time} · Vérifié MBL
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

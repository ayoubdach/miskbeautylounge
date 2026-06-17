import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--rich-rose)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="text-center"
          >
            <motion.h2
              className="font-display text-[42px] font-normal tracking-[4px]"
              style={{ color: "var(--island-sunset)" }}
            >
              Misk Beauty Lounge
            </motion.h2>
            <motion.span
              className="mt-2 block font-sans text-[10px] font-normal uppercase tracking-[6px]"
              style={{ color: "var(--magenta)" }}
            >
              Institut d'Excellence
            </motion.span>
            <motion.div
              className="mx-auto mt-6 h-9 w-9 rounded-full border-2"
              style={{
                borderColor: "rgba(232, 148, 195, 0.15)",
                borderTopColor: "var(--island-sunset)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

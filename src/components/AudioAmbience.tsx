import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

export function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Relaxing ambient spa music
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=meditation-relaxing-music-115024.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // soft ambient volume
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback failed:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="none" />

      <motion.div
        className="fixed bottom-8 left-8 z-[99] flex items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={togglePlay}
          aria-label="Ambiance sonore"
          className={`group flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border backdrop-blur-xl transition-all duration-400 ${
            isPlaying
              ? "border-[var(--island-sunset)] bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-[0_8px_24px_rgba(232,148,195,0.3)]"
              : "border-[rgba(232,148,195,0.3)] bg-white/80 text-[var(--rich-rose)] hover:bg-white hover:shadow-[0_8px_20px_rgba(59,34,49,0.1)]"
          }`}
        >
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-4">
              <motion.span
                animate={{ height: ["4px", "16px", "8px", "16px"] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                className="w-1 bg-[var(--island-sunset)] rounded-full"
              />
              <motion.span
                animate={{ height: ["12px", "4px", "14px", "6px"] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                className="w-1 bg-[var(--magenta)] rounded-full"
              />
              <motion.span
                animate={{ height: ["8px", "16px", "4px", "12px"] }}
                transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                className="w-1 bg-[var(--island-sunset)] rounded-full"
              />
            </div>
          ) : (
            <Music size={20} className="transition-transform group-hover:rotate-12" />
          )}
        </motion.button>

        <AnimatePresence>
          {(isHovered || isPlaying) && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-[0_8px_24px_rgba(59,34,49,0.08)] backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                borderColor: "rgba(232, 148, 195, 0.3)",
              }}
            >
              <div className="flex flex-col">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "var(--pre-dawn-sky)" }}>
                  Ambiance Spa Relaxante
                </span>
                <span className="font-serif text-xs italic" style={{ color: "var(--black-raspberry)" }}>
                  {isPlaying ? "Immersion sonore en cours..." : "Cliquez pour activer la musique"}
                </span>
              </div>
              <button
                onClick={togglePlay}
                className="ml-1 rounded-full p-1.5 hover:bg-[var(--rose-light)]"
                aria-label="Toggle mute"
              >
                {isPlaying ? <Volume2 size={16} color="var(--pre-dawn-sky)" /> : <VolumeX size={16} color="var(--black-raspberry)" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

import { motion } from "framer-motion";
import { Sparkles, Calendar, Wand2 } from "lucide-react";

interface HeroProps {
  onOpenBookingWizard: () => void;
  onOpenQuiz: () => void;
}

export function Hero({ onOpenBookingWizard, onOpenQuiz }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dlllcg1cm/image/upload/q_auto/f_auto/v1781628777/706704747_122178139592862696_144972524975596783_n_fthqri.jpg"
          alt="Misk Beauty Lounge"
          className="h-full w-full animate-hero-zoom object-cover"
          style={{ filter: "saturate(1.1) contrast(1.04) brightness(0.95)" }}
        />
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 34, 49, 0.35) 0%, rgba(59, 34, 49, 0.6) 55%, rgba(59, 34, 49, 0.88) 100%), linear-gradient(180deg, rgba(59, 34, 49, 0.45) 0%, rgba(89, 66, 79, 0.3) 40%, rgba(59, 34, 49, 0.85) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, rgba(59, 34, 49, 0.4) 100%)",
        }}
      />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor: "var(--magenta)",
              boxShadow: "0 0 12px var(--magenta)",
              left: `${8 + (i * 7) % 84}%`,
              bottom: "-10px",
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              x: [0, 30 + (i % 3) * 20],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + (i % 4) * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-[920px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mb-7 flex items-center justify-center gap-3.5"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
          <Sparkles size={14} color="var(--magenta)" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[4px]"
          style={{
            backgroundColor: "rgba(232, 148, 195, 0.12)",
            borderColor: "rgba(232, 148, 195, 0.4)",
            color: "var(--island-sunset)",
            backdropFilter: "blur(12px)",
          }}
        >
          Institut de Beauté Haut de Gamme
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.2, 0, 0, 1] }}
          className="font-serif text-[clamp(46px,8.5vw,92px)] font-normal leading-[1.05] tracking-[-1.5px] text-white"
          style={{ textShadow: "0 4px 40px rgba(59, 34, 49, 0.5)" }}
        >
          L'Art de Sublimer
          <br />
          chaque <em className="text-gradient animate-shimmer font-serif font-medium">détail</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.8 }}
          className="mx-auto mt-7 max-w-[620px] text-[clamp(15px,1.8vw,18px)] font-light leading-[1.75] tracking-wide"
          style={{ color: "rgba(252, 232, 241, 0.92)", textShadow: "0 2px 18px rgba(59, 34, 49, 0.5)" }}
        >
          Une expérience d'exception dédiée à votre beauté. Coiffure, onglerie, maquillage, head spa
          et soins signature — découvrez le luxe à l'état pur au cœur de Menzah5.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onOpenBookingWizard}
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-11 py-4 font-sans text-xs font-bold uppercase tracking-[2.5px] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(223,144,213,0.7)]"
            style={{
              background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
              color: "var(--rich-rose)",
              boxShadow: "0 6px 24px rgba(223, 144, 213, 0.5)",
            }}
          >
            <Calendar size={16} />
            <span className="relative z-10">Prendre Rendez-vous</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2.5 rounded-full border px-9 py-4 font-sans text-xs font-semibold uppercase tracking-[2.5px] text-white transition-all duration-400 hover:-translate-y-1 hover:bg-white/20"
            style={{
              borderColor: "rgba(252, 232, 241, 0.65)",
              backgroundColor: "rgba(252, 232, 241, 0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Wand2 size={16} className="text-[var(--island-sunset)]" />
            Diagnostic Beauté IA
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.2 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-9"
        >
          {[
            { value: "2500+", label: "Clientes" },
            { value: "8 ans", label: "Expertise" },
            { value: "5.0 ★", label: "Google" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-9">
              <div className="flex flex-col items-center gap-1">
                <strong className="font-serif text-[26px] font-medium" style={{ color: "var(--island-sunset)" }}>
                  {stat.value}
                </strong>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[2px]" style={{ color: "rgba(252, 232, 241, 0.7)" }}>
                  {stat.label}
                </span>
              </div>
              {i < 2 && (
                <div className="hidden h-8 w-px md:block" style={{ backgroundColor: "rgba(232, 148, 195, 0.3)" }} />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2.5 animate-float"
      >
        <span className="font-sans text-[10px] font-medium uppercase tracking-[3px]" style={{ color: "rgba(252, 232, 241, 0.65)" }}>
          Découvrir
        </span>
        <div className="h-11 w-px bg-gradient-to-b from-[rgba(252,232,241,0.65)] to-transparent" />
      </motion.div>
    </section>
  );
}

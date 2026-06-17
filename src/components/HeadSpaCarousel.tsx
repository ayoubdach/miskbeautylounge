import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface HeadSpaPack {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  features: string[];
  price: number;
  featured: boolean;
}

const headSpaPacks: HeadSpaPack[] = [
  {
    id: "after-work",
    emoji: "🌙",
    title: "Pack After Work",
    subtitle: "Le rituel parfait après une longue journée",
    features: [
      "Head Spa — 30 minutes",
      "Shampoing doux",
      "Masque hydratant",
      "Brushing finition",
    ],
    price: 70,
    featured: false,
  },
  {
    id: "decouverte",
    emoji: "🎁",
    title: "Pack Découverte",
    subtitle: "L'essentiel pour découvrir l'expérience Head Spa",
    features: [
      "Head Spa — 30 minutes",
      "Soin de visage basique",
      "Brushing finition",
    ],
    price: 100,
    featured: true,
  },
  {
    id: "misk",
    emoji: "🌸",
    title: "Pack Misk",
    subtitle: "Notre expérience signature, la plus complète",
    features: [
      "Head Spa — 30 minutes",
      "Soin capillaire nourrissant",
      "Brushing finition d'exception",
    ],
    price: 130,
    featured: false,
  },
];

interface HeadSpaCarouselProps {
  onBookPack: (packId: string) => void;
}

export function HeadSpaCarousel({ onBookPack }: HeadSpaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(1); // Start with featured pack
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const slideNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % headSpaPacks.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + headSpaPacks.length) % headSpaPacks.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(slideNext, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  return (
    <section
      id="head-spa"
      className="relative overflow-hidden py-[140px]"
      style={{ background: "linear-gradient(180deg, var(--rose-light), var(--bg-cream))" }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background decorative elements */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1200px] -translate-x-1/2 opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,148,195,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            <Sparkles size={14} />
            Head Spa Experience
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            L'Expérience Ultime de <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Détente</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] font-serif text-[18px] font-light italic leading-[1.8]" style={{ color: "var(--black-raspberry)" }}>
            Offrez à votre cuir chevelu un moment de pur bien-être — massage relaxant, soin profond et aromathérapie apaisante.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mx-auto max-w-[1100px]">
          {/* Navigation Arrows */}
          <button
            onClick={slidePrev}
            aria-label="Pack précédent"
            className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 -translate-x-4 items-center justify-center rounded-full border bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[var(--rose-light)] lg:flex"
            style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={slideNext}
            aria-label="Pack suivant"
            className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[var(--rose-light)] lg:flex"
            style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Track */}
          <div className="overflow-hidden rounded-[40px] py-4">
            <div className="relative flex items-center justify-center min-h-[520px]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {headSpaPacks.map((pack, index) => {
                  const isActive = index === activeIndex;
                  const isPrev = index === (activeIndex - 1 + headSpaPacks.length) % headSpaPacks.length;
                  const isNext = index === (activeIndex + 1) % headSpaPacks.length;

                  if (!isActive && !isPrev && !isNext) return null;

                  return (
                    <motion.div
                      key={pack.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.85 }}
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        x: isActive ? 0 : isPrev ? -280 : 280,
                        scale: isActive ? 1 : 0.85,
                        zIndex: isActive ? 10 : 5,
                      }}
                      exit={{ opacity: 0, x: direction > 0 ? -300 : 300, scale: 0.85 }}
                      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                      className="absolute w-full max-w-[360px] sm:max-w-[400px]"
                    >
                      <PackCard pack={pack} onBook={() => onBookPack(pack.id)} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-3">
            {headSpaPacks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Aller au pack ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[var(--rich-rose)]"
                    : "w-2.5 bg-[var(--island-sunset)] opacity-50 hover:opacity-100"
                }`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <p className="mt-4 text-center font-serif text-xs italic opacity-60 lg:hidden" style={{ color: "var(--black-raspberry)" }}>
            ← Glissez pour découvrir les packs →
          </p>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-serif text-sm italic tracking-[1.5px]"
          style={{ color: "var(--black-raspberry)" }}
        >
          ✦ Disponible dès maintenant &nbsp;·&nbsp; Réservation obligatoire ✦
        </motion.p>
      </div>
    </section>
  );
}

function PackCard({
  pack,
  onBook,
}: {
  pack: HeadSpaPack;
  onBook: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border p-8 transition-all duration-500 ${
        pack.featured
          ? "scale-[1.02] border-[rgba(232,148,195,0.5)] shadow-[0_36px_70px_-14px_rgba(169,77,127,0.25)]"
          : "border-[rgba(232,148,195,0.3)] bg-white shadow-[0_20px_50px_rgba(59,34,49,0.1)]"
      }`}
      style={{
        background: pack.featured
          ? "linear-gradient(145deg, var(--rich-rose), var(--black-raspberry))"
          : "#FFFFFF",
      }}
    >
      {pack.featured && (
        <div
          className="absolute right-5 top-5 rounded-full px-3 py-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[1.5px]"
          style={{
            background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
            color: "var(--rich-rose)",
          }}
        >
          ★ Le Plus Choisi
        </div>
      )}

      <div
        className="mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-[20px] text-[30px]"
        style={{ backgroundColor: pack.featured ? "rgba(232, 148, 195, 0.22)" : "var(--rose-light)" }}
      >
        {pack.emoji}
      </div>

      <h3
        className="mb-2 font-serif text-[30px] font-medium tracking-[-0.5px]"
        style={{ color: pack.featured ? "rgba(252, 232, 241, 0.92)" : "var(--rich-rose)" }}
      >
        {pack.title}
      </h3>
      <p
        className="mb-7 font-serif text-sm italic"
        style={{ color: pack.featured ? "rgba(252, 232, 241, 0.65)" : "var(--black-raspberry)" }}
      >
        {pack.subtitle}
      </p>

      <ul className="mb-8 space-y-0">
        {pack.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-3.5 border-b py-3 text-sm"
            style={{
              borderColor: pack.featured ? "rgba(252, 232, 241, 0.1)" : "#F5DCE7",
              color: pack.featured ? "rgba(252, 232, 241, 0.92)" : "var(--black-raspberry)",
            }}
          >
            <span
              className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
            >
              <Check size={11} color="var(--rich-rose)" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mb-7 flex items-baseline gap-2">
        <span
          className="font-serif text-5xl font-semibold tracking-[-1.5px]"
          style={{ color: pack.featured ? "var(--magenta)" : "var(--pre-dawn-sky)" }}
        >
          {pack.price}
        </span>
        <span
          className="font-serif text-lg font-medium"
          style={{ color: pack.featured ? "rgba(252, 232, 241, 0.5)" : "var(--black-raspberry)" }}
        >
          DT
        </span>
      </div>

      <button
        onClick={onBook}
        className={`flex w-full items-center justify-center gap-2.5 rounded-full py-4 font-sans text-xs font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-0.5 ${
          pack.featured
            ? "animate-pulse-glow hover:shadow-[0_10px_24px_rgba(223,144,213,0.55)]"
            : "hover:bg-[var(--pre-dawn-sky)] hover:text-white"
        }`}
        style={{
          background: pack.featured
            ? "linear-gradient(135deg, var(--magenta), var(--island-sunset))"
            : "transparent",
          color: pack.featured ? "var(--rich-rose)" : "var(--pre-dawn-sky)",
          border: pack.featured ? "none" : "1.5px solid var(--island-sunset)",
        }}
      >
        <Calendar size={15} />
        Réserver
      </button>
    </div>
  );
}

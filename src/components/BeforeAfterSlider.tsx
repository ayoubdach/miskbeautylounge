import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface TransformationItem {
  id: string;
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  serviceName: string;
  priceTag: string;
}

const transformationsList: TransformationItem[] = [
  {
    id: "ta-1",
    title: "Transformation Balayage & Glaze",
    subtitle: "D'un châtain uniforme à un balayage miel et caramel haute brillance.",
    // Premium stock URLs showing clear transformations
    beforeImg: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1000&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    serviceName: "Coupe, Balayage Miel & Patine",
    priceTag: "À partir de 150 DT",
  },
  {
    id: "ta-2",
    title: "Mise en Beauté Soirée & Regard",
    subtitle: "Révélation des traits avec un make-up soigné et une pose de cils haute définition.",
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    serviceName: "Maquillage Soirée avec Faux Cils",
    priceTag: "100 DT",
  },
  {
    id: "ta-3",
    title: "Rituel Soin Caviar Miroir",
    subtitle: "Réparation extrême de fibres poreuses en une matière de soie fluide.",
    beforeImg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1517832606599-bb3c0560ef56?q=80&w=1000&auto=format&fit=crop",
    serviceName: "Soin Caviar Miroir Intense",
    priceTag: "200 DT",
  },
];

export function BeforeAfterSlider() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const activeItem = transformationsList[activeItemIndex];

  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="py-[120px]" style={{ backgroundColor: "var(--rich-rose)" }}>
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        className="mx-auto max-w-[1320px] px-6 lg:px-8"
      >
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--magenta)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Avant / Après interactif
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px] text-white">
            L'Art de la <em className="font-serif font-medium not-italic text-[var(--island-sunset)]">Transformation</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "rgba(252,232,241,0.75)" }}>
            Faites glisser le curseur pour explorer l'expertise spectaculaire de nos artisans de la beauté.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {transformationsList.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`flex items-center gap-2.5 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[1px] transition-all duration-300 ${
                activeItemIndex === idx
                  ? "bg-[var(--magenta)] text-[var(--rich-rose)] shadow-[0_4px_20px_rgba(223,144,213,0.4)] scale-105"
                  : "border border-[rgba(252,232,241,0.2)] bg-white/5 text-white/80 hover:border-[var(--island-sunset)] hover:bg-white/10"
              }`}
            >
              <Sparkles size={14} />
              {item.title.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Immersive Comparison Main Display */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Interactive slider container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="group relative h-[420px] sm:h-[500px] w-full cursor-ew-resize select-none overflow-hidden rounded-[32px] border-2 shadow-[0_36px_80px_rgba(0,0,0,0.4)]"
              style={{ borderColor: "rgba(232,148,195,0.4)" }}
            >
              {/* After image (Background / Full width) */}
              <img
                src={activeItem.afterImg}
                alt="Résultat Après Misk Beauty Lounge"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-6 right-6 z-10 rounded-full px-4 py-2 font-serif text-xs font-bold uppercase tracking-[2px] backdrop-blur-md" style={{ backgroundColor: "rgba(59,34,49,0.75)", color: "var(--magenta)" }}>
                ✦ Après MBL
              </div>

              {/* Before image (Clipped to sliderPosition) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.beforeImg}
                  alt="État Avant Misk Beauty Lounge"
                  className="absolute inset-0 h-full w-full max-w-none object-cover"
                  style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
                />
                <div className="absolute bottom-6 left-6 z-10 rounded-full px-4 py-2 font-serif text-xs font-bold uppercase tracking-[2px] backdrop-blur-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", color: "var(--rich-rose)" }}>
                  Avant
                </div>
              </div>

              {/* Slider Handle & Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Glowing vertical bar */}
                <div className="h-full w-1 bg-gradient-to-b from-[var(--magenta)] via-[var(--island-sunset)] to-[var(--magenta)] shadow-[0_0_12px_var(--magenta)]" />
                {/* Immersive Handle element */}
                <div
                  className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110"
                  style={{ borderColor: "var(--magenta)" }}
                >
                  <MoveHorizontal size={22} />
                </div>
              </div>
            </div>
            <p className="mt-4 text-center font-serif text-xs italic tracking-wider text-white/50">
              ✦ Cliquez et faites glisser sur l'image pour voir la magie opérer ✦
            </p>
          </div>

          {/* Context Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div>
              <span className="font-sans text-[10px] font-black uppercase tracking-[3px] text-[var(--island-sunset)]">
                {activeItem.serviceName}
              </span>
              <h3 className="mt-2 font-serif text-3xl font-medium text-white">
                {activeItem.title}
              </h3>
              <p className="mt-4 font-serif text-base font-light italic leading-relaxed text-white/80">
                "{activeItem.subtitle}"
              </p>
            </div>

            <div className="rounded-2xl border p-6 bg-white/5 backdrop-blur-md border-[rgba(232,148,195,0.2)]">
              <span className="block font-serif text-xs text-white/60">Tarif Indiqué</span>
              <span className="mt-1 block font-serif text-3xl font-bold text-[var(--magenta)]">
                {activeItem.priceTag}
              </span>
              <a
                href="#contact"
                className="mt-6 block rounded-full py-3.5 px-8 text-center font-sans text-xs font-bold uppercase tracking-[2px] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(223,144,213,0.4)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))", color: "var(--rich-rose)" }}
              >
                Réserver cette prestation
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

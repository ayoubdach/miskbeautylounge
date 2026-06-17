import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, Play, Calendar } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g-brushing",
    title: "Brushing & Chignon",
    category: "Coiffure",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685390/Hair_1_mp32ek.mp4",
    description: "Le geste parfait pour un éclat au quotidien — volume, souplesse et brillance.",
  },
  {
    id: "g-coloration",
    title: "Coupes & Colorations",
    category: "Coiffure",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685421/Hair_2_pwkqni.mp4",
    description: "Nuances & lumière — balayages, reflets et couleurs sur-mesure.",
  },
  {
    id: "g-soins",
    title: "Soins & Traitements",
    category: "Coiffure",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781691063/Hair_l1duyb.mp4",
    description: "Rituel Renaissance — protéine, kératine, caviar et botox capillaire.",
  },
  {
    id: "g-epilation",
    title: "Épilations de Précision",
    category: "Beauté du Visage",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781691073/sourcils_g2kbco.mp4",
    description: "Sourcils, visage et corps — douceur et ligne parfaite.",
  },
  {
    id: "g-onglerie-poses",
    title: "Vernis & Poses Permanent",
    category: "Onglerie",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781657553/copy_3347C3F5-14EC-485B-ADEE-4F3BA9007951_tcuuo8.mp4",
    description: "Gel, capsule américaine et nail art d'exception.",
  },
  {
    id: "g-onglerie-soins",
    title: "Soins Mains & Pieds",
    category: "Onglerie",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685402/ongelerie_zqjlhe.mp4",
    description: "Manucure et pédicure luxe pour des extrémités parfaites.",
  },
  {
    id: "g-massages",
    title: "Massages Signature",
    category: "Bien-être",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781658112/copy_3ABFD3A7-3359-49E5-90F8-5B9146304B4F_bwoing.mp4",
    description: "Corps & détente — évasion sensorielle aux huiles essentielles.",
  },
  {
    id: "g-ambiance",
    title: "Bulle de Sérénité",
    category: "Bien-être",
    src: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781658333/copy_07DEDAF4-A2A6-4958-9788-FCDD03DEA058_jo2nji.mp4",
    description: "Ambiance apaisante et chaleureuse pour un moment hors du temps.",
  },
];

export function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["Tous", "Coiffure", "Onglerie", "Beauté du Visage", "Bien-être"];

  const filteredItems = selectedCategory === "Tous"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-[120px]" style={{ background: "linear-gradient(180deg, var(--rose-light), var(--bg-cream))" }}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Galerie d'Inspirations
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Nos Réalisations d'<em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Exception</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            Plongez au cœur de l'univers Misk Beauty Lounge à travers nos vidéos signature.
          </p>
        </motion.div>

        {/* Categories trigger tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[1.5px] transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-[0_6px_20px_rgba(59,34,49,0.2)] scale-105"
                  : "border border-[rgba(232,148,195,0.3)] bg-white/80 text-[var(--text-soft)] hover:border-[var(--island-sunset)] hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-[380px] w-full cursor-pointer overflow-hidden rounded-[32px] border bg-white shadow-sm transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_28px_60px_rgba(169,77,127,0.25)]"
              style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
            >
              <GalleryVideo src={item.src} />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(59,34,49,0.85)] via-[rgba(59,34,49,0.2)] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              {/* Play icon */}
              <div className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                <Play size={24} fill="white" className="ml-1" />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 translate-y-6 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 text-white">
                <div className="mb-2 flex items-center gap-2 font-sans text-[10px] font-extrabold uppercase tracking-[2px]" style={{ color: "var(--island-sunset)" }}>
                  <Sparkles size={12} />
                  {item.category}
                </div>
                <h4 className="font-serif text-2xl font-medium leading-tight">
                  {item.title}
                </h4>
                <p className="mt-2 line-clamp-2 font-serif text-xs font-light italic text-white/80">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[1px]" style={{ color: "var(--magenta)" }}>
                  <Eye size={14} />
                  Agrandir la vidéo
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            item={filteredItems[lightboxIndex]}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredItems.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(20, 10, 16, 0.95)", backdropFilter: "blur(24px)" }}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 z-50 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Vidéo précédente"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 z-50 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Vidéo suivante"
      >
        <ChevronRight size={28} />
      </button>

      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col lg:flex-row max-h-[90vh] max-w-[1100px] w-full overflow-hidden rounded-[32px] border bg-[var(--rich-rose)] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        style={{ borderColor: "rgba(232,148,195,0.4)" }}
      >
        <div className="flex-1 flex items-center justify-center overflow-hidden bg-black/40 lg:max-h-[85vh]">
          <video
            controls
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full max-h-[70vh] lg:max-h-[85vh] object-contain"
          >
            <source src={item.src} type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-col justify-between p-8 lg:w-[380px] lg:p-10 border-t lg:border-t-0 lg:border-l border-[rgba(252,232,241,0.15)] text-white">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[10px] font-black uppercase tracking-[2px]" style={{ background: "rgba(232,148,195,0.15)", color: "var(--island-sunset)" }}>
              ✦ {item.category}
            </div>
            <h3 className="font-serif text-3xl font-medium">
              {item.title}
            </h3>
            <p className="mt-4 font-serif text-sm font-light italic leading-relaxed text-white/70">
              "{item.description}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(252,232,241,0.1)]">
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2.5 rounded-full py-4 px-8 font-sans text-xs font-bold uppercase tracking-[2px] transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))", color: "var(--rich-rose)" }}
            >
              <Calendar size={16} />
              Réserver l'équivalent
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

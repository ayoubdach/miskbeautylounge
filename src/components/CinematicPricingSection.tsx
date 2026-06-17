import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Palette, Sparkles, Plus, Calendar } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface PricingServiceItem {
  name: string;
  price: string;
}

interface PricingCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  services: PricingServiceItem[];
}

const coiffureCategories: PricingCategory[] = [
  {
    id: "brushing",
    icon: Scissors,
    label: "Brushing",
    title: "Style & Volume",
    subtitle: "L'éclat au quotidien",
    image: "/images/coiffure-brushing.jpg",
    services: [
      { name: "Brushing court", price: "10 DT" },
      { name: "Brushing mi-long", price: "15 DT" },
      { name: "Brushing long & épais", price: "20 DT" },
      { name: "Wavy signature", price: "25 DT" },
      { name: "Brushing extension plaque", price: "20 DT" },
      { name: "Égalisation des pointes", price: "15 DT" },
      { name: "Application coloration sans brushing", price: "20 DT" },
      { name: "Tresse du jour", price: "10 DT" },
    ],
  },
  {
    id: "coloration",
    icon: Palette,
    label: "Coloration",
    title: "Nuances & Lumière",
    subtitle: "Le génie de la couleur",
    image: "/images/coiffure-coloration.jpg",
    services: [
      { name: "Balayage Misk", price: "250 DT" },
      { name: "Ombré Hair Luxe", price: "280 DT" },
      { name: "Coloration cheveux courts", price: "70 DT" },
      { name: "Coloration long / mi-long", price: "80 DT" },
      { name: "Coloration racines", price: "50 DT" },
      { name: "Décoloration ou effaceurs", price: "90 DT" },
      { name: "Mèches, reflets, highlight", price: "150-300 DT" },
      { name: "Gloss Brillance", price: "45 DT" },
    ],
  },
  {
    id: "soin",
    icon: Sparkles,
    label: "Soin",
    title: "Rituel Renaissance",
    subtitle: "La santé du cheveu",
    image: "/images/coiffure-soins.jpg",
    services: [
      { name: "Soin Caviar Miroir", price: "200 DT" },
      { name: "Botox Capillaire", price: "150 DT" },
      { name: "Kératine Premium", price: "300 DT" },
      { name: "Application protéine", price: "80-100 DT" },
      { name: "Soin capillaire sans brushing", price: "30 DT" },
    ],
  },
];

interface CinematicPricingSectionProps {
  onBookService: (serviceName: string) => void;
}

export function CinematicPricingSection({ onBookService }: CinematicPricingSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="coiffure"
      className="relative overflow-hidden py-[140px]"
      style={{ background: "linear-gradient(180deg, var(--bg-cream), var(--rose-light))" }}
    >
      {/* Decorative background element */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,148,195,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Coiffure
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Métamorphose Capillaire d'<em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Exception</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] font-serif text-[18px] font-light italic leading-[1.8]" style={{ color: "var(--black-raspberry)" }}>
            Des mains expertes pour sublimer chaque fibre. Découvrez notre carte des prix pensée comme une expérience de luxe.
          </p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {coiffureCategories.map((category, index) => (
            <CinematicPriceCard
              key={category.id}
              category={category}
              index={index}
              onBookService={onBookService}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center font-serif text-sm italic tracking-[1.5px]"
          style={{ color: "var(--black-raspberry)" }}
        >
          ✦ Les tarifs affichés sont indicatifs selon la longueur et l'épaisseur des cheveux ✦
        </motion.p>
      </div>
    </section>
  );
}

function CinematicPriceCard({
  category,
  index,
  onBookService,
}: {
  category: PricingCategory;
  index: number;
  onBookService: (serviceName: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
      className="group relative h-[560px] cursor-pointer overflow-hidden rounded-[40px] sm:h-[620px]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        boxShadow: "0 24px 60px rgba(59, 34, 49, 0.18)",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
      </div>

      {/* Base Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background: "linear-gradient(to top, rgba(59, 34, 49, 0.92) 0%, rgba(59, 34, 49, 0.55) 45%, rgba(59, 34, 49, 0.15) 100%)",
        }}
      />

      {/* Hover Overlay (slightly stronger) */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to top, rgba(59, 34, 49, 0.97) 0%, rgba(59, 34, 49, 0.7) 50%, rgba(59, 34, 49, 0.3) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating "Explore" indicator */}
      <motion.div
        className="absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
        animate={{ rotate: isExpanded ? 45 : 0, scale: isExpanded ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Plus size={20} />
      </motion.div>

      {/* Content Card */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
        <motion.div
          className="overflow-hidden rounded-[28px] border border-white/10 px-6 py-7 backdrop-blur-xl transition-all duration-500"
          style={{
            backgroundColor: "rgba(49, 27, 39, 0.78)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          }}
          animate={{
            height: isExpanded ? "auto" : "auto",
          }}
        >
          {/* Header */}
          <div className="mb-5 flex items-start gap-4">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
            >
              <Icon size={22} color="var(--rich-rose)" />
            </div>
            <div className="pt-0.5">
              <span className="block font-sans text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "var(--island-sunset)" }}>
                {category.label}
              </span>
              <h3 className="mt-1 font-serif text-[28px] font-medium leading-tight tracking-[-0.5px] text-white">
                {category.title}
              </h3>
              <p className="mt-0.5 font-serif text-sm italic" style={{ color: "var(--magenta)" }}>
                {category.subtitle}
              </p>
            </div>
          </div>

          {/* Service List - Expandable */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-5 h-px bg-white/10" />
            <ul className="mb-6 space-y-0">
              {category.services.map((service, i) => (
                <li
                  key={i}
                  className="group/item flex items-center justify-between border-b border-white/5 py-3 transition-all duration-300 last:border-b-0 hover:pl-2"
                >
                  <span className="font-serif text-[15px] font-light text-white/90">
                    {service.name}
                  </span>
                  <span className="whitespace-nowrap pl-3 font-serif text-[15px] font-semibold" style={{ color: "var(--island-sunset)" }}>
                    {service.price}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookService(category.title);
              }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 font-sans text-xs font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(223,144,213,0.4)]"
              style={{
                background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
                color: "var(--rich-rose)",
              }}
            >
              <Calendar size={15} />
              Réserver {category.label}
            </button>
          </motion.div>

          {/* Mobile / Collapsed hint */}
          {!isExpanded && (
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-white/50">
                {category.services.length} prestations
              </span>
              <span className="font-serif text-xs italic" style={{ color: "var(--island-sunset)" }}>
                Survoler pour voir les prix
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Subtle title watermark */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 z-[1] -translate-x-1/2 select-none font-serif text-[70px] font-bold uppercase tracking-[4px] text-white/[0.04] sm:text-[90px]"
        style={{ writingMode: "horizontal-tb" }}
      >
        {category.title.split(" ")[0]}
      </div>
    </motion.div>
  );
}

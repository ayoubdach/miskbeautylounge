import { motion } from "framer-motion";
import { Check, Calendar } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface PackageItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  features: string[];
  price: number;
  featured: boolean;
}

const packages: PackageItem[] = [
  {
    id: "hs-1",
    emoji: "🌙",
    title: "Pack After Work",
    subtitle: "Le rituel parfait après une longue journée",
    features: [
      "Head Spa relaxant — 30 min",
      "Shampoing doux personnalisé",
      "Masque hydratant intense",
      "Brushing finition élégante",
    ],
    price: 70,
    featured: false,
  },
  {
    id: "hs-2",
    emoji: "🎁",
    title: "Pack Découverte",
    subtitle: "L'essentiel pour s'initier à l'expérience Head Spa",
    features: [
      "Head Spa premium — 30 min",
      "Soin de visage basique éclat",
      "Brushing finition signature",
    ],
    price: 100,
    featured: true,
  },
  {
    id: "hs-3",
    emoji: "🌸",
    title: "Pack Misk",
    subtitle: "Notre expérience signature, la plus complète",
    features: [
      "Head Spa luxe — 30 min",
      "Soin capillaire nourrissant pro",
      "Brushing finition d'exception",
    ],
    price: 130,
    featured: false,
  },
];

interface PackagesProps {
  onBookPackage: (id: string) => void;
}

export function Packages({ onBookPackage }: PackagesProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="headspa"
      className="py-[120px]"
      style={{ background: "linear-gradient(180deg, var(--rose-light), var(--bg-cream))" }}
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Head Spa Experience
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            L'Expérience Ultime de <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Détente</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            Offrez à votre cuir chevelu un rituel sensoriel d'exception — massage relaxant, soin profond et aromathérapie apaisante dans un cocon de douceur.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} {...pkg} index={i} onBook={() => onBookPackage(pkg.id)} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-11 text-center font-serif text-sm italic tracking-[1.5px]"
          style={{ color: "var(--black-raspberry)" }}
        >
          ✦ Disponible dès maintenant &nbsp;·&nbsp; Réservation obligatoire ✦
        </motion.p>
      </div>
    </section>
  );
}

function PackageCard({
  emoji,
  title,
  subtitle,
  features,
  price,
  featured,
  index,
  onBook,
}: PackageItem & { index: number; onBook: () => void }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
      className={`package-card group relative overflow-hidden rounded-[32px] border p-10 transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_24px_48px_-14px_rgba(169,77,127,0.22)] ${
        featured
          ? "scale-[1.03] border-[rgba(232,148,195,0.45)] lg:scale-[1.03]"
          : "border-[rgba(232,148,195,0.3)]"
      }`}
      style={{
        background: featured
          ? "linear-gradient(145deg, var(--rich-rose), var(--black-raspberry))"
          : "#FFFFFF",
      }}
    >
      {featured && (
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
        className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-[18px] text-[28px] transition-transform duration-400 group-hover:scale-110"
        style={{ backgroundColor: featured ? "rgba(232, 148, 195, 0.22)" : "var(--rose-light)" }}
      >
        {emoji}
      </div>

      <h3
        className="mb-2 font-serif text-[32px] font-medium tracking-[-0.5px]"
        style={{ color: featured ? "rgba(252, 232, 241, 0.92)" : "var(--rich-rose)" }}
      >
        {title}
      </h3>
      <p
        className="mb-7 font-serif text-sm italic"
        style={{ color: featured ? "rgba(252, 232, 241, 0.65)" : "var(--black-raspberry)" }}
      >
        {subtitle}
      </p>

      <ul className="mb-8 space-y-0">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-3.5 border-b py-3 text-sm"
            style={{
              borderColor: featured ? "rgba(252, 232, 241, 0.1)" : "#F5DCE7",
              color: featured ? "rgba(252, 232, 241, 0.92)" : "var(--black-raspberry)",
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
          style={{ color: featured ? "var(--magenta)" : "var(--pre-dawn-sky)" }}
        >
          {price}
        </span>
        <span
          className="font-serif text-lg font-medium"
          style={{ color: featured ? "rgba(252, 232, 241, 0.5)" : "var(--black-raspberry)" }}
        >
          DT
        </span>
      </div>

      <button
        onClick={onBook}
        className={`w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center font-sans text-xs font-bold uppercase tracking-[2px] transition-all duration-400 hover:-translate-y-0.5 cursor-pointer ${
          featured
            ? "animate-pulse-glow hover:shadow-[0_10px_24px_rgba(223,144,213,0.55)]"
            : "hover:bg-[var(--pre-dawn-sky)] hover:text-white"
        }`}
        style={{
          background: featured
            ? "linear-gradient(135deg, var(--magenta), var(--island-sunset))"
            : "transparent",
          color: featured ? "var(--rich-rose)" : "var(--pre-dawn-sky)",
          border: featured ? "none" : "1.5px solid var(--island-sunset)",
        }}
      >
        <Calendar size={15} />
        Réserver ce pack
      </button>
    </motion.div>
  );
}

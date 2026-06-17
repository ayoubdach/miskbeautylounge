import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Scissors,
  Palette,
  Sparkles,
  Sparkle,
  Feather,
  HandHeart,
  Leaf,
  Heart,
  MoveHorizontal,
  Plus,
  Calendar,
  Gem,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

// ============================================================
// TYPES
// ============================================================
interface ServiceItem {
  name: string;
  price: string;
}

interface CinematicCard {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  subtitle: string;
  image?: string;
  video?: string;
  services: ServiceItem[];
  description?: string;
}

interface TabConfig {
  id: string;
  label: string;
  description: string;
  cards?: CinematicCard[];
  beforeAfter?: boolean;
}

// ============================================================
// HELPERS
// ============================================================
function parsePrice(price: string): number {
  const match = price.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function sortServices(services: ServiceItem[]): ServiceItem[] {
  return [...services].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
}

// ============================================================
// DATA
// ============================================================
const coiffureCards: CinematicCard[] = [
  {
    id: "brushing",
    icon: Scissors,
    label: "Brushing",
    title: "Brushing & Chignon",
    subtitle: "L'éclat au quotidien",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685390/Hair_1_mp32ek.mp4",
    services: sortServices([
      { name: "Brushing court", price: "10 DT" },
      { name: "Tresse de jour", price: "10 DT" },
      { name: "Brushing mi-Long", price: "15 DT" },
      { name: "Egalisation des Pointes", price: "15 DT" },
      { name: "Application coloration sans Brushing", price: "20 DT" },
      { name: "Brushing Extension Plaque", price: "20 DT" },
      { name: "Brushing Long et épais", price: "20 DT" },
      { name: "Wavy", price: "25 DT" },
    ]),
  },
  {
    id: "coloration",
    icon: Palette,
    label: "Coloration",
    title: "Coupes & Colorations",
    subtitle: "Le génie de la couleur",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685421/Hair_2_pwkqni.mp4",
    services: sortServices([
      { name: "Rincages sans Brushing", price: "40 DT" },
      { name: "Coloration Racine", price: "50 DT" },
      { name: "Coloration cheveux courts", price: "70 DT" },
      { name: "Coloration Cheveux Long/Mi-long", price: "80 DT" },
      { name: "Décoloration ou Effaceurs", price: "90 DT" },
      { name: "Mèches ou reflet ou contour High Light", price: "150-300 DT" },
    ]),
  },
  {
    id: "soin",
    icon: Sparkles,
    label: "Soin",
    title: "Soins & Traitements",
    subtitle: "La santé du cheveu",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781691063/Hair_l1duyb.mp4",
    services: sortServices([
      { name: "Soins capillaires sans Brushing", price: "30 DT" },
      { name: "Application Protéine", price: "80-100 DT" },
      { name: "Protéine ou kératine ou Caviar ou Botox", price: "150-300 DT" },
    ]),
  },
];

const beauteVisageCards: CinematicCard[] = [
  {
    id: "makeup",
    icon: Sparkle,
    label: "Make-up",
    title: "Makeup & Chignion",
    subtitle: "L'art de sublimer chaque trait",
    image: "/images/makeup.jpg",
    services: sortServices([
      { name: "*Tresse du jour", price: "10 DT" },
      { name: "*Chignion Simple", price: "35 DT" },
      { name: "*Cil à Cil", price: "45 DT" },
      { name: "*Chignion soirée", price: "50 DT" },
      { name: "*Maquillage du jour /Simple", price: "60 DT" },
      { name: "*Maquillage soirée Chargé sans faux cils", price: "80 DT" },
      { name: "*Maquillage soirée Chargé avec faux Cils", price: "100 DT" },
    ]),
  },
  {
    id: "epilation",
    icon: Feather,
    label: "Épilations",
    title: "Épilations",
    subtitle: "Épilation de précision",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781691073/sourcils_g2kbco.mp4",
    services: sortServices([
      { name: "Pate", price: "6 DT" },
      { name: "Lèvres", price: "7 DT" },
      { name: "Sourcils", price: "10 DT" },
      { name: "Aisselles", price: "10 DT" },
      { name: "Visage au Fil", price: "15 DT" },
      { name: "Demis Bras Cire / Sucre traditionnel", price: "15 DT" },
      { name: "Bras Cire/Sucre traditionnel", price: "15 DT" },
      { name: "Visage à la cire / sucre traditionnel", price: "20 DT" },
      { name: "Demis Jambes Cire / Sucre traditionnel", price: "30 DT" },
    ]),
  },
];

const onglerieCards: CinematicCard[] = [
  {
    id: "poses",
    icon: Gem,
    label: "Vernis & Poses",
    title: "Permanent & Gel",
    subtitle: "Tenue longue durée & finition miroir",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781657553/copy_3347C3F5-14EC-485B-ADEE-4F3BA9007951_tcuuo8.mp4",
    services: sortServices([
      { name: "Design/doigt", price: "3 DT" },
      { name: "Ongle Cassé", price: "5 DT" },
      { name: "French Manicure supplément", price: "10 DT" },
      { name: "Vernis Permanent", price: "25 DT" },
      { name: "Gel sur ongle Naturel", price: "35 DT" },
      { name: "Vernis Permanent Base Gel", price: "35 DT" },
      { name: "Extension sur Ongles Naturels", price: "35 DT" },
      { name: "Remplissage", price: "40 DT" },
      { name: "Gel Capsule Vernis Permanent", price: "45 DT" },
      { name: "Capsule Américaine", price: "55 DT" },
    ]),
  },
  {
    id: "soins-mains",
    icon: HandHeart,
    label: "Bien-être",
    title: "Soins Mains & Pieds",
    subtitle: "Soin mains luxe",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781685402/ongelerie_zqjlhe.mp4",
    services: sortServices([
      { name: "Soins des Mains sans pose vernis", price: "20 DT" },
      { name: "Soins des Pieds sans pose vernis", price: "30 DT" },
      { name: "Soins des Mains + Vernis Permanent", price: "40 DT" },
      { name: "Soins des Pieds + Vernis Permanent", price: "50 DT" },
    ]),
  },
];

const bienEtreCards: CinematicCard[] = [
  {
    id: "massages",
    icon: Leaf,
    label: "Massages",
    title: "Massages signature",
    subtitle: "Corps & Détente",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781658112/copy_3ABFD3A7-3359-49E5-90F8-5B9146304B4F_bwoing.mp4",
    services: sortServices([
      { name: "Massage pieds & jambes (20min)", price: "30 DT" },
      { name: "Massage dos & épaules (30min)", price: "40 DT" },
      { name: "Massage complet corps (45min)", price: "90 DT" },
      { name: "Massage complet corps + tête (45min)", price: "130 DT" },
    ]),
  },
  {
    id: "ambiance-spa",
    icon: Heart,
    label: "Ambiance Spa",
    title: "Bulle de sérénité",
    subtitle: "Ambiance head Spa",
    video: "https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781658333/copy_07DEDAF4-A2A6-4958-9788-FCDD03DEA058_jo2nji.mp4",
    services: [],
    description:
      "Nos massages sont réalisés sur mesure avec des huiles essentielles haut de gamme. Offrez-vous un moment de pure relaxation dans une ambiance apaisante et chaleureuse.",
  },
];

const tabs: TabConfig[] = [
  {
    id: "tous",
    label: "Tous",
    description: "Découvrez l'ensemble de nos univers de beauté",
  },
  {
    id: "coiffure",
    label: "Coiffure",
    description: "Des mains expertes pour une métamorphose capillaire d'exception",
    cards: coiffureCards,
  },
  {
    id: "beaute-visage",
    label: "Beauté du Visage",
    description: "Maquillage professionnel et épilations de précision",
    cards: beauteVisageCards,
  },
  {
    id: "onglerie",
    label: "Onglerie",
    description: "L'expression de votre style jusqu'au bout des ongles",
    cards: onglerieCards,
  },
  {
    id: "bien-etre",
    label: "Bien-être",
    description: "Massages et rituels Head Spa pour une détente absolue",
    cards: bienEtreCards,
  },
  {
    id: "avant-apres",
    label: "Avant / Après",
    description: "Faites glisser pour découvrir la magie de nos transformations",
    beforeAfter: true,
  },
];

const transformations = [
  {
    id: "ta-1",
    title: "Transformation Balayage & Glaze",
    subtitle: "D'un châtain uniforme à un balayage miel et caramel haute brillance.",
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

interface UnifiedServicesShowcaseProps {
  onBookService: () => void;
}

export function UnifiedServicesShowcase({ onBookService }: UnifiedServicesShowcaseProps) {
  const [activeTab, setActiveTab] = useState("coiffure");
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section
      id="prestations"
      className="relative overflow-hidden py-[140px]"
      style={{ background: "linear-gradient(180deg, var(--bg-cream), var(--rose-light))" }}
    >
      {/* Background glow */}
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
          className="mb-12 text-center"
        >
          <div
            className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]"
            style={{ color: "var(--pre-dawn-sky)" }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Nos Univers
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2
            className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]"
            style={{ color: "var(--rich-rose)" }}
          >
            L'Excellence à <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Chaque Ongle</em>, Chaque Mèche
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] font-serif text-[18px] font-light italic leading-[1.8]" style={{ color: "var(--black-raspberry)" }}>
            {activeTabData.description}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[1.5px] transition-all duration-300 ${
                  isActive
                    ? "text-[var(--island-sunset)] shadow-[0_6px_20px_rgba(59,34,49,0.25)]"
                    : "border text-[var(--text-soft)] hover:border-[var(--island-sunset)] hover:bg-white"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--rich-rose)" : "rgba(255,255,255,0.8)",
                  borderColor: isActive ? "transparent" : "rgba(232,148,195,0.35)",
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabDot"
                    className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--magenta)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          >
            {activeTab === "tous" && (
              <TousView onBookService={onBookService} />
            )}

            {activeTabData.cards && (
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {activeTabData.cards.map((card, index) => (
                  <CinematicServiceCard
                    key={card.id}
                    card={card}
                    index={index}
                    onBookService={onBookService}
                  />
                ))}
              </div>
            )}

            {activeTabData.beforeAfter && (
              <BeforeAfterInteractiveView />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center font-serif text-sm italic tracking-[1.5px]"
          style={{ color: "var(--black-raspberry)" }}
        >
          ✦ Les tarifs affichés sont indicatifs selon la nature et la complexité du soin ✦
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================
// SUB-VIEWS
// ============================================================
function TousView({ onBookService }: { onBookService: () => void }) {
  const allCards = [
    ...coiffureCards,
    ...beauteVisageCards,
    ...onglerieCards,
    ...bienEtreCards,
  ];

  return (
    <div className="space-y-16">
      <BeforeAfterInteractiveView />

      <div>
        <h3
          className="mb-8 text-center font-serif text-2xl font-medium"
          style={{ color: "var(--rich-rose)" }}
        >
          ✦ Toutes nos prestations ✦
        </h3>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {allCards.map((card, index) => (
            <CinematicServiceCard
              key={card.id}
              card={card}
              index={index}
              onBookService={onBookService}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfterInteractiveView() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const activeItem = transformations[activeItemIndex];

  const handleMove = (clientX: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPosition(percent);
  };

  return (
    <div className="rounded-[40px] border bg-white p-8 shadow-[0_24px_60px_rgba(59,34,49,0.12)]" style={{ borderColor: "rgba(232,148,195,0.3)" }}>
      <div className="mb-8 text-center">
        <h3 className="font-serif text-3xl font-medium" style={{ color: "var(--rich-rose)" }}>
          Avant / Après <em className="not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Interactif</em>
        </h3>
        <p className="mx-auto mt-3 max-w-[620px] font-serif text-base italic" style={{ color: "var(--black-raspberry)" }}>
          Glissez le curseur pour explorer la magie de nos transformations.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <div
            className="group relative h-[380px] w-full cursor-ew-resize select-none overflow-hidden rounded-[32px] border-2 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            style={{ borderColor: "rgba(232,148,195,0.4)" }}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX, e.currentTarget);
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              handleMove(e.clientX, e.currentTarget);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX, e.currentTarget);
            }}
            onTouchMove={(e) => {
              if (!isDragging) return;
              handleMove(e.touches[0].clientX, e.currentTarget);
            }}
            onTouchEnd={() => setIsDragging(false)}
          >
            <img
              src={activeItem.afterImg}
              alt="Après"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute bottom-5 right-5 z-10 rounded-full px-3.5 py-1.5 font-serif text-[10px] font-bold uppercase tracking-[2px] text-white backdrop-blur-md"
              style={{ backgroundColor: "rgba(59,34,49,0.75)" }}
            >
              ✦ Après MBL
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeItem.beforeImg}
                alt="Avant"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{ width: "100%", minWidth: "100vw" }}
              />
              <div
                className="absolute bottom-5 left-5 z-10 rounded-full px-3.5 py-1.5 font-serif text-[10px] font-bold uppercase tracking-[2px] backdrop-blur-md"
                style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "var(--rich-rose)" }}
              >
                Avant
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-full w-1 bg-gradient-to-b from-[var(--magenta)] via-[var(--island-sunset)] to-[var(--magenta)] shadow-[0_0_12px_var(--magenta)]" />
              <div
                className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110"
                style={{ borderColor: "var(--magenta)" }}
              >
                <MoveHorizontal size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 text-center lg:text-left">
          <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            {transformations.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveItemIndex(idx);
                  setSliderPosition(50);
                }}
                className={`rounded-full px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[1px] transition-all ${
                  activeItemIndex === idx
                    ? "bg-[var(--rich-rose)] text-[var(--island-sunset)]"
                    : "border border-[rgba(232,148,195,0.35)] bg-white text-[var(--black-raspberry)] hover:border-[var(--island-sunset)]"
                }`}
              >
                {t.title.split(" ")[0]}
              </button>
            ))}
          </div>

          <span className="font-sans text-[10px] font-black uppercase tracking-[3px]" style={{ color: "var(--pre-dawn-sky)" }}>
            {activeItem.serviceName}
          </span>
          <h4 className="mt-2 font-serif text-2xl font-medium" style={{ color: "var(--rich-rose)" }}>
            {activeItem.title}
          </h4>
          <p className="mt-3 font-serif text-sm italic" style={{ color: "var(--black-raspberry)" }}>
            "{activeItem.subtitle}"
          </p>
          <div className="mt-5 font-serif text-2xl font-bold" style={{ color: "var(--pre-dawn-sky)" }}>
            {activeItem.priceTag}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CINEMATIC CARD COMPONENT
// ============================================================
function CinematicServiceCard({
  card,
  index,
  onBookService,
}: {
  card: CinematicCard;
  index: number;
  onBookService: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardMediaRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardMediaRef, { amount: 0.3 });
  const Icon = card.icon;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !card.video) return;

    if (isCardInView) {
      video.play().catch(() => {
        // Autoplay may be blocked; ignore silently
      });
    } else {
      video.pause();
    }
  }, [isCardInView, card.video]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
      className="group relative h-[600px] cursor-pointer overflow-hidden rounded-[36px] sm:h-[660px] lg:h-[700px]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ boxShadow: "0 24px 60px rgba(59, 34, 49, 0.18)" }}
    >
      <div ref={cardMediaRef} className="absolute inset-0 z-0">
        {card.video ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={card.image || undefined}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          >
            <source src={card.video} type="video/mp4" />
          </video>
        ) : card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))" }}
          >
            <Icon size={48} color="var(--rich-rose)" opacity={0.3} />
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(59, 34, 49, 0.92) 0%, rgba(59, 34, 49, 0.55) 45%, rgba(59, 34, 49, 0.15) 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(59, 34, 49, 0.97) 0%, rgba(59, 34, 49, 0.7) 50%, rgba(59, 34, 49, 0.3) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
        animate={{ rotate: isExpanded ? 45 : 0, scale: isExpanded ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Plus size={20} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
        <div
          className="overflow-hidden rounded-[24px] border border-white/10 px-6 py-6 backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(49, 27, 39, 0.78)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="mb-5 flex items-start gap-4">
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
            >
              <Icon size={20} color="var(--rich-rose)" />
            </div>
            <div className="pt-0.5">
              <span
                className="block font-sans text-[10px] font-bold uppercase tracking-[3px]"
                style={{ color: "var(--island-sunset)" }}
              >
                {card.label}
              </span>
              <h3 className="mt-1 font-serif text-[26px] font-medium leading-tight tracking-[-0.5px] text-white">
                {card.title}
              </h3>
              <p className="mt-0.5 font-serif text-sm italic" style={{ color: "var(--magenta)" }}>
                {card.subtitle}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-3 h-px bg-white/10" />

            {card.description ? (
              <p className="mb-5 font-serif text-[15px] font-light italic leading-relaxed text-white/90">
                "{card.description}"
              </p>
            ) : (
              <ul className="custom-tarif-scroll mb-4 max-h-[360px] space-y-0 overflow-y-auto pr-1">
                {card.services.map((service, i) => (
                  <li
                    key={i}
                    className="group/item flex items-center justify-between border-b border-white/5 py-2 transition-all duration-300 last:border-b-0 hover:pl-2"
                  >
                    <span className="font-serif text-[15px] font-light leading-snug text-white/90">
                      {service.name}
                    </span>
                    <span
                      className="whitespace-nowrap pl-3 font-serif text-[15px] font-semibold"
                      style={{ color: "var(--island-sunset)" }}
                    >
                      {service.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookService();
              }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full py-3 font-sans text-xs font-bold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(223,144,213,0.4)]"
              style={{
                background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
                color: "var(--rich-rose)",
              }}
            >
              <Calendar size={14} />
              Réserver
            </button>
          </motion.div>

          {!isExpanded && (
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-white/50">
                {card.description ? "Expérience Signature" : `${card.services.length} prestations`}
              </span>
              <span className="font-serif text-xs italic" style={{ color: "var(--island-sunset)" }}>
                {card.description ? "Survoler pour découvrir" : "Survoler pour voir les prix"}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Scissors, Palette, Sparkles, Feather, HandHeart, Leaf, Heart } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCardData {
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  subtitle: string;
  image: string;
  items: ServiceItem[];
  description?: string;
}

interface ServiceCardProps extends ServiceCardData {
  index?: number;
}

function ServiceCard({ badge, badgeIcon: Icon, title, subtitle, image, items, description, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index ?? 0) * 0.15, ease: [0.2, 0, 0, 1] }}
      className="service-card group overflow-hidden rounded-[28px] border bg-white transition-all duration-500 hover:-translate-y-3.5 hover:shadow-[0_36px_70px_-14px_rgba(169,77,127,0.25)]"
      style={{ borderColor: "rgba(232, 148, 195, 0.25)" }}
    >
      <div className="service-img-wrapper relative h-[260px] overflow-hidden" style={{ background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))" }}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(59,34,49,0.5)] to-transparent via-transparent" />
      </div>
      <div className="p-8 pb-9">
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[1.5px]"
          style={{
            background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))",
            color: "var(--rich-rose)",
          }}
        >
          <Icon size={12} />
          {badge}
        </div>
        <div className="mb-1 font-serif text-[30px] font-medium leading-[1.2] tracking-[-0.5px]" style={{ color: "var(--rich-rose)" }}>
          {title}
        </div>
        <p className="mb-5 font-serif text-[13px] italic tracking-wide" style={{ color: "var(--pre-dawn-sky)" }}>
          {subtitle}
        </p>
        {description ? (
          <p className="mt-4 font-serif text-[15px] font-light italic leading-[1.85]" style={{ color: "var(--black-raspberry)" }}>
            {description}
          </p>
        ) : (
          <ul className="space-y-0">
            {items.map((item, i) => (
              <li
                key={i}
                className="group/item flex items-center justify-between border-b py-3.5 text-sm transition-all duration-250 last:border-b-0 hover:rounded-lg hover:pl-2.5"
                style={{ borderColor: "#F5DCE7" }}
              >
                <span className="tracking-wide" style={{ color: "var(--black-raspberry)" }}>
                  {item.name}
                </span>
                <span className="whitespace-nowrap pl-3 font-serif font-bold tracking-wide" style={{ color: "var(--pre-dawn-sky)" }}>
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

interface SectionProps {
  id: string;
  label: string;
  title: React.ReactNode;
  subtitle: string;
  bgGradient?: string;
  cards: ServiceCardProps[];
}

function ServiceSection({ id, label, title, subtitle, bgGradient, cards }: SectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      className="py-[120px]"
      style={{ background: bgGradient || "var(--bg-cream)" }}
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="mb-[72px] text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            {label}
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            {subtitle}
          </p>
        </motion.div>

        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <ServiceCard key={i} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoiffureSection() {
  return (
    <ServiceSection
      id="coiffure"
      label="Coiffure"
      title={
        <>
          Couleur, Volume & <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Éclat</em>
        </>
      }
      subtitle="L'art capillaire dans toute sa splendeur — brushings sublimes, colorations sur-mesure et soins haute performance pour des cheveux d'exception."
      cards={[
        {
          badge: "Coiffure",
          badgeIcon: Scissors,
          title: "Brushing & Chignon",
          subtitle: "Le geste qui fait toute la différence",
          image: "/images/coiffure-brushing.jpg",
          items: [
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
          badge: "Couleur",
          badgeIcon: Palette,
          title: "Coupes & Colorations",
          subtitle: "Sublimez votre personnalité par la couleur",
          image: "/images/coiffure-coloration.jpg",
          items: [
            { name: "Coloration cheveux courts", price: "70 DT" },
            { name: "Coloration long / mi-long", price: "80 DT" },
            { name: "Coloration racines", price: "50 DT" },
            { name: "Rinçages sans brushing", price: "40 DT" },
            { name: "Décoloration ou effaceurs", price: "90 DT" },
            { name: "Mèches, reflets, high light", price: "150-300 DT" },
          ],
        },
        {
          badge: "Soins",
          badgeIcon: Sparkles,
          title: "Soins & Traitements",
          subtitle: "Réparation profonde et brillance intense",
          image: "/images/coiffure-soins.jpg",
          items: [
            { name: "Protéine, kératine, caviar, botox", price: "150-300 DT" },
            { name: "Application protéine", price: "80-100 DT" },
            { name: "Soins capillaires sans brushing", price: "30 DT" },
          ],
        },
      ]}
    />
  );
}

export function MakeupSection() {
  return (
    <ServiceSection
      id="makeup"
      label="Beauté du Visage"
      title={
        <>
          Maquillage Pro & <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Épilations</em>
        </>
      }
      subtitle="Un regard intense, une peau parfaite, une douceur absolue — l'art de révéler votre beauté naturelle."
      bgGradient="linear-gradient(180deg, var(--rose-light), var(--bg-cream))"
      cards={[
        {
          badge: "Make-up",
          badgeIcon: Sparkles,
          title: "Make-up & Chignon",
          subtitle: "Pour briller à chaque occasion",
          image: "/images/makeup.jpg",
          items: [
            { name: "Pose cil à cil", price: "45 DT" },
            { name: "Maquillage du jour / simple", price: "60 DT" },
            { name: "Maquillage soirée chargé sans faux cils", price: "80 DT" },
            { name: "Maquillage soirée chargé avec faux cils", price: "100 DT" },
            { name: "Chignon simple", price: "35 DT" },
            { name: "Chignon soirée", price: "50 DT" },
            { name: "Tresse du jour", price: "10 DT" },
          ],
        },
        {
          badge: "Épilations",
          badgeIcon: Feather,
          title: "Sourcils, Visage & Corps",
          subtitle: "Douceur, précision et confort optimal",
          image: "/images/epilation.jpg",
          items: [
            { name: "Sourcils", price: "10 DT" },
            { name: "Lèvres", price: "7 DT" },
            { name: "Pâte", price: "6 DT" },
            { name: "Aisselles", price: "10 DT" },
            { name: "Visage cire / sucre traditionnel", price: "20 DT" },
            { name: "Visage au fil", price: "15 DT" },
            { name: "Demi-bras cire / sucre", price: "15 DT" },
            { name: "Bras complet cire / sucre", price: "15 DT" },
            { name: "Demi-jambes cire / sucre", price: "30 DT" },
          ],
        },
      ]}
    />
  );
}

export function OnglerieSection() {
  return (
    <ServiceSection
      id="onglerie"
      label="Onglerie"
      title={
        <>
          Nail Art & <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Élégance</em>
        </>
      }
      subtitle="Manucure, pédicure, French et créations exclusives — l'expression de votre style jusqu'au bout des ongles."
      cards={[
        {
          badge: "Vernis & Poses",
          badgeIcon: Sparkles,
          title: "Permanent & Gel",
          subtitle: "Tenue longue durée et finition impeccable",
          image: "/images/onglerie.jpg",
          items: [
            { name: "Vernis permanent", price: "25 DT" },
            { name: "Vernis permanent base gel", price: "35 DT" },
            { name: "Gel capsule vernis permanent", price: "45 DT" },
            { name: "Gel sur ongle naturel", price: "35 DT" },
            { name: "Remplissage", price: "40 DT" },
            { name: "Dépose", price: "20 DT" },
            { name: "Ongle cassé", price: "5 DT" },
            { name: "Design / doigt", price: "3 DT" },
            { name: "Extension sur ongles naturels", price: "35 DT" },
            { name: "Capsule américaine", price: "55 DT" },
            { name: "French Manicure supplément", price: "10 DT" },
          ],
        },
        {
          badge: "Bien-être",
          badgeIcon: HandHeart,
          title: "Soins Mains & Pieds",
          subtitle: "Une attention experte pour vos extrémités",
          image: "/images/soins-mains.jpg",
          items: [
            { name: "Soin des mains sans pose vernis", price: "20 DT" },
            { name: "Soin des pieds sans pose vernis", price: "30 DT" },
            { name: "Soin des mains + vernis permanent", price: "40 DT" },
            { name: "Soin des pieds + vernis permanent", price: "50 DT" },
          ],
        },
      ]}
    />
  );
}

export function MassagesSection() {
  return (
    <ServiceSection
      id="massages"
      label="Bien-être"
      title={
        <>
          Massages · <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Évasion</em> Sensorielle
        </>
      }
      subtitle="Modelages personnalisés et huiles précieuses pour un voyage de détente profonde, alliant tradition et raffinement."
      bgGradient="linear-gradient(180deg, var(--bg-cream), var(--rose-light))"
      cards={[
        {
          badge: "Signature",
          badgeIcon: Leaf,
          title: "Corps & Détente",
          subtitle: "Reconnectez-vous à votre essence",
          image: "/images/massage.jpg",
          items: [
            { name: "Massage complet corps + tête (45min)", price: "130 DT" },
            { name: "Massage complet corps (45min)", price: "90 DT" },
            { name: "Massage dos & épaules (30min)", price: "40 DT" },
            { name: "Massage pieds & jambes (20min)", price: "30 DT" },
          ],
        },
        {
          badge: "Sérénité",
          badgeIcon: Heart,
          title: "Notre Philosophie",
          subtitle: "L'art du toucher au service de votre bien-être",
          image: "/images/headspa.jpg",
          items: [],
          description:
            "Nos massages sont conçus sur mesure avec des huiles essentielles d'exception. Chaque geste, chaque pression, chaque souffle est pensé pour vous offrir une parenthèse de pure relaxation dans une ambiance feutrée et chaleureuse. Laissez-vous transporter par un moment de grâce absolue.",
        },
      ]}
    />
  );
}

import { motion } from "framer-motion";
import { Award, Star, Calendar } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  bookingCode: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Salma Beriri",
    role: "Directrice Artistique & Master Colorist",
    specialty: "Balayage Signature & Rituels Head Spa VIP",
    experience: "10+ ans d'expertise",
    bio: "Passionnée par les nuances subtiles et le soin profond du cuir chevelu. Formée aux académies de beauté internationales.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bookingCode: "st-salma",
  },
  {
    name: "Hend Bouzaiene",
    role: "Experte Haute Coiffure",
    specialty: "Brushings Hollywoodiens, Chignons & Wavy Luxe",
    experience: "8 ans d'expertise",
    bio: "Le sens absolu du volume et du mouvement. Hend sculpte votre chevelure pour faire tourner tous les regards sur votre passage.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    bookingCode: "st-hend",
  },
  {
    name: "Emna Gharsallah",
    role: "Master Nail Artist & Soins Visage",
    specialty: "Onglerie Premium, Capsule Américaine & Nail Art",
    experience: "7 ans d'expertise",
    bio: "Une précision d'orfèvre et un raffinement sans égal pour sublimer vos mains et vos pieds dans les moindres détails.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    bookingCode: "st-emna",
  },
];

export function TeamSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-[120px]" style={{ background: "linear-gradient(180deg, var(--rose-light), var(--bg-cream))" }}>
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
            Notre Équipe
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Nos Artisans de la <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Beauté</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            Découvrez les expertes passionnées qui vous accompagnent dans votre transformation avec bienveillance et savoir-faire.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <MemberCard key={i} {...member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  name,
  role,
  specialty,
  experience,
  bio,
  image,
  index,
}: TeamMember & { index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[32px] border bg-white p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_36px_70px_-14px_rgba(169,77,127,0.22)]"
      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
    >
      {/* Experience Badge */}
      <div
        className="absolute top-6 right-6 z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[1px] backdrop-blur-md"
        style={{ background: "rgba(253, 245, 249, 0.9)", color: "var(--pre-dawn-sky)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      >
        <Award size={13} />
        {experience}
      </div>

      {/* Premium Portrait */}
      <div className="relative mb-7 h-[300px] w-full overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))" }}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(59,34,49,0.45)] to-transparent via-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold tracking-tight" style={{ color: "var(--rich-rose)" }}>
            {name}
          </h3>
          <div className="flex text-[var(--magenta)] text-xs">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
          </div>
        </div>

        <div className="mb-4 font-sans text-xs font-semibold tracking-wide" style={{ color: "var(--pre-dawn-sky)" }}>
          {role}
        </div>

        <div className="mb-4 rounded-xl p-3 bg-[var(--bg-cream)] border border-[rgba(232,148,195,0.2)]">
          <span className="block font-sans text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--black-raspberry)]">
            ✦ Spécialité Signature :
          </span>
          <span className="mt-0.5 block font-serif text-sm font-medium text-[var(--rich-rose)]">
            {specialty}
          </span>
        </div>

        <p className="mb-8 font-serif text-sm italic leading-relaxed text-[var(--black-raspberry)]">
          "{bio}"
        </p>

        {/* Booking CTA */}
        <div className="mt-auto pt-4 border-t border-[rgba(252,232,241,0.8)]">
          <a
            href="#contact"
            className="group/btn flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-[1.5px] transition-all duration-300 hover:bg-[var(--rich-rose)] hover:text-white"
            style={{
              background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))",
              color: "var(--rich-rose)",
            }}
          >
            <Calendar size={15} />
            Prendre RDV avec {name.split(" ")[0]}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

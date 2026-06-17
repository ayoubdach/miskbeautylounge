import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

const testimonials = [
  {
    text: "Fantastic salon! Warm welcome, top-notch hairdressers, and the result was exactly what I wanted. I recommend it 100% !",
    name: "Preview",
    role: "Il y a 4 mois · Google",
    initial: "P",
    gradient: "linear-gradient(135deg, var(--pre-dawn-sky), var(--rich-rose))",
    color: "#FFFFFF",
  },
  {
    text: "Excellent service. Thank you so much for your expertise ❤️❤️❤️❤️",
    name: "Beriri Salma",
    role: "Il y a 3 mois · Google",
    initial: "B",
    gradient: "linear-gradient(135deg, var(--magenta), var(--pre-dawn-sky))",
    color: "#FFFFFF",
  },
  {
    text: "I really liked the service, very nice staff, the vibe is amazing and the people who work there are very welcoming.",
    name: "Meriame Moula",
    role: "Il y a 20h · Google",
    initial: "M",
    gradient: "linear-gradient(135deg, var(--black-raspberry), var(--rich-rose))",
    color: "#FFFFFF",
  },
  {
    text: "Service excellent, accueil chaleureux et prix abordables pour tous. شكرا على الخدمة المزيانة",
    name: "Hannoun Dadoucha",
    role: "Il y a 5 mois · Google",
    initial: "H",
    gradient: "linear-gradient(135deg, var(--island-sunset), var(--magenta))",
    color: "var(--rich-rose)",
  },
  {
    text: "Excellent service ❤️ — un blow dry parfait, une équipe au top !",
    name: "Hend Bouzaiene",
    role: "Il y a 5 mois · Google",
    initial: "H",
    gradient: "linear-gradient(135deg, var(--rich-rose), var(--black-raspberry))",
    color: "#FFFFFF",
  },
  {
    text: "Service VIP — une expérience inoubliable ⭐⭐⭐⭐⭐",
    name: "Emna Gharsallah",
    role: "Il y a 4 mois · Google",
    initial: "E",
    gradient: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
    color: "var(--rich-rose)",
  },
  {
    text: "Saçınızı kestirmek isterseniz Tunus'ta gelinecek nokta ☺️ Gayet memnun kaldım.",
    name: "Dimple Ferlengez",
    role: "Il y a 3 mois · Google",
    initial: "D",
    gradient: "linear-gradient(135deg, var(--pre-dawn-sky), var(--black-raspberry))",
    color: "#FFFFFF",
  },
  {
    text: "Sono andata da Miriem, mi sono fatta i capelli, le unghie e la pulizia del viso. Che professionalità, bravura e tanto relax ✨",
    name: "Amel Taboury",
    role: "Il y a 4 mois · Google",
    initial: "A",
    gradient: "linear-gradient(135deg, var(--island-sunset), var(--magenta))",
    color: "var(--rich-rose)",
  },
];

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="bg-[var(--bg-cream)] py-[120px]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            Témoignages
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Ce qu'elles <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>disent</em> de nous
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            L'amour de nos clientes est notre plus belle récompense — découvrez leurs expériences.
          </p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  text,
  name,
  role,
  initial,
  gradient,
  color,
  index,
}: {
  text: string;
  name: string;
  role: string;
  initial: string;
  gradient: string;
  color: string;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
      className="testimonial-card group relative overflow-hidden rounded-[28px] border bg-white p-9 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(169,77,127,0.14)]"
      style={{ borderColor: "rgba(232, 148, 195, 0.25)" }}
    >
      <Quote
        size={48}
        className="absolute right-6 top-4 font-serif opacity-25"
        style={{ color: "var(--island-sunset)" }}
        strokeWidth={1}
      />
      <div className="mb-4 tracking-[3px]" style={{ color: "var(--magenta)", fontSize: "14px" }}>
        ★★★★★
      </div>
      <p className="mb-6 font-serif text-base font-light italic leading-[1.75]" style={{ color: "var(--black-raspberry)" }}>
        "{text}"
      </p>
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full font-serif text-base font-bold"
          style={{ background: gradient, color }}
        >
          {initial}
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide" style={{ color: "var(--rich-rose)" }}>
            {name}
          </div>
          <div className="mt-0.5 text-[11px] tracking-[1px]" style={{ color: "var(--black-raspberry)" }}>
            {role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

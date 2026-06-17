import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

const contactCards = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "96 425 796",
    href: "tel:+21696425796",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "5 Avenue d'Afrique",
    content2: "Menzah5, Tunis",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lundi – Samedi",
    content2: "9h30 – 19h00",
  },
];

export function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="py-[120px]"
      style={{ background: "linear-gradient(180deg, var(--bg-cream), var(--rose-light))" }}
    >
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
            Réservation
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Prenez <em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>Rendez-vous</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            Notre équipe vous accueille avec attention pour vous offrir une expérience d'exception. Choisissez le canal qui vous convient.
          </p>
        </motion.div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {contactCards.map((card, i) => (
            <ContactCard key={i} {...card} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://wa.me/21696425796?text=Bonjour%20Misk%20Beauty%20Lounge,%20je%20souhaite%20prendre%20rendez-vous."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full px-11 py-4 font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-white transition-all duration-400 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "0 6px 24px rgba(37, 211, 102, 0.35)",
            }}
          >
            <MessageCircle size={20} fill="white" className="text-white" />
            WhatsApp RDV
          </a>
          <a
            href="tel:+21696425796"
            className="flex items-center gap-3 rounded-full px-11 py-4 font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-white transition-all duration-400 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, var(--rich-rose), var(--pre-dawn-sky))",
              boxShadow: "0 6px 24px rgba(169, 77, 127, 0.4)",
            }}
          >
            <Phone size={18} />
            Appeler maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  content,
  content2,
  href,
  index,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  content2?: string;
  href?: string;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
      className="rounded-[28px] border bg-white p-9 text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(169,77,127,0.14)]"
      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
    >
      <div
        className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[22px]"
        style={{ background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))" }}
      >
        <Icon size={26} color="var(--rich-rose)" />
      </div>
      <h4 className="mb-2 font-serif text-[22px] font-medium" style={{ color: "var(--rich-rose)" }}>
        {title}
      </h4>
      {href ? (
        <a
          href={href}
          className="text-[15px] font-normal tracking-wide transition-colors duration-300 hover:text-[var(--pre-dawn-sky)]"
          style={{ color: "var(--black-raspberry)" }}
        >
          {content}
        </a>
      ) : (
        <p className="text-[15px] font-normal tracking-wide" style={{ color: "var(--black-raspberry)" }}>
          {content}
          {content2 && (
            <>
              <br />
              {content2}
            </>
          )}
        </p>
      )}
    </motion.div>
  );
}

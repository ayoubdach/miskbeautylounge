import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqList: FaqItem[] = [
  {
    question: "Comment se préparer pour un rituel Head Spa ?",
    answer: "Il n'est pas nécessaire de vous laver les cheveux au préalable, car notre rituel comprend un shampoing sur-mesure profond et un gommage purifiant du cuir chevelu. Venez simplement détendue, notre équipe s'occupe de tout le reste.",
    category: "Head Spa",
  },
  {
    question: "Combien de temps dure une pose de vernis permanent ou de gel ?",
    answer: "Une pose de vernis permanent dure en moyenne 45 minutes pour une tenue impeccable de 3 à 4 semaines. Pour une pose de gel avec capsule ou extension sur ongles naturels, comptez environ 1h15 à 1h30 selon la complexité du design ou du Nail Art souhaité.",
    category: "Onglerie",
  },
  {
    question: "Quelle est la différence entre le soin Botox, Kératine et Caviar ?",
    answer: "Le soin Botox agit comme un repulpant pour combler les brèches et apporter une hydratation miroir sans dénaturer vos boucles. La Kératine permet un lissage doux et une élimination totale des frisottis. Le rituel Caviar est notre soin prestige le plus luxueux, offrant une régénération profonde et une brillance spectaculaire aux cheveux très endommagés.",
    category: "Coiffure",
  },
  {
    question: "Faut-il obligatoirement réserver à l'avance ?",
    answer: "Oui, afin de préserver l'atmosphère feutrée et d'exception de notre institut à Menzah5, nous travaillons principalement sur rendez-vous. Vous pouvez réserver instantanément via notre formulaire interactif ou par message direct sur WhatsApp.",
    category: "Réservation",
  },
  {
    question: "Proposez-vous des cartes cadeaux ou des formules privatisées pour mariées ?",
    answer: "Absolument. Nous concevons de superbes cartes cadeaux virtuelles ou physiques, ainsi que des packages sur-mesure pour les mariées et leurs proches (formules privatisation de notre Lounge avec collations et soins VIP). N'hésitez pas à nous appeler pour configurer votre événement.",
    category: "Services",
  },
];

export function FaqSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const categories = ["Tous", "Head Spa", "Onglerie", "Coiffure", "Réservation"];
  const filteredFaqs = selectedCategory === "Tous" ? faqList : faqList.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-[120px]" style={{ backgroundColor: "var(--bg-cream)" }}>
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        className="mx-auto max-w-[960px] px-6 lg:px-8"
      >
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-3.5 font-sans text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--pre-dawn-sky)" }}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--island-sunset)]" />
            <HelpCircle size={14} />
            FAQ · Questions fréquentes
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--island-sunset)]" />
          </div>
          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            Vos Questions, Nos Réponses d'<em className="font-serif font-medium not-italic text-[var(--pre-dawn-sky)]">Experts</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[17px] font-light italic leading-[1.7]" style={{ color: "var(--black-raspberry)" }}>
            Tout ce que vous devez savoir pour profiter pleinement de votre parenthèse de beauté chez Misk Beauty Lounge.
          </p>
        </div>

        {/* Categories triggers */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full px-5 py-2 font-sans text-xs font-semibold uppercase tracking-[1px] transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-md"
                  : "border border-[rgba(232,148,195,0.3)] bg-white text-[var(--text-soft)] hover:border-[var(--island-sunset)] hover:bg-[var(--rose-light)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion items */}
        <div className="space-y-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-[24px] border transition-all duration-400 ${
                  isOpen
                    ? "border-[var(--magenta)] bg-white shadow-[0_16px_40px_rgba(169,77,127,0.12)]"
                    : "border-[rgba(232,148,195,0.3)] bg-white/60 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="flex w-full items-center justify-between p-7 text-left outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-serif text-xs font-bold"
                      style={{
                        backgroundColor: isOpen ? "var(--rich-rose)" : "var(--rose-light)",
                        color: isOpen ? "var(--island-sunset)" : "var(--rich-rose)",
                      }}
                    >
                      Q
                    </span>
                    <span className="font-serif text-lg font-medium leading-snug sm:text-xl" style={{ color: "var(--rich-rose)" }}>
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-400 ${
                      isOpen ? "rotate-180 bg-[var(--rose-light)]" : "bg-transparent"
                    }`}
                  >
                    <ChevronDown size={18} color="var(--pre-dawn-sky)" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                    >
                      <div className="px-7 pb-7 pt-2 font-serif text-base font-light italic leading-relaxed" style={{ color: "var(--black-raspberry)" }}>
                        <div className="flex items-start gap-4 border-t pt-5 border-[rgba(252,232,241,0.8)]">
                          <span
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-serif text-xs font-bold"
                            style={{ backgroundColor: "var(--pre-dawn-sky)", color: "white" }}
                          >
                            R
                          </span>
                          <p className="flex-1">{item.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have a question trigger */}
        <div className="mt-12 text-center">
          <p className="font-serif text-sm italic" style={{ color: "var(--black-raspberry)" }}>
            ✦ Une autre question en tête ? Notre équipe de stylistes est à votre entière disposition. ✦
          </p>
          <a
            href="https://wa.me/21696425796"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-[1.5px] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, var(--rose-light), var(--island-sunset))", color: "var(--rich-rose)", boxShadow: "0 4px 16px rgba(232,148,195,0.3)" }}
          >
            <Sparkles size={16} />
            Poser une question sur WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}

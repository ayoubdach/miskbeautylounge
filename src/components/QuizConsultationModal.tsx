import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Calendar } from "lucide-react";

interface QuizConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRecommendation: (serviceId: string) => void;
}

export function QuizConsultationModal({ isOpen, onClose, onBookRecommendation }: QuizConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  if (!isOpen) return null;

  const handleSelectQ1 = (val: string) => {
    setQ1(val);
    setStep(2);
  };

  const handleSelectQ2 = (val: string) => {
    setQ2(val);
    setStep(3);
  };

  const handleSelectQ3 = (val: string) => {
    setQ3(val);
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setStep(4);
    }, 1200);
  };

  const resetQuiz = () => {
    setStep(1);
    setQ1("");
    setQ2("");
    setQ3("");
  };

  // Determine ideal recommendation
  const getRecommendation = () => {
    if (q1.includes("détente") || q3.includes("Zen")) {
      return {
        serviceId: "hs-2",
        title: "Pack Découverte Head Spa",
        subtitle: "L'harmonie parfaite entre relaxation crânienne profonde et éclat du visage.",
        price: 100,
        duration: "60 min",
        match: "99% Match",
        perks: ["Massage sous cascade d'eau", "Aromathérapie apaisante", "Soin visage éclat", "Brushing d'exception"],
      };
    }
    if (q1.includes("Réparer") || q2.includes("pur luxe")) {
      return {
        serviceId: "c-3",
        title: "Rituel Soin Caviar / Botox Capillaire",
        subtitle: "Une cure de jouvence ultime pour gainer, hydrater et illuminer votre chevelure.",
        price: 200,
        duration: "120 min",
        match: "97% Match",
        perks: ["Injection haute brillance", "Réparation interne des fibres", "Bain de vapeur ozonée", "Wavy signature Misk"],
      };
    }
    if (q1.includes("relooking")) {
      return {
        serviceId: "c-2",
        title: "Balayage ou Coloration Sur-Mesure",
        subtitle: "Un jeu de lumière et de reflets digne d'un éditorial de mode international.",
        price: 120,
        duration: "90 min",
        match: "98% Match",
        perks: ["Diagnostic colorimétrique", "Patine neutralisante brillance", "Soin protecteur de liaisons", "Brushing digne d'un tapis rouge"],
      };
    }
    // Default / onglerie
    return {
      serviceId: "o-2",
      title: "Mise en Beauté Onglerie & Mains",
      subtitle: "Des ongles divinement sculptés et des mains parées de douceur.",
      price: 65,
      duration: "75 min",
      match: "96% Match",
      perks: ["Manucure russe de précision", "Extension gel ou capsule", "Vernis permanent brillance absolue", "Modelage relaxant des mains"],
    };
  };

  const rec = getRecommendation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: "rgba(59, 34, 49, 0.88)", backdropFilter: "blur(18px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="relative flex flex-col max-h-[92vh] w-full max-w-[720px] overflow-hidden rounded-[32px] border bg-white shadow-[0_40px_90px_rgba(0,0,0,0.35)]"
          style={{ borderColor: "rgba(232, 148, 195, 0.4)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-8 py-6" style={{ borderColor: "rgba(252, 232, 241, 0.8)" }}>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
              >
                <Sparkles size={16} color="var(--rich-rose)" />
              </span>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "var(--pre-dawn-sky)" }}>
                  Diagnostic Beauté IA
                </span>
                <h2 className="font-serif text-2xl font-medium tracking-tight" style={{ color: "var(--rich-rose)" }}>
                  Trouvez votre rituel signature
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--rose-light)]"
            >
              <X size={20} color="var(--rich-rose)" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 sm:p-10">
            {/* Question 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--island-sunset)" }}>
                  Question 1 sur 3
                </span>
                <h3 className="mb-7 font-serif text-[28px] font-medium leading-snug" style={{ color: "var(--rich-rose)" }}>
                  Quel est votre désir ou besoin prioritaire aujourd'hui ?
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: "Une détente absolue de la tête & de l'esprit", desc: "Soulager le stress, lâcher prise totalement, rituel apaisant" },
                    { label: "Réparer & sublimer des cheveux secs ou abîmés", desc: "Cure d'hydratation intense, brillance éclatante, lissage botox" },
                    { label: "Un relooking couleur ou un balayage éclat", desc: "Changer de style, créer des reflets lumineux et sophistiqués" },
                    { label: "Une manucure / onglerie d'une élégance absolue", desc: "Nail art sur-mesure, french manucure, ongles impeccables" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectQ1(item.label)}
                      className="group flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--magenta)] hover:bg-[var(--rose-light)] hover:shadow-md"
                      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
                    >
                      <div>
                        <div className="font-serif text-lg font-medium" style={{ color: "var(--rich-rose)" }}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 font-sans text-xs" style={{ color: "var(--black-raspberry)" }}>
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" color="var(--pre-dawn-sky)" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--island-sunset)" }}>
                  Question 2 sur 3
                </span>
                <h3 className="mb-7 font-serif text-[28px] font-medium leading-snug" style={{ color: "var(--rich-rose)" }}>
                  De combien de temps disposez-vous pour cette parenthèse ?
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: "Parenthèse express (30 à 45 min)", desc: "Pour les agendas chargés souhaitant un coup d'éclat instantané" },
                    { label: "Rituel complet signature (1h à 1h30)", desc: "L'idéal pour s'immerger pleinement dans le confort du salon" },
                    { label: "Demi-journée de pur luxe (+2h)", desc: "Une transformation totale de la tête aux pieds sans regarder l'heure" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectQ2(item.label)}
                      className="group flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--magenta)] hover:bg-[var(--rose-light)] hover:shadow-md"
                      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
                    >
                      <div>
                        <div className="font-serif text-lg font-medium" style={{ color: "var(--rich-rose)" }}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 font-sans text-xs" style={{ color: "var(--black-raspberry)" }}>
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" color="var(--pre-dawn-sky)" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Question 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--island-sunset)" }}>
                  Question 3 sur 3
                </span>
                <h3 className="mb-7 font-serif text-[28px] font-medium leading-snug" style={{ color: "var(--rich-rose)" }}>
                  Quelle ambiance sensorielle vous correspond le plus ?
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: "Zen & méditative", desc: "Cascade d'eau tiède, obscurité feutrée, arômes d'eucalyptus et massage" },
                    { label: "Cocooning feutré", desc: "Cocon de douceur, thé gourmand offert, conseils de nos stylistes" },
                    { label: "Énergisante & glamour", desc: "Musique entraînante, préparation pour une grande occasion ou une soirée" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectQ3(item.label)}
                      className="group flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--magenta)] hover:bg-[var(--rose-light)] hover:shadow-md"
                      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
                    >
                      <div>
                        <div className="font-serif text-lg font-medium" style={{ color: "var(--rich-rose)" }}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 font-sans text-xs" style={{ color: "var(--black-raspberry)" }}>
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" color="var(--pre-dawn-sky)" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Loading / Calculation */}
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  className="mb-6 h-12 w-12 rounded-full border-4"
                  style={{ borderColor: "rgba(232,148,195,0.2)", borderTopColor: "var(--magenta)" }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <h4 className="font-serif text-2xl font-medium" style={{ color: "var(--rich-rose)" }}>
                  Analyse de vos envies en cours...
                </h4>
                <p className="mt-2 font-sans text-xs uppercase tracking-[3px]" style={{ color: "var(--pre-dawn-sky)" }}>
                  Sélection de votre prestation signature
                </p>
              </motion.div>
            )}

            {/* Step 4: Final Recommendation Display */}
            {step === 4 && !isCalculating && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-5 py-1.5 font-sans text-[11px] font-black uppercase tracking-[2px]"
                    style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))", color: "var(--rich-rose)" }}
                  >
                    <CheckCircle2 size={14} />
                    {rec.match}
                  </div>
                  <h3 className="mb-2 font-serif text-[34px] font-semibold tracking-[-0.5px]" style={{ color: "var(--rich-rose)" }}>
                    {rec.title}
                  </h3>
                  <p className="mx-auto max-w-[500px] font-serif text-base italic leading-relaxed" style={{ color: "var(--black-raspberry)" }}>
                    "{rec.subtitle}"
                  </p>
                </div>

                <div className="mt-8 rounded-[24px] border p-6" style={{ backgroundColor: "var(--bg-cream)", borderColor: "rgba(232,148,195,0.3)" }}>
                  <h4 className="mb-4 font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--pre-dawn-sky)" }}>
                    Ce que comprend votre rituel :
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {rec.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-3 font-serif text-sm font-medium" style={{ color: "var(--rich-rose)" }}>
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--island-sunset)] text-[var(--rich-rose)]">
                          ✓
                        </span>
                        {perk}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-baseline justify-between border-t pt-5" style={{ borderColor: "rgba(232,148,195,0.2)" }}>
                    <span className="font-sans text-xs uppercase tracking-[2px]" style={{ color: "var(--black-raspberry)" }}>
                      ⏱ Durée : {rec.duration}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold tracking-[-1px]" style={{ color: "var(--pre-dawn-sky)" }}>
                        {rec.price}
                      </span>
                      <span className="font-serif text-base font-medium" style={{ color: "var(--black-raspberry)" }}>
                        DT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      onBookRecommendation(rec.serviceId);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 rounded-full px-10 py-4 font-sans text-xs font-bold uppercase tracking-[2px] shadow-[0_8px_24px_rgba(223,144,213,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(223,144,213,0.7)]"
                    style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))", color: "var(--rich-rose)" }}
                  >
                    <Calendar size={18} />
                    Réserver ma recommandation
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 rounded-full border px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[1.5px] transition-all hover:bg-[var(--rose-light)]"
                    style={{ borderColor: "rgba(232,148,195,0.5)", color: "var(--rich-rose)" }}
                  >
                    <RotateCcw size={16} />
                    Refaire le test
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

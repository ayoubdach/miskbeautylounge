import { motion } from "framer-motion";
import { useCountUp, useScrollReveal } from "../hooks/useScrollAnimation";

export function Stats() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const counter1 = useCountUp(2500, 2000, "+");
  const counter2 = useCountUp(8, 2000, "+");
  const counter3 = useCountUp(50, 2000, "+");

  return (
    <section
      className="relative overflow-hidden py-14"
      style={{ background: "linear-gradient(135deg, var(--rich-rose), var(--black-raspberry))" }}
    >
      <div className="absolute inset-0 bg-gradient-radial" />
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-8"
      >
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div ref={counter1.ref}>
            <h3 className="font-serif text-[clamp(38px,5vw,52px)] font-medium tracking-[-1px]" style={{ color: "var(--island-sunset)" }}>
              {counter1.count}
            </h3>
            <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[3px]" style={{ color: "rgba(252, 232, 241, 0.65)" }}>
              Clientes Satisfaites
            </p>
          </div>
          <div ref={counter2.ref}>
            <h3 className="font-serif text-[clamp(38px,5vw,52px)] font-medium tracking-[-1px]" style={{ color: "var(--island-sunset)" }}>
              {counter2.count}
            </h3>
            <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[3px]" style={{ color: "rgba(252, 232, 241, 0.65)" }}>
              Années d'Expertise
            </p>
          </div>
          <div ref={counter3.ref}>
            <h3 className="font-serif text-[clamp(38px,5vw,52px)] font-medium tracking-[-1px]" style={{ color: "var(--island-sunset)" }}>
              {counter3.count}
            </h3>
            <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[3px]" style={{ color: "rgba(252, 232, 241, 0.65)" }}>
              Prestations Signature
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[clamp(38px,5vw,52px)] font-medium tracking-[-1px]" style={{ color: "var(--island-sunset)" }}>
              5.0
            </h3>
            <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[3px]" style={{ color: "rgba(252, 232, 241, 0.65)" }}>
              Avis Google ★★★★★
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Gem, Leaf, Heart, Star, Award, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

const signaturePoints = [
  {
    icon: Gem,
    title: "Expertise Premium",
    text: "Une équipe d'artisans de la beauté formée aux dernières tendances internationales et aux techniques les plus pointues.",
  },
  {
    icon: Leaf,
    title: "Produits d'Exception",
    text: "Nous sélectionnons rigoureusement des marques haut de gamme respectueuses de votre peau et de vos cheveux.",
  },
  {
    icon: Heart,
    title: "Écoute & Bienveillance",
    text: "Chaque prestation est personnalisée selon vos désirs, dans une ambiance feutrée et chaleureuse.",
  },
  {
    icon: Star,
    title: "Cadre d'Exception",
    text: "Un cocon raffiné où chaque détail a été pensé pour vous offrir une parenthèse hors du temps.",
  },
];

const trustBadges = [
  { value: "8+", label: "Années d'Excellence" },
  { value: "2500+", label: "Clientes Satisfaites" },
  { value: "5.0", label: "Note Google" },
];

export function Philosophy() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoContainerRef, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoInView) {
      video.play().catch(() => {
        // Autoplay may be blocked by browser policies; ignore silently
      });
    } else {
      video.pause();
    }
  }, [isVideoInView]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-[140px]"
      style={{ background: "linear-gradient(180deg, var(--bg-cream), var(--rose-light))" }}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: imageY }}
          className="absolute -left-32 top-40 h-[500px] w-[500px] rounded-full opacity-30"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,148,195,0.5), transparent 70%)" }}
          />
        </motion.div>
        <motion.div
          style={{ y: imageY }}
          className="absolute -right-32 bottom-20 h-[600px] w-[600px] rounded-full opacity-25"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.25 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(169,77,127,0.5), transparent 70%)" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(253, 245, 249, 0.7)",
              borderColor: "rgba(232, 148, 195, 0.4)",
            }}
          >
            <Award size={15} style={{ color: "var(--pre-dawn-sky)" }} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "var(--pre-dawn-sky)" }}>
              Notre Signature
            </span>
          </motion.div>

          <h2 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.1] tracking-[-1px]" style={{ color: "var(--rich-rose)" }}>
            L'<em className="font-serif font-medium not-italic" style={{ color: "var(--pre-dawn-sky)" }}>excellence</em> au service de votre beauté
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] font-serif text-[18px] font-light italic leading-[1.8]" style={{ color: "var(--black-raspberry)" }}>
            Chez Misk Beauty Lounge, chaque geste est une promesse : celle de révéler votre éclat unique avec délicatesse et expertise.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Immersive Image with floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[540px]">
              {/* Decorative frame */}
              <div
                className="absolute -inset-4 rounded-[44px] opacity-40 sm:-inset-6"
                style={{
                  background: "linear-gradient(135deg, var(--magenta), var(--island-sunset), var(--pre-dawn-sky))",
                  filter: "blur(20px)",
                }}
              />

              {/* Main video container */}
              <div
                ref={videoContainerRef}
                className="relative overflow-hidden rounded-[36px] border shadow-[0_36px_80px_rgba(59,34,49,0.22)]"
                style={{ borderColor: "rgba(232, 148, 195, 0.4)" }}
              >
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                  poster="https://res.cloudinary.com/dlllcg1cm/image/upload/q_auto/f_auto/v1781628777/706704747_122178139592862696_144972524975596783_n_fthqri.jpg"
                >
                  <source
                    src="https://res.cloudinary.com/dlllcg1cm/video/upload/q_auto/f_mp4/v1781657423/copy_29A2F76B-4CD9-4036-B08A-D10C0590038F_yumpmj.mp4"
                    type="video/mp4"
                  />
                </video>
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(59,34,49,0.6) 0%, transparent 40%, rgba(59,34,49,0.2) 100%)",
                  }}
                />

                {/* Floating badge on image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 rounded-2xl border p-5 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-[280px]"
                  style={{
                    backgroundColor: "rgba(49, 27, 39, 0.75)",
                    borderColor: "rgba(232, 148, 195, 0.3)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
                    >
                      <Sparkles size={22} color="var(--rich-rose)" />
                    </div>
                    <div>
                      <div className="font-serif text-lg font-medium text-white">
                        L'Expérience MBL
                      </div>
                      <div className="font-sans text-[10px] uppercase tracking-[2px]" style={{ color: "var(--island-sunset)" }}>
                        Luxe · Soin · Bien-être
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Trust pills floating */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -right-4 top-10 hidden flex-col gap-3 lg:flex"
              >
                {trustBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border px-5 py-3 text-center shadow-lg backdrop-blur-xl"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "rgba(232, 148, 195, 0.3)",
                    }}
                  >
                    <div className="font-serif text-xl font-bold" style={{ color: "var(--pre-dawn-sky)" }}>
                      {badge.value}
                    </div>
                    <div className="font-sans text-[9px] font-bold uppercase tracking-[1.5px]" style={{ color: "var(--black-raspberry)" }}>
                      {badge.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Philosophy Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {signaturePoints.map((point, i) => (
              <PhilosophyCard key={i} {...point} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom manifesto quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-20 max-w-[900px] text-center"
        >
          <div
            className="relative rounded-[32px] border px-8 py-10 backdrop-blur-md sm:px-12 sm:py-12"
            style={{
              backgroundColor: "rgba(59, 34, 49, 0.85)",
              borderColor: "rgba(232, 148, 195, 0.3)",
            }}
          >
            <div
              className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
            >
              <Sparkles size={14} color="var(--rich-rose)" />
            </div>
            <p className="font-serif text-[clamp(20px,3vw,28px)] font-light italic leading-[1.6] text-white">
              "Nous ne créons pas seulement une beauté extérieure — nous offrons à chaque femme le temps de se reconnecter à elle-même, dans un cocon où le luxe rencontre l'authenticité."
            </p>
            <div className="mt-6 font-sans text-[10px] font-bold uppercase tracking-[4px]" style={{ color: "var(--island-sunset)" }}>
              — La promesse Misk Beauty Lounge
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophyCard({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.2, 0, 0, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-500 hover:shadow-[0_24px_48px_-14px_rgba(169,77,127,0.2)]"
      style={{ borderColor: "rgba(232, 148, 195, 0.3)" }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at top left, rgba(232,148,195,0.2), transparent 60%)",
        }}
      />

      <div
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))" }}
      >
        <Icon size={26} color="var(--rich-rose)" />
      </div>

      <h4 className="relative mb-3 font-serif text-[22px] font-medium" style={{ color: "var(--rich-rose)" }}>
        {title}
      </h4>
      <p className="relative text-sm leading-[1.75]" style={{ color: "var(--black-raspberry)" }}>
        {text}
      </p>

      <div className="relative mt-5 h-px w-12 bg-gradient-to-r from-[var(--magenta)] to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

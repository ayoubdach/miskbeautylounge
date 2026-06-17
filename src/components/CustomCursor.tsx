import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useSpring(0, { stiffness: 500, damping: 28 });
  const y = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], .service-card, .package-card, .testimonial-card, .gallery-img"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove("custom-cursor-active");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [x, y]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[10000] h-6 w-6 rounded-full border-[1.5px]"
      style={{
        x,
        y,
        borderColor: "var(--pre-dawn-sky)",
        mixBlendMode: "difference",
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        opacity: isHovering ? 0.8 : 1,
      }}
      transition={{ duration: 0.18 }}
    />
  );
}

import { Phone } from "lucide-react";

const footerLinks = [
  { label: "Coiffure", href: "#coiffure" },
  { label: "Maquillage", href: "#makeup" },
  { label: "Onglerie", href: "#onglerie" },
  { label: "Massages", href: "#massages" },
  { label: "Head Spa", href: "#headspa" },
];

const packLinks = [
  { label: "Pack After Work — 70 DT", href: "#headspa" },
  { label: "Pack Découverte — 100 DT", href: "#headspa" },
  { label: "Pack Misk — 130 DT", href: "#headspa" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-9" style={{ backgroundColor: "var(--rich-rose)" }}>
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--magenta), transparent)" }}
      />
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="mb-14 grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="text-center lg:text-left">
            <h3 className="mb-3.5 font-display text-[32px] font-normal tracking-[2px]" style={{ color: "var(--magenta)" }}>
              Misk Beauty Lounge
            </h3>
            <p className="mx-auto max-w-[320px] text-sm font-light leading-[1.8] lg:mx-0" style={{ color: "rgba(252, 232, 241, 0.6)" }}>
              Institut de beauté haut de gamme à Menzah5. Coiffure, onglerie, maquillage, head spa et soins signature dans un cadre d'exception dédié à l'art de vous sublimer.
            </p>
            <div className="mt-6 flex justify-center gap-3.5 lg:justify-start">
              <SocialLink href="https://www.instagram.com/misk.beautylounge_" label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.facebook.com/profile.php?id=61575880889862" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://wa.me/21696425796" label="WhatsApp">
                <Phone size={18} />
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-[3px]" style={{ color: "var(--island-sunset)" }}>
              Prestations
            </h4>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-1.5 text-sm font-light tracking-wide transition-all duration-300 hover:pl-1.5"
                style={{ color: "rgba(252, 232, 241, 0.65)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-[3px]" style={{ color: "var(--island-sunset)" }}>
              Packs Signature
            </h4>
            {packLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="block py-1.5 text-sm font-light tracking-wide transition-all duration-300 hover:pl-1.5"
                style={{ color: "rgba(252, 232, 241, 0.65)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-[3px]" style={{ color: "var(--island-sunset)" }}>
              Contact
            </h4>
            <a
              href="tel:+21696425796"
              className="block py-1.5 text-sm font-light tracking-wide transition-colors duration-300 hover:text-[var(--magenta)]"
              style={{ color: "rgba(252, 232, 241, 0.65)" }}
            >
              96 425 796
            </a>
            <span
              className="block py-1.5 text-sm font-light tracking-wide"
              style={{ color: "rgba(252, 232, 241, 0.65)" }}
            >
              5 Av. d'Afrique, Menzah5
            </span>
            <span
              className="block py-1.5 text-sm font-light tracking-wide"
              style={{ color: "rgba(252, 232, 241, 0.65)" }}
            >
              Lun–Sam : 9h30–19h
            </span>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-4 border-t pt-7 text-center lg:justify-between"
          style={{ borderColor: "rgba(232, 148, 195, 0.12)" }}
        >
          <p className="text-[13px] font-light tracking-wide" style={{ color: "rgba(252, 232, 241, 0.4)" }}>
            © 2025 Misk Beauty Lounge — Tous droits réservés
          </p>
          <p className="text-[13px] font-light tracking-wide" style={{ color: "rgba(252, 232, 241, 0.4)" }}>
            Conçu avec ♥ pour révéler votre beauté
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: "rgba(232, 148, 195, 0.1)", color: "rgba(252, 232, 241, 0.75)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--magenta)";
        e.currentTarget.style.color = "var(--rich-rose)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(232, 148, 195, 0.1)";
        e.currentTarget.style.color = "rgba(252, 232, 241, 0.75)";
      }}
    >
      {children}
    </a>
  );
}

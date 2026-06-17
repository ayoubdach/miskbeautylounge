import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
}

const servicesList: ServiceOption[] = [
  // Head spa
  { id: "hs-1", name: "Pack After Work Head Spa", category: "Head Spa", price: 70, duration: "45 min" },
  { id: "hs-2", name: "Pack Découverte Head Spa", category: "Head Spa", price: 100, duration: "60 min" },
  { id: "hs-3", name: "Pack Misk Signature Head Spa", category: "Head Spa", price: 130, duration: "75 min" },
  // Coiffure
  { id: "c-1", name: "Brushing & Chignon élégant", category: "Coiffure", price: 35, duration: "40 min" },
  { id: "c-2", name: "Coupe & Coloration Premium", category: "Coiffure", price: 120, duration: "90 min" },
  { id: "c-3", name: "Soin Kératine / Caviar / Botox", category: "Coiffure", price: 200, duration: "120 min" },
  { id: "c-4", name: "Wavy Signature Misk", category: "Coiffure", price: 25, duration: "30 min" },
  // Onglerie
  { id: "o-1", name: "Vernis permanent + Manucure", category: "Onglerie", price: 40, duration: "45 min" },
  { id: "o-2", name: "Gel Capsule + Vernis permanent", category: "Onglerie", price: 65, duration: "75 min" },
  { id: "o-3", name: "Soin Pieds VIP + Vernis permanent", category: "Onglerie", price: 50, duration: "60 min" },
  // Maquillage
  { id: "m-1", name: "Make-up Soirée Glamour", category: "Maquillage", price: 80, duration: "60 min" },
  { id: "m-2", name: "Make-up Soirée avec Faux Cils", category: "Maquillage", price: 100, duration: "70 min" },
  { id: "m-3", name: "Pose cil à cil professionnelle", category: "Maquillage", price: 45, duration: "60 min" },
  // Massages
  { id: "ms-1", name: "Massage complet Corps + Tête", category: "Massages", price: 130, duration: "45 min" },
  { id: "ms-2", name: "Massage relaxant Dos & Épaules", category: "Massages", price: 40, duration: "30 min" },
  { id: "ep-1", name: "Épilation Visage au fil + Sourcils", category: "Épilations", price: 25, duration: "25 min" },
];

const staffList = [
  { id: "st-any", name: "Première disponible", role: "Équipe Misk", avatar: "👑" },
  { id: "st-salma", name: "Salma Beriri", role: "Master Colorist & Head Spa", avatar: "✦" },
  { id: "st-hend", name: "Hend Bouzaiene", role: "Spécialiste Brushing & Wavy", avatar: "🌸" },
  { id: "st-emna", name: "Emna Gharsallah", role: "Nail Artist & Soins Visage", avatar: "✨" },
];

const timeSlots = ["09:30", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30"];

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export function BookingWizardModal({ isOpen, onClose, initialServiceId }: BookingWizardModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceId ? [initialServiceId] : []
  );
  const [selectedStaff, setSelectedStaff] = useState("st-any");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    return tmr.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = useState("10:30");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  if (!isOpen) return null;

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServicesObjects = servicesList.filter((s) => selectedServices.includes(s.id));
  const totalPrice = selectedServicesObjects.reduce((acc, s) => acc + s.price, 0);

  const handleConfirmWhatsApp = () => {
    const serviceNames = selectedServicesObjects.map((s) => `• ${s.name} (${s.price} DT)`).join("\n");
    const staffObj = staffList.find((s) => s.id === selectedStaff);

    const message = `*✦ Nouvelle Demande de Réservation MBL ✦*\n\n` +
      `*Cliente:* ${clientName || "Non renseigné"}\n` +
      `*Téléphone:* ${clientPhone || "Non renseigné"}\n\n` +
      `*Prestations Sélectionnées:*\n${serviceNames || "• Prestation sur mesure"}\n\n` +
      `*Total Estimé:* ${totalPrice} DT\n` +
      `*Experte Souhaitée:* ${staffObj ? staffObj.name : "Première disponible"}\n` +
      `*Date & Heure Souhaitées:* ${selectedDate} à ${selectedTime}\n` +
      `${clientNotes ? `\n*Note supplémentaire:* "${clientNotes}"` : ""}\n\n` +
      `_Merci de confirmer ma réservation dès que possible._`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/21696425796?text=${encodedMsg}`, "_blank");
    onClose();
  };

  const categories = ["Tous", "Head Spa", "Coiffure", "Onglerie", "Maquillage", "Massages"];
  const [activeTab, setActiveTab] = useState("Tous");

  const filteredServices = activeTab === "Tous"
    ? servicesList
    : servicesList.filter((s) => s.category === activeTab || (activeTab === "Massages" && s.category === "Épilations"));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: "rgba(36, 19, 29, 0.85)", backdropFilter: "blur(16px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="relative flex flex-col max-h-[92vh] w-full max-w-[840px] overflow-hidden rounded-[32px] border bg-white shadow-[0_36px_80px_rgba(0,0,0,0.3)]"
          style={{ borderColor: "rgba(232, 148, 195, 0.4)" }}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b px-8 py-6" style={{ borderColor: "rgba(252, 232, 241, 0.8)" }}>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[3px]" style={{ color: "var(--pre-dawn-sky)" }}>
                Réservation Misk Beauty Lounge
              </span>
              <h2 className="font-serif text-2xl font-medium tracking-tight" style={{ color: "var(--rich-rose)" }}>
                {step === 1 && "Étape 1 : Choisissez vos Prestations"}
                {step === 2 && "Étape 2 : Date, Créneau & Experte"}
                {step === 3 && "Étape 3 : Vos Coordonnées & Confirmation"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--rose-light)]"
            >
              <X size={20} color="var(--rich-rose)" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="grid grid-cols-3 h-1 bg-[var(--rose-light)]">
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, var(--magenta), var(--island-sunset))" }}
              animate={{ width: step >= 1 ? "100%" : "0%" }}
            />
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, var(--island-sunset), var(--pre-dawn-sky))" }}
              animate={{ width: step >= 2 ? "100%" : "0%" }}
            />
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, var(--pre-dawn-sky), var(--rich-rose))" }}
              animate={{ width: step >= 3 ? "100%" : "0%" }}
            />
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* STEP 1: Services Selection */}
            {step === 1 && (
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className={`rounded-full px-5 py-2 font-sans text-xs font-medium uppercase tracking-[1px] transition-all duration-300 ${
                        activeTab === cat
                          ? "bg-[var(--rich-rose)] text-[var(--island-sunset)] shadow-[0_4px_14px_rgba(59,34,49,0.2)]"
                          : "bg-[var(--bg-cream)] text-[var(--text-soft)] hover:bg-[var(--rose-light)] hover:text-[var(--rich-rose)]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {filteredServices.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`group relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-[var(--magenta)] bg-[var(--bg-cream)] shadow-[0_8px_20px_rgba(223,144,213,0.18)]"
                            : "border-[rgba(232,148,195,0.3)] hover:border-[var(--island-sunset)] hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 pr-2">
                          <div
                            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                              isSelected
                                ? "border-transparent bg-[var(--magenta)] text-white"
                                : "border-[rgba(232,148,195,0.6)] bg-white group-hover:border-[var(--island-sunset)]"
                            }`}
                          >
                            {isSelected && <Check size={14} color="var(--rich-rose)" strokeWidth={3} />}
                          </div>
                          <div>
                            <div className="font-serif text-base font-medium leading-snug" style={{ color: "var(--rich-rose)" }}>
                              {service.name}
                            </div>
                            <div className="flex items-center gap-2 font-sans text-[11px]" style={{ color: "var(--black-raspberry)" }}>
                              <span>{service.category}</span>
                              <span>•</span>
                              <span>⏱ {service.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="whitespace-nowrap text-right font-serif text-lg font-bold" style={{ color: "var(--pre-dawn-sky)" }}>
                          {service.price} DT
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Date, Time & Staff */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Staff Selection */}
                <div>
                  <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--pre-dawn-sky)" }}>
                    1. Préférence d'Experte
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {staffList.map((staff) => (
                      <div
                        key={staff.id}
                        onClick={() => setSelectedStaff(staff.id)}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${
                          selectedStaff === staff.id
                            ? "border-[var(--rich-rose)] bg-[var(--rich-rose)] text-white shadow-lg"
                            : "border-[rgba(232,148,195,0.3)] hover:border-[var(--island-sunset)]"
                        }`}
                      >
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg"
                          style={{ backgroundColor: selectedStaff === staff.id ? "rgba(255,255,255,0.15)" : "var(--rose-light)" }}
                        >
                          {staff.avatar}
                        </div>
                        <div>
                          <div className="font-serif text-base font-medium leading-snug" style={{ color: selectedStaff === staff.id ? "#FFFFFF" : "var(--rich-rose)" }}>
                            {staff.name}
                          </div>
                          <div className="font-sans text-[11px]" style={{ color: selectedStaff === staff.id ? "var(--island-sunset)" : "var(--black-raspberry)" }}>
                            {staff.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--pre-dawn-sky)" }}>
                      <CalendarIcon size={16} />
                      2. Choix de la Date
                    </h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-2xl border px-5 py-3.5 font-serif text-lg font-medium outline-none transition-all focus:border-[var(--magenta)] focus:ring-2 focus:ring-[var(--rose-light)]"
                      style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
                    />
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--pre-dawn-sky)" }}>
                      <Clock size={16} />
                      3. Créneau Horaire
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-xl px-4 py-2.5 font-serif text-sm font-semibold transition-all ${
                            selectedTime === time
                              ? "bg-[var(--pre-dawn-sky)] text-white shadow-md"
                              : "border border-[rgba(232,148,195,0.3)] bg-[var(--bg-cream)] text-[var(--rich-rose)] hover:border-[var(--island-sunset)] hover:bg-[var(--rose-light)]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Client Details & WhatsApp Validation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-sans text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "var(--rich-rose)" }}>
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Emma Ben Salah"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-2xl border px-5 py-3.5 font-serif text-base outline-none transition-all focus:border-[var(--magenta)] focus:ring-2 focus:ring-[var(--rose-light)]"
                      style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "var(--rich-rose)" }}>
                      Votre Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: +216 98 765 432"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-2xl border px-5 py-3.5 font-serif text-base outline-none transition-all focus:border-[var(--magenta)] focus:ring-2 focus:ring-[var(--rose-light)]"
                      style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "var(--rich-rose)" }}>
                    Demande Particulière ou Soin Spécifique (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez votre type de cheveux, allergies, ou toute note utile pour notre équipe..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full rounded-2xl border p-5 font-serif text-base outline-none transition-all focus:border-[var(--magenta)] focus:ring-2 focus:ring-[var(--rose-light)]"
                    style={{ borderColor: "rgba(232,148,195,0.4)", color: "var(--rich-rose)" }}
                  />
                </div>

                {/* Booking Summary Box */}
                <div className="rounded-2xl border p-6 backdrop-blur-md" style={{ backgroundColor: "rgba(252, 232, 241, 0.4)", borderColor: "rgba(232, 148, 195, 0.3)" }}>
                  <h4 className="mb-4 font-serif text-lg font-medium" style={{ color: "var(--rich-rose)" }}>
                    Récapitulatif de votre Rendez-vous
                  </h4>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div style={{ color: "var(--black-raspberry)" }}>
                      <strong>Prestations :</strong> {selectedServicesObjects.length} sélectionnée(s)
                    </div>
                    <div style={{ color: "var(--black-raspberry)" }}>
                      <strong>Date & Heure :</strong> {selectedDate} à {selectedTime}
                    </div>
                    <div style={{ color: "var(--black-raspberry)" }}>
                      <strong>Experte :</strong> {staffList.find((s) => s.id === selectedStaff)?.name}
                    </div>
                    <div style={{ color: "var(--pre-dawn-sky)" }} className="font-serif text-lg font-bold">
                      <strong>Total estimé :</strong> {totalPrice} DT
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer (Navigation & Validation) */}
          <div className="flex items-center justify-between border-t px-8 py-5" style={{ backgroundColor: "var(--bg-cream)", borderColor: "rgba(252, 232, 241, 0.8)" }}>
            <div>
              {selectedServices.length > 0 && (
                <div className="font-serif text-sm font-medium" style={{ color: "var(--rich-rose)" }}>
                  Total : <strong className="text-lg font-bold text-[var(--pre-dawn-sky)]">{totalPrice} DT</strong>
                  <span className="ml-2 font-sans text-[11px] font-normal text-[var(--black-raspberry)]">
                    ({selectedServices.length} soin{selectedServices.length > 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[1px] transition-all hover:bg-white"
                  style={{ borderColor: "rgba(232,148,195,0.6)", color: "var(--rich-rose)" }}
                >
                  <ArrowLeft size={16} />
                  Retour
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={() => {
                    if (step === 1 && selectedServices.length === 0) {
                      alert("Veuillez sélectionner au moins une prestation pour continuer.");
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="flex items-center gap-2 rounded-full px-8 py-3 font-sans text-xs font-bold uppercase tracking-[1.5px] shadow-[0_6px_20px_rgba(223,144,213,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(223,144,213,0.6)]"
                  style={{
                    background: "linear-gradient(135deg, var(--magenta), var(--island-sunset))",
                    color: "var(--rich-rose)",
                  }}
                >
                  Continuer
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (!clientName || !clientPhone) {
                      alert("Veuillez renseigner votre Nom et votre Numéro de téléphone.");
                      return;
                    }
                    handleConfirmWhatsApp();
                  }}
                  className="flex items-center gap-2 rounded-full px-9 py-3.5 font-sans text-xs font-extrabold uppercase tracking-[1.5px] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)]"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
                >
                  <Check size={18} />
                  Confirmer sur WhatsApp
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

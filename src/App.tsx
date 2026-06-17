import { useState } from "react";
import { Preloader } from "./components/Preloader";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { AudioAmbience } from "./components/AudioAmbience";
import { CustomerToast } from "./components/CustomerToast";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Stats } from "./components/Stats";
import { HeadSpaCarousel } from "./components/HeadSpaCarousel";
import { UnifiedServicesShowcase } from "./components/UnifiedServicesShowcase";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { FaqSection } from "./components/FaqSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { BookingWizardModal } from "./components/BookingWizardModal";
import { QuizConsultationModal } from "./components/QuizConsultationModal";

export default function App() {
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [bookingWizardInitialServiceId, setBookingWizardInitialServiceId] = useState<string | undefined>(undefined);

  const handleOpenBookingWizard = (serviceId?: string) => {
    setBookingWizardInitialServiceId(serviceId);
    setIsBookingWizardOpen(true);
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <AudioAmbience />
      <CustomerToast />

      <Navbar
        onOpenBookingWizard={() => handleOpenBookingWizard()}
        onOpenQuiz={handleOpenQuiz}
      />

      <main>
        <Hero
          onOpenBookingWizard={() => handleOpenBookingWizard()}
          onOpenQuiz={handleOpenQuiz}
        />
        <Philosophy />
        <Stats />
        <HeadSpaCarousel onBookPack={(id) => handleOpenBookingWizard(id)} />
        <UnifiedServicesShowcase onBookService={() => handleOpenBookingWizard()} />
        <Gallery />
        <Testimonials />
        <FaqSection />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      {/* Interactive Jaw-Dropping Modals */}
      <BookingWizardModal
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        initialServiceId={bookingWizardInitialServiceId}
      />

      <QuizConsultationModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onBookRecommendation={(serviceId) => handleOpenBookingWizard(serviceId)}
      />
    </>
  );
}

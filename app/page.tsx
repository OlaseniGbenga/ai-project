import BusinessSection from "@/components/landingPage/business-section";
import CoursesSection from "@/components/landingPage/courses-section";
import Hero from "@/components/landingPage/hero";
import { Header } from "@/components/landingPage/header";
import HowItWorksSection from "@/components/landingPage/how-it-works-section";
import AiWorkSection from "@/components/landingPage/ai-work-section";
import FaqSection from "@/components/landingPage/faq-section";
import FooterSection from "@/components/landingPage/footer-section";
import PlatformKitSection from "@/components/landingPage/platform-kit-section";
import ReviewsSection from "@/components/landingPage/reviews-section";
import Fix from "@/components/landingPage/fix";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <BusinessSection />
      {/* <HowItWorksSection />
      <PlatformKitSection />
      <AiWorkSection /> */}

      <Fix />

      <CoursesSection />
      <ReviewsSection />
      <FaqSection />
      <FooterSection />
    </>
  );
};

export default Home;

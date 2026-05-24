import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import StorySection from "@/components/StorySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <StorySection />
    </div>
  );
};

export default Index;

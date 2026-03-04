import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import HorizontalShowcase from "@/components/home/HorizontalShowcase";
import StorySection from "@/components/home/StorySection";
import Testimonials from "@/components/home/Testimonials";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <HorizontalShowcase />
      <StorySection />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}

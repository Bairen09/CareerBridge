import { MainLayout } from "../components/layouts/MainLayout";

import { HeroSection } from "../components/home/HeroSection";
import { FeaturedNewsCarousel } from "../components/home/FeaturedNewsCarousel";
import { LatestUpdates } from "../components/home/LatestUpdates";
import { QuickLinks } from "../components/home/QuickLinks";
import { UpcomingEvents } from "../components/home/UpcomingEvents";
import { EmployeeSpotlight } from "../components/home/EmployeeSpotlight";
import { TestimonialsSection } from "../components/home/TestimonialsSection";

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedNewsCarousel />
      <LatestUpdates />
      <QuickLinks />
      <UpcomingEvents />
      <EmployeeSpotlight />
      <TestimonialsSection />
    </MainLayout>
  );
}
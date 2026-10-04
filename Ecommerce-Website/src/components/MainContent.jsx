import CategoriesSection from "./CategoriesSection";
import FeaturedSection from "./FeaturedSection";
import FirstSection from "./FirstSection";
import OurProductsSection from "./OurProductsSection";
import ThisMonthSection from "./ThisMonthSection";
import TodaysSection from "./TodaysSection";

export function MainContent() {
 
  return (
    <main className="max-w-6xl w-full mx-auto flex flex-col">
      <FirstSection />
      <TodaysSection />
      <CategoriesSection />
      <ThisMonthSection />
      <OurProductsSection/>
      <FeaturedSection/>
      
    </main>
  );
}

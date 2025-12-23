import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ProductsGrid from "@/components/ProductsGrid";
import Stats from "@/components/Stats";
import IndustriesServed from "@/components/IndustriesServed";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServiceCoverage from "@/components/ServiceCoverage";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import ClientsTicker from "@/components/ClientsTicker";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProductsGrid showHeader={true} />
      <Introduction /> {/* Why DetcoShades */}
      <Stats />
      <IndustriesServed />
      <FeaturedProjects />
      <ServiceCoverage />
      <Testimonials />
      <ClientsTicker />
      <FinalCTA />
    </main>
  );
}

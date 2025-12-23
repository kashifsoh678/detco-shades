import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ProductsGrid from "@/components/ProductsGrid";
import Stats from "@/components/Stats";
import ClientsTicker from "@/components/ClientsTicker";



import FeaturedProjects from "@/components/FeaturedProjects";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Introduction />
      <Stats />
      <FeaturedProjects />
      <ProductsGrid showHeader={true} />
      <ClientsTicker />
      <FinalCTA />
    </main>
  );
}

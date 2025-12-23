import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ProductsGrid from "@/components/ProductsGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Introduction />
      <ProductsGrid />
    </main>
  );
}

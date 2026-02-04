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
import { db } from "@/db";
import { products as productSchema } from "@/db/schema/products";
import { eq, and, desc } from "drizzle-orm";

export default async function Home() {
  const featuredProducts = await db.query.products.findMany({
    where: and(eq(productSchema.isActive, true), eq(productSchema.isFeatured, true)),
    with: {
      thumbnail: true,
    },
    orderBy: [desc(productSchema.order), desc(productSchema.createdAt)],
    limit: 9,
  });

  const formattedProducts = featuredProducts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    thumbnailUrl: p.thumbnail?.url,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProductsGrid showHeader={true} products={formattedProducts} />
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

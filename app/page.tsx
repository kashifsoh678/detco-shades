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
import { projects as projectSchema } from "@/db/schema/projects";
import { clients as clientSchema } from "@/db/schema/clients";
import { eq, and, desc, asc } from "drizzle-orm";

export default async function Home() {
  // Fetch first 9 featured and active products
  const featuredProducts = await db.query.products.findMany({
    where: eq(productSchema.isActive, true),
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

  // Fetch latest 3 active projects with full details for Quick View
  const latestProjects = await db.query.projects.findMany({
    where: eq(projectSchema.isActive, true),
    with: {
      thumbnail: true,
      service: true,
      images: {
        with: {
          image: true,
        },
      },
    },
    orderBy: [desc(projectSchema.createdAt)],
    limit: 3,
  });

  // Fetch active clients for ticker
  const activeClients = await db.query.clients.findMany({
    where: eq(clientSchema.isActive, true),
    with: {
      image: true,
    },
    orderBy: [asc(clientSchema.order), desc(clientSchema.createdAt)],
  });

  const formattedClients = activeClients.map((c) => ({
    name: c.name,
    logo: c.image?.url || "",
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProductsGrid showHeader={true} products={formattedProducts} />
      <Introduction /> {/* Why DetcoShades */}
      <Stats />
      <IndustriesServed />
      <FeaturedProjects projects={latestProjects} />
      <ServiceCoverage />
      <Testimonials />
      <ClientsTicker clients={formattedClients} />
      <FinalCTA />
    </main>
  );
}

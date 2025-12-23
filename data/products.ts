import { Share2, Shield, Sun, Wind, PenTool, CheckCircle2 } from "lucide-react";

export interface ProductData {
  id: string; // The slug
  metaTitle: string;
  metaDescription: string;
  name: string; // H1
  shortDescription: string; // For cards
  mainDescription: string; // First 100 words keyword optimized
  images: { src: string; alt: string }[];
  applications: { title: string; icon: any }[];
  specifications: { label: string; value: string }[];
  benefits: { title: string; description: string; icon: any }[];
  faq: { question: string; answer: string }[];
}

export const productsMap: { [key: string]: ProductData } = {
  "hdpe-car-parking-shades": {
    id: "hdpe-car-parking-shades",
    metaTitle: "HDPE Car Parking Shades Supplier in Saudi Arabia | Detco",
    metaDescription:
      "Leading HDPE car parking shades supplier and manufacturer in Saudi Arabia. We provide high-quality UV protection shade structures in Riyadh, Jeddah, and Dammam. Get a quote.",
    name: "HDPE Car Parking Shades",
    shortDescription:
      "High Density Polyethylene shades are perfect for UV protection and airflow. Ideal for large car parks in Saudi Arabia.",
    mainDescription: `
As a premier **car parking shades supplier** in Saudi Arabia, Detco offers top-tier HDPE (High-Density Polyethylene) **shade structures** designed for extreme durability and aesthetic appeal. 
            
Our **parking shade structures** provide up to **98% UV protection** while maximizing airflow, making them the ideal solution for the scorching climate of Riyadh, Jeddah, and Dammam. The knitted fabric construction allows hot air to escape, creating a significantly cooler microclimate underneath—perfect for protecting vehicles from sun damage and heat buildup.

Whether you need a **commercial shade installation company** for a mega-mall project or a residential **sun shade canopy supplier**, our HDPE fabric delivers the perfect balance of strength, longevity, and cost-effectiveness. All our structures are engineered to specific wind loads and municipal standards.

### Why HDPE?
*   **Thermal Comfort**: Reduces temperature by up to 15°C.
*   **Longevity**: 10-15 year lifespan with proper maintenance.
*   **Sustainability**: 100% recyclable materials available.

Trust Detco, the leading **shade manufacturer**, for engineering excellence and precise installation.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=HDPE+Shade+Structure",
        alt: "HDPE car parking shade structure installation in Riyadh",
      },
      {
        src: "https://placehold.co/800x600/f3f4f6/006666?text=Commercial+Parking",
        alt: "Commercial parking lot with tensile membrane structures",
      },
      {
        src: "https://placehold.co/800x600/ffffff/006666?text=Residential+Canopy",
        alt: "Residential sun shade canopy supplier project",
      },
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=UV+Protection+Fabric",
        alt: "Close up of HDPE high density polyethylene fabric mesh",
      },
    ],
    applications: [
      { title: "Commercial Car Parks", icon: Share2 },
      { title: "Shopping Malls", icon: Share2 },
      { title: "Schools & Universities", icon: Share2 },
      { title: "Residential Compounds", icon: Share2 },
      { title: "Airports", icon: Share2 },
      { title: "Hospitals", icon: Share2 },
    ],
    specifications: [
      { label: "Material", value: "High-Density Polyethylene (HDPE) Mesh" },
      { label: "Weight", value: "320gsm - 400gsm Commercial Grade" },
      { label: "UV Protection", value: "Up to 98%" },
      { label: "Warranty", value: "10 Years Manufacturer Warranty" },
      { label: "Origin", value: "Australian / European Brands" },
      { label: "Steel Structure", value: "Galvanized & Powder Coated" },
      { label: "Fire Rating", value: "NFPA 701 Standard Compliant" },
    ],
    benefits: [
      {
        title: "Superior UV Block",
        description:
          "Protects vehicles and paintwork from 98% of harmful UV rays, reducing interior heat significantly.",
        icon: Sun,
      },
      {
        title: "Breathable Fabric",
        description:
          "Knitted fabric construction allows hot air to escape, creating a cooler microclimate underneath.",
        icon: Wind,
      },
      {
        title: "Durability",
        description:
          "Resistant to tearing, fraying, and fading even in harsh desert storms and extreme heat.",
        icon: Shield,
      },
      {
        title: "Custom Design",
        description:
          "Available in various colors and shapes (Cantilever, Sail, Pyramid) to match architectural aesthetics.",
        icon: PenTool,
      },
    ],
    faq: [
      {
        question: "What is the lifespan of HDPE car parking shades?",
        answer:
          "Our high-quality HDPE fabrics typically last between 10 to 15 years with proper maintenance, backed by a 10-year warranty against UV degradation.",
      },
      {
        question: "Are your parking shades waterproof?",
        answer:
          "HDPE is a breathable mesh fabric that provides shade and hail protection but is not 100% waterproof. For waterproof solutions, we recommend our PVC or PVDF tensile structures.",
      },
      {
        question: "Do you offer installation services in Riyadh and Dammam?",
        answer:
          "Yes, as a leading shade installation company, our teams act nationwide, covering Riyadh, Jeddah, Dammam, and all major cities in Saudi Arabia.",
      },
      {
        question: "Can you customize the steel structure color?",
        answer:
          "Absolutely. All our steel structures are powder-coated, allowing you to choose any RAL color to match your brand or property branding.",
      },
    ],
  },
  // Placeholder for other products to avoid null errors during development
  "pvc-car-parking-shades": {
    id: "pvc-car-parking-shades",
    metaTitle: "PVC Car Parking Shades | Detco",
    metaDescription: "Waterproof PVC car parking shades.",
    name: "PVC Car Parking Shades",
    shortDescription:
      "Waterproof and durable PVC shades providing complete protection from sun and rain.",
    mainDescription: "Detailed description for PVC coming soon...",
    images: [],
    applications: [],
    specifications: [],
    benefits: [],
    faq: [],
  },
};

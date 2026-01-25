import {
  Share2,
  Shield,
  Sun,
  Wind,
  PenTool,
  CheckCircle2,
  Building2,
  Home,
  School,
  Plane,
  Car,
  Users,
  Umbrella,
  Layers,
  Square,
  Columns,
  Circle,
  Route,
  Settings,
  ParkingCircle,
} from "lucide-react";

export interface ProductData {
  id: string; // The slug
  metaTitle: string;
  metaDescription: string;
  name: string; // H1
  shortDescription: string; // For cards
  mainDescription: string; // First 100 words keyword optimized
  images: { src: string; alt: string }[];
  advantages: [{ title: string; description: string }];
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
    advantages: [{ title: "", description: "" }],
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
  "pvc-car-parking-shades": {
    id: "pvc-car-parking-shades",
    metaTitle:
      "PVC Car Parking Shades | Waterproof Shade Solutions Saudi Arabia | Detco",
    metaDescription:
      "Premium PVC car parking shades with 100% waterproof protection. Ideal for all-weather coverage in Saudi Arabia. UV resistant, fire-retardant, and engineered for durability.",
    name: "PVC Car Parking Shades",
    shortDescription:
      "Waterproof PVC fabric shades providing complete protection from sun, rain, and harsh weather conditions.",
    mainDescription: `
**PVC car parking shades** from Detco deliver complete **waterproof protection** combined with exceptional durability. Unlike breathable HDPE fabrics, our **PVC tensile membrane structures** create a fully sealed canopy that shields vehicles from rain, sun, dust storms, and hail.

Perfect for premium commercial developments, hospitals, luxury residential compounds, and locations requiring complete weather protection. Our PVC fabric is **coated with PVDF** for superior UV resistance and self-cleaning properties, ensuring your shade structure maintains its pristine appearance for over 15 years.

### Key Advantages
*   **100% Waterproof**: Complete protection against rain and water ingress.
*   **UV Stabilized**: PVDF coating provides 98% UV protection and prevents fading.
*   **Fire Retardant**: Meets NFPA 701 and international fire safety standards.
*   **Low Maintenance**: Self-cleaning surface reduces cleaning frequency.
*   **Design Flexibility**: Available in virtually any architectural shape or color.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=PVC+Waterproof+Shade",
        alt: "PVC waterproof car parking shade structure in Saudi Arabia",
      },
      {
        src: "https://placehold.co/800x600/f3f4f6/006666?text=Rain+Protection",
        alt: "Waterproof PVC membrane providing complete rain protection",
      },
      {
        src: "https://placehold.co/800x600/ffffff/006666?text=Commercial+Installation",
        alt: "Commercial PVC shade installation by Detco",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Luxury Residential", icon: Home },
      { title: "Premium Commercial", icon: Building2 },
      { title: "Hospitals & Healthcare", icon: Building2 },
      { title: "Hotels & Resorts", icon: Building2 },
    ],
    specifications: [
      { label: "Material", value: "PVC/PVDF Coated Fabric" },
      { label: "Weight", value: "850gsm - 1100gsm" },
      { label: "Waterproof", value: "100% Waterproof Membrane" },
      { label: "UV Protection", value: "98% with PVDF Coating" },
      { label: "Warranty", value: "15 Years Manufacturer Warranty" },
      { label: "Fire Rating", value: "NFPA 701 / EN 13501 B1" },
      { label: "Colors", value: "Custom RAL Colors Available" },
    ],
    benefits: [
      {
        title: "Complete Waterproof",
        description:
          "Fully sealed membrane prevents any water penetration, protecting vehicles and surfaces below.",
        icon: Umbrella,
      },
      {
        title: "All-Weather Protection",
        description:
          "Resistant to UV rays, rain, wind, dust storms, and extreme temperature fluctuations.",
        icon: Shield,
      },
      {
        title: "Self-Cleaning Surface",
        description:
          "PVDF coating prevents dirt accumulation and makes maintenance effortless.",
        icon: Sun,
      },
      {
        title: "Premium Aesthetics",
        description:
          "Smooth surface finish and wide color selection enhance architectural appeal.",
        icon: PenTool,
      },
    ],
    faq: [
      {
        question:
          "What's the difference between HDPE and PVC car parking shades?",
        answer:
          "HDPE is breathable and ideal for airflow, while PVC is fully waterproof. PVC is better for complete weather protection, while HDPE is more cost-effective for basic shade needs.",
      },
      {
        question: "How long do PVC parking shades last?",
        answer:
          "With proper installation and maintenance, PVC/PVDF membranes typically last 15-20 years in Saudi Arabia's climate, backed by our 15-year warranty.",
      },
      {
        question: "Do PVC shades require more maintenance than HDPE?",
        answer:
          "Actually, PVC shades with PVDF coating require less maintenance due to their self-cleaning properties. Occasional washing with water is usually sufficient.",
      },
    ],
  },
  "tensile-structures": {
    id: "tensile-structures",
    metaTitle:
      "Tensile Membrane Structures | Architectural Shade Solutions | Detco",
    metaDescription:
      "Custom-engineered tensile membrane structures for architectural shade solutions in Saudi Arabia. PVDF, ETFE, and PTFE fabric structures designed for large spans and iconic designs.",
    name: "Tensile Membrane Structures",
    shortDescription:
      "Architectural tensile membrane structures offering iconic designs with large-span capabilities for stadiums, malls, and public spaces.",
    mainDescription: `
Detco specializes in **tensile membrane structures**—the pinnacle of architectural shading engineering. These structures combine structural engineering with architectural aesthetics to create iconic, large-span canopies that define modern buildings.

Our **tensile fabric structures** utilize advanced membrane materials (PTFE, ETFE, PVDF) supported by steel masts, cables, and precision-tensioned fabric. These systems enable spans exceeding 50 meters while maintaining elegant, flowing forms that enhance any development's visual identity.

Ideal for sports facilities, shopping malls, airport terminals, public plazas, and landmark commercial projects where both function and form matter.

### Engineering Excellence
*   **Large Spans**: Up to 80+ meter unsupported spans possible.
*   **Lightweight**: Significantly lighter than traditional roofing.
*   **Iconic Design**: Create unique architectural statements.
*   **Natural Light**: Transparent/translucent options available.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Tensile+Structure",
        alt: "Large-span tensile membrane structure installation",
      },
      {
        src: "https://placehold.co/800x600/f3f4f6/006666?text=Architectural+Design",
        alt: "Iconic architectural tensile structure design",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Stadiums & Arenas", icon: Building2 },
      { title: "Shopping Malls", icon: Building2 },
      { title: "Airport Terminals", icon: Plane },
      { title: "Public Plazas", icon: Building2 },
    ],
    specifications: [
      { label: "Material", value: "PTFE / ETFE / PVDF Membrane" },
      { label: "Span Capability", value: "Up to 80+ meters" },
      { label: "Tensile Strength", value: "120-180 kN/m" },
      { label: "Design Life", value: "25+ Years" },
      { label: "Wind Load", value: "Engineered per Site Conditions" },
    ],
    benefits: [
      {
        title: "Large Span Design",
        description:
          "Cover vast areas without intermediate supports, creating open, flexible spaces.",
        icon: Layers,
      },
      {
        title: "Iconic Aesthetics",
        description:
          "Unique architectural forms that become landmark features of your development.",
        icon: PenTool,
      },
      {
        title: "Natural Daylighting",
        description:
          "Translucent membranes allow natural light while providing shade and weather protection.",
        icon: Sun,
      },
      {
        title: "Lightweight Construction",
        description:
          "Reduced structural requirements compared to traditional roofing systems.",
        icon: Shield,
      },
    ],
    faq: [
      {
        question: "What materials are used in tensile structures?",
        answer:
          "We use PTFE (Teflon), ETFE (transparent foil), and PVDF-coated PVC membranes depending on project requirements for durability, transparency, and budget.",
      },
      {
        question: "How long does it take to install a tensile structure?",
        answer:
          "Installation time varies by size and complexity. A typical 500-1000 sqm structure takes 3-6 weeks from on-site assembly to final tensioning.",
      },
    ],
  },
  sails: {
    id: "sails",
    metaTitle: "Shade Sails | Modern Shade Solutions Saudi Arabia | Detco",
    metaDescription:
      "Modern shade sails for residential and commercial applications. Triangular and rectangular shade sails in HDPE or PVC fabric. Custom colors and sizes available.",
    name: "Shade Sails",
    shortDescription:
      "Modern triangular and rectangular shade sails providing flexible, affordable shading solutions for any outdoor space.",
    mainDescription: `
**Shade sails** offer a contemporary, cost-effective shading solution perfect for residential gardens, playgrounds, restaurants, cafes, and small commercial spaces. These tensioned fabric canopies create visually striking geometric patterns while providing effective sun protection.

Available in **triangular, rectangular, or square configurations**, our shade sails can be installed as standalone structures or combined to create larger shaded areas. The flexible mounting system allows installation between buildings, posts, or freestanding masts.

### Design Flexibility
*   **Multiple Shapes**: Triangle, square, rectangle, and custom geometries.
*   **Color Options**: Wide range of fabric colors to match your design.
*   **Easy Installation**: Quick setup with minimal site disruption.
*   **Affordable Solution**: Cost-effective compared to permanent structures.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Shade+Sails",
        alt: "Triangular shade sails installation",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Residential Gardens", icon: Home },
      { title: "Playgrounds", icon: School },
      { title: "Cafes & Restaurants", icon: Building2 },
      { title: "Pool Areas", icon: Home },
    ],
    specifications: [
      { label: "Material", value: "HDPE or PVC Fabric" },
      { label: "Shapes", value: "Triangle, Square, Rectangle" },
      { label: "UV Protection", value: "95-98%" },
      { label: "Warranty", value: "10 Years" },
    ],
    benefits: [
      {
        title: "Quick Installation",
        description:
          "Simple tensioned system allows for fast setup with minimal construction work.",
        icon: Settings,
      },
      {
        title: "Versatile Design",
        description:
          "Mix and match shapes and colors to create unique shading patterns.",
        icon: PenTool,
      },
      {
        title: "Cost Effective",
        description:
          "Affordable shading solution perfect for residential and small commercial projects.",
        icon: Shield,
      },
    ],
    faq: [
      {
        question: "Can shade sails be removed in winter?",
        answer:
          "Yes, shade sails can be easily removed and stored during off-seasons, extending their lifespan.",
      },
    ],
  },
  "multi-level-sails": {
    id: "multi-level-sails",
    metaTitle: "Multi-Level Shade Sails | Layered Shade Architecture | Detco",
    metaDescription:
      "Layered multi-level shade sail systems creating dynamic three-dimensional shading solutions. Perfect for large commercial spaces and architectural landmarks.",
    name: "Multi-Level Shade Sails",
    shortDescription:
      "Layered shade sail systems creating dynamic, multi-dimensional shading with enhanced visual impact and coverage.",
    mainDescription: `
**Multi-level shade sails** elevate standard shading to architectural art. By stacking or layering multiple shade sails at different heights and angles, we create three-dimensional shading systems that provide superior coverage and stunning visual aesthetics.

These systems are ideal for **large commercial spaces**, public plazas, shopping malls, and architectural landmarks where both functional shading and design statement are essential. The layered approach allows for better wind flow while creating more engaging, modern aesthetics.

Perfect for areas requiring extensive coverage where traditional single-level solutions fall short.

### Advantages
*   **Enhanced Coverage**: Multiple layers ensure no gaps in shading throughout the day.
*   **Architectural Impact**: Creates striking, modern architectural features.
*   **Better Airflow**: Layered design promotes natural ventilation.
*   **Wind Resistance**: Distributed tension improves structural stability.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Multi+Level+Sails",
        alt: "Layered multi-level shade sail installation",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Shopping Malls", icon: Building2 },
      { title: "Public Plazas", icon: Building2 },
      { title: "Commercial Centers", icon: Building2 },
    ],
    specifications: [
      { label: "Configuration", value: "Layered 2-4 Levels" },
      { label: "Material", value: "HDPE or PVC" },
      { label: "Custom Design", value: "Engineered per Project" },
    ],
    benefits: [
      {
        title: "Superior Coverage",
        description:
          "Multiple layers ensure comprehensive shading throughout the day as sun angle changes.",
        icon: Layers,
      },
      {
        title: "Architectural Statement",
        description:
          "Creates iconic, eye-catching installations that define your space.",
        icon: PenTool,
      },
    ],
    faq: [],
  },
  "single-cantilever": {
    id: "single-cantilever",
    metaTitle: "Single Cantilever Car Parking Shades | Detco Saudi Arabia",
    metaDescription:
      "Single cantilever parking shade structures with one-sided support. Space-efficient design ideal for boundary installations and maximizing parking space.",
    name: "Single Cantilever",
    shortDescription:
      "Space-efficient single cantilever design with one-sided support, maximizing parking space and perfect for boundary installations.",
    mainDescription: `
**Single cantilever car parking shades** feature a one-sided support system where the canopy extends outward from supporting posts, creating an open, unobstructed parking area below. This design is ideal for installations along property boundaries, walls, or where maximizing ground space is crucial.

The cantilever structure eliminates the need for center posts, allowing for more flexible parking arrangements and easier vehicle movement. Perfect for **commercial developments**, residential compounds, and facilities requiring efficient space utilization.

### Space Efficiency
*   **No Center Posts**: Unobstructed parking area for maximum space usage.
*   **Boundary Friendly**: Ideal for installations along walls or property edges.
*   **Flexible Layout**: Adaptable to various site constraints and requirements.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Single+Cantilever",
        alt: "Single cantilever car parking shade structure",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Boundary Installations", icon: Building2 },
      { title: "Residential Compounds", icon: Home },
      { title: "Commercial Parking", icon: Car },
    ],
    specifications: [
      { label: "Support Type", value: "One-Sided Cantilever" },
      { label: "Span", value: "Up to 10 meters" },
      { label: "Material", value: "HDPE or PVC Fabric" },
    ],
    benefits: [
      {
        title: "Maximum Space",
        description:
          "No center posts means more usable parking area and easier vehicle access.",
        icon: Columns,
      },
      {
        title: "Boundary Solution",
        description:
          "Perfect for installations along walls or property boundaries where space is limited.",
        icon: Shield,
      },
    ],
    faq: [],
  },
  "t-cantilever": {
    id: "t-cantilever",
    metaTitle:
      "T-Cantilever Parking Shades | Double-Sided Cantilever Design | Detco",
    metaDescription:
      "T-cantilever parking shade structures with central support and dual-sided canopy extension. Efficient design for center-line parking arrangements.",
    name: "T-Cantilever",
    shortDescription:
      "T-shaped cantilever design with central support and dual-sided canopy, perfect for center-line parking arrangements.",
    mainDescription: `
**T-cantilever parking shades** utilize a central support post with the canopy extending in two opposite directions, forming a "T" shape. This design efficiently shades two rows of parking spaces with a single support structure, making it ideal for center-line parking configurations.

This structure type maximizes coverage per support post, reducing material costs while maintaining structural integrity. Perfect for **large parking lots** and commercial developments requiring efficient, organized parking layouts.

### Efficiency Benefits
*   **Dual Coverage**: One post shades two parking rows.
*   **Organized Layout**: Perfect for structured parking arrangements.
*   **Cost Effective**: Fewer support posts required per parking space.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=T+Cantilever",
        alt: "T-cantilever parking shade structure",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Large Parking Lots", icon: Car },
      { title: "Commercial Developments", icon: Building2 },
      { title: "Shopping Centers", icon: Building2 },
    ],
    specifications: [
      { label: "Support Type", value: "Central Post with Dual Extension" },
      { label: "Coverage", value: "Two Rows per Post" },
    ],
    benefits: [
      {
        title: "Efficient Design",
        description:
          "One support structure shades two parking rows, reducing installation costs.",
        icon: Columns,
      },
    ],
    faq: [],
  },
  "square-rectangles": {
    id: "square-rectangles",
    metaTitle: "Square & Rectangle Parking Shades | Detco",
    metaDescription:
      "Square and rectangular parking shade structures with four-post support. Traditional design offering reliable coverage for organized parking layouts.",
    name: "Square & Rectangles",
    shortDescription:
      "Traditional square and rectangular shade structures with four-post support, offering reliable and organized parking coverage.",
    mainDescription: `
**Square and rectangular parking shades** represent the traditional, most widely used parking shade design. Four corner posts support a flat or slightly pitched fabric canopy, creating uniform, organized shading across parking bays.

This proven design offers excellent stability, straightforward installation, and reliable long-term performance. Ideal for **organized parking layouts** in commercial, residential, and institutional facilities where consistency and predictability are valued.

### Reliable Design
*   **Proven Structure**: Time-tested design with excellent stability.
*   **Uniform Coverage**: Consistent shading across the entire covered area.
*   **Easy Maintenance**: Simple structure facilitates inspection and upkeep.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Square+Rectangles",
        alt: "Square and rectangular parking shade structures",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Commercial Parking", icon: Car },
      { title: "Institutional Facilities", icon: School },
      { title: "Residential Compounds", icon: Home },
    ],
    specifications: [
      { label: "Support Type", value: "Four Corner Posts" },
      { label: "Shape", value: "Square or Rectangular" },
    ],
    benefits: [
      {
        title: "Proven Design",
        description:
          "Traditional, reliable structure with decades of proven performance.",
        icon: Square,
      },
    ],
    faq: [],
  },
  "single-post": {
    id: "single-post",
    metaTitle:
      "Single Post Parking Shades | Umbrella-Style Shade Solutions | Detco",
    metaDescription:
      "Single post umbrella-style parking shade structures. Compact design ideal for individual parking spaces or scattered installations.",
    name: "Single Post",
    shortDescription:
      "Umbrella-style single post design providing compact shading for individual parking spaces or decorative installations.",
    mainDescription: `
**Single post parking shades** feature a central support post with a circular or square canopy extending around it, creating an umbrella-like structure. This compact design is perfect for **individual parking spaces**, decorative installations, or scattered shading where traditional structures aren't suitable.

Ideal for VIP parking areas, residential driveways, or locations requiring flexible, individual space coverage. The design allows for easy relocation if needed.

### Compact Solution
*   **Individual Coverage**: Perfect for single parking space shading.
*   **Flexible Placement**: Can be installed individually or in groups.
*   **Decorative Appeal**: Adds aesthetic value while providing function.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Single+Post",
        alt: "Single post umbrella-style parking shade",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "VIP Parking", icon: Car },
      { title: "Residential Driveways", icon: Home },
      { title: "Decorative Installations", icon: Home },
    ],
    specifications: [
      { label: "Support Type", value: "Central Single Post" },
      { label: "Canopy Shape", value: "Circular or Square" },
    ],
    benefits: [
      {
        title: "Individual Coverage",
        description:
          "Perfect for shading single parking spaces with minimal footprint.",
        icon: Circle,
      },
    ],
    faq: [],
  },
  "walk-shade": {
    id: "walk-shade",
    metaTitle: "Walkway Shade Structures | Pedestrian Pathway Shading | Detco",
    metaDescription:
      "Walkway shade structures providing comfortable shaded pathways for pedestrians. Connecting buildings, parking areas, and public spaces in Saudi Arabia.",
    name: "Walk Shade",
    shortDescription:
      "Pedestrian walkway shade structures creating comfortable, shaded pathways connecting buildings and facilities.",
    mainDescription: `
**Walkway shade structures** create covered pedestrian pathways, protecting people from sun and weather as they move between buildings, parking areas, and public spaces. These structures are essential in Saudi Arabia's climate, where shaded walkways significantly improve comfort and encourage outdoor movement.

Available in various configurations—simple linear canopies, curved paths, or integrated with parking shades—our walkway shades enhance accessibility and user experience at commercial, residential, and institutional facilities.

### Comfort & Accessibility
*   **Continuous Coverage**: Shaded pathways from point A to point B.
*   **Weather Protection**: Shield pedestrians from sun, rain, and wind.
*   **Enhanced Experience**: Makes outdoor movement comfortable year-round.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Walk+Shade",
        alt: "Walkway shade structure for pedestrian pathways",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Commercial Complexes", icon: Building2 },
      { title: "Educational Facilities", icon: School },
      { title: "Residential Compounds", icon: Home },
      { title: "Healthcare Facilities", icon: Building2 },
    ],
    specifications: [
      { label: "Width", value: "2-5 meters typical" },
      { label: "Length", value: "Custom per requirement" },
    ],
    benefits: [
      {
        title: "Comfortable Pathways",
        description:
          "Protects pedestrians from harsh sun, making outdoor movement pleasant.",
        icon: Route,
      },
    ],
    faq: [],
  },
  "mega-spans": {
    id: "mega-spans",
    metaTitle:
      "Mega Span Parking Shades | Large-Scale Shade Structures | Detco",
    metaDescription:
      "Mega span parking shade structures covering large areas with minimal support posts. Ideal for stadiums, airports, and large commercial parking facilities.",
    name: "Mega Spans",
    shortDescription:
      "Large-span shade structures covering extensive areas with minimal supports, ideal for stadiums, airports, and mega parking facilities.",
    mainDescription: `
**Mega span parking shades** represent the pinnacle of shade structure engineering, covering vast areas (often 1000+ square meters) with minimal support posts. These structures utilize advanced engineering principles to create wide, open covered spaces ideal for **large-scale commercial facilities**, stadiums, airports, and mega-mall parking areas.

By minimizing support structures, mega spans maximize usable space while reducing visual obstruction and installation complexity. These projects require sophisticated engineering analysis to ensure structural integrity under extreme wind and weather conditions.

### Engineering Excellence
*   **Massive Coverage**: Single structures covering 1000+ sqm areas.
*   **Minimal Supports**: Maximum open space with fewer posts.
*   **Structural Innovation**: Advanced engineering for large spans.
*   **Iconic Installations**: Signature structures for major developments.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Mega+Spans",
        alt: "Mega span parking shade structure covering large area",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Stadiums & Arenas", icon: Building2 },
      { title: "Airports", icon: Plane },
      { title: "Mega Malls", icon: Building2 },
      { title: "Large Commercial Facilities", icon: Building2 },
    ],
    specifications: [
      { label: "Span", value: "50+ meters typical" },
      { label: "Coverage Area", value: "1000+ sqm per structure" },
      { label: "Engineering", value: "Advanced Structural Analysis Required" },
    ],
    benefits: [
      {
        title: "Massive Coverage",
        description:
          "Cover vast parking or public areas with a single, elegant structure.",
        icon: Layers,
      },
      {
        title: "Minimal Obstruction",
        description:
          "Fewer support posts create more open, visually appealing spaces.",
        icon: Shield,
      },
    ],
    faq: [],
  },
  "double-cantilever": {
    id: "double-cantilever",
    metaTitle:
      "Double Cantilever Parking Shades | Dual-Sided Cantilever Design | Detco",
    metaDescription:
      "Double cantilever parking shade structures with extended spans on both sides. Maximum coverage per support post for efficient parking layouts.",
    name: "Double Cantilever",
    shortDescription:
      "Advanced cantilever design with extended dual-sided coverage, maximizing shade area per support structure.",
    mainDescription: `
**Double cantilever parking shades** feature a central support with extended cantilever arms on both sides, creating maximum coverage area per support post. This advanced design is ideal for **large parking facilities** requiring efficient space utilization and organized layout.

The extended cantilever arms allow for wider coverage than standard T-cantilever designs, making this structure type perfect for maximizing shaded parking area while minimizing support structure density.

### Maximum Efficiency
*   **Extended Coverage**: Wider span per support than standard cantilevers.
*   **Space Optimization**: Maximum shaded area with minimal ground footprint.
*   **Organized Layout**: Ideal for structured parking arrangements.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Double+Cantilever",
        alt: "Double cantilever parking shade structure",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Large Parking Facilities", icon: Car },
      { title: "Commercial Developments", icon: Building2 },
    ],
    specifications: [
      { label: "Design", value: "Extended Dual-Sided Cantilever" },
      { label: "Coverage", value: "Maximum per Support Post" },
    ],
    benefits: [
      {
        title: "Maximum Coverage",
        description:
          "Extended arms provide wider shading area per support structure.",
        icon: Columns,
      },
    ],
    faq: [],
  },
  "automatic-awnings": {
    id: "automatic-awnings",
    metaTitle: "Automatic Retractable Awnings | Smart Shade Solutions | Detco",
    metaDescription:
      "Automatic retractable awnings with motorized operation. Perfect for restaurants, cafes, and residential spaces requiring flexible shade control.",
    name: "Automatic Awnings",
    shortDescription:
      "Motorized retractable awnings providing flexible, on-demand shade control for commercial and residential applications.",
    mainDescription: `
**Automatic retractable awnings** combine convenience with functionality, allowing you to extend or retract shade coverage at the touch of a button. These motorized systems are perfect for **restaurants, cafes, residential patios**, and commercial spaces requiring flexible shade control based on weather conditions or time of day.

Equipped with weather sensors and remote control options, these awnings automatically retract during high winds or can be manually operated for optimal comfort. Available in various styles, fabrics, and sizes to match any architectural aesthetic.

### Smart Features
*   **Motorized Operation**: Electric motor for effortless extension/retraction.
*   **Weather Sensors**: Automatic retraction in high winds or storms.
*   **Remote Control**: Wireless remote or smartphone app control available.
*   **Custom Sizing**: Available in virtually any width and projection length.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Automatic+Awnings",
        alt: "Automatic retractable awning installation",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "Restaurants & Cafes", icon: Building2 },
      { title: "Residential Patios", icon: Home },
      { title: "Commercial Entrances", icon: Building2 },
    ],
    specifications: [
      { label: "Operation", value: "Motorized Electric" },
      { label: "Control", value: "Remote / Smartphone App" },
      { label: "Weather Protection", value: "Auto-Retract Sensors" },
    ],
    benefits: [
      {
        title: "Flexible Control",
        description:
          "Extend or retract shade on demand for optimal comfort and weather response.",
        icon: Settings,
      },
      {
        title: "Weather Responsive",
        description: "Automatic sensors protect awnings from wind damage.",
        icon: Shield,
      },
    ],
    faq: [],
  },
  "rubber-wheel-stoppers": {
    id: "rubber-wheel-stoppers",
    metaTitle: "Rubber Wheel Stoppers | Parking Barrier Solutions | Detco",
    metaDescription:
      "Heavy-duty rubber wheel stoppers for parking spaces. Durable, weather-resistant parking barriers to prevent vehicle overrun and protect structures.",
    name: "Rubber Wheel Stoppers",
    shortDescription:
      "Durable rubber wheel stoppers providing reliable parking barriers to prevent vehicle overrun and protect shade structures.",
    mainDescription: `
**Rubber wheel stoppers** are essential safety accessories for any parking facility. These heavy-duty barriers prevent vehicles from overrunning parking spaces, protecting shade structure supports, walls, landscaping, and other infrastructure.

Made from high-grade recycled rubber, our wheel stoppers are weather-resistant, UV-stable, and designed to withstand repeated vehicle impacts. They're easily installed with anchor bolts and available in various sizes to suit different vehicle types.

### Safety & Protection
*   **Vehicle Protection**: Prevents damage to shade structure posts and foundations.
*   **Infrastructure Safety**: Protects walls, curbs, and landscaping from vehicle impact.
*   **Durable Construction**: Heavy-duty rubber withstands years of use.
*   **Easy Installation**: Quick bolt-down installation with minimal site disruption.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Wheel+Stoppers",
        alt: "Rubber wheel stoppers installed in parking spaces",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "All Parking Facilities", icon: ParkingCircle },
      { title: "Commercial Parking", icon: Car },
      { title: "Residential Compounds", icon: Home },
    ],
    specifications: [
      { label: "Material", value: "Recycled Heavy-Duty Rubber" },
      { label: "Length", value: "1200mm / 1500mm Standard" },
      { label: "Height", value: "150mm / 200mm" },
      { label: "Installation", value: "Anchor Bolt Fixing" },
    ],
    benefits: [
      {
        title: "Structure Protection",
        description:
          "Prevents vehicles from impacting shade structure posts and foundations.",
        icon: Shield,
      },
      {
        title: "Durable & Weatherproof",
        description:
          "Resistant to UV, extreme temperatures, and vehicle impacts.",
        icon: CheckCircle2,
      },
    ],
    faq: [
      {
        question: "How are wheel stoppers installed?",
        answer:
          "Wheel stoppers are installed using anchor bolts drilled into concrete surfaces. Installation is quick and requires minimal site preparation.",
      },
    ],
  },
  "car-parking-marking": {
    id: "car-parking-marking",
    metaTitle: "Car Parking Marking Services | Line Marking & Signage | Detco",
    metaDescription:
      "Professional car parking marking and line painting services in Saudi Arabia. High-quality thermoplastic and paint markings for organized parking facilities.",
    name: "Car Parking Marking",
    shortDescription:
      "Professional parking line marking and signage services ensuring organized, safe, and compliant parking facilities.",
    mainDescription: `
**Car parking marking services** complete your parking facility with professional line marking, signage, and traffic management solutions. Properly marked parking spaces improve organization, maximize capacity, and ensure compliance with local regulations.

We offer both **thermoplastic (durable, long-lasting)** and **paint-based (cost-effective)** marking solutions, along with signage installation, disabled parking spaces, directional arrows, and speed limit markings.

Our marking services complement our shade structures, providing a complete parking facility solution from one trusted provider.

### Complete Solution
*   **Line Marking**: Clear, durable parking space delineation.
*   **Traffic Management**: Directional arrows, speed limits, stop lines.
*   **Compliance Marking**: Disabled spaces, fire lanes, loading zones.
*   **Signage Installation**: Parking regulations and directional signage.
        `,
    images: [
      {
        src: "https://placehold.co/800x600/e0e0e0/006666?text=Parking+Marking",
        alt: "Professional car parking line marking installation",
      },
    ],
    advantages: [{ title: "", description: "" }],
    applications: [
      { title: "All Parking Facilities", icon: ParkingCircle },
      { title: "Commercial Developments", icon: Building2 },
      { title: "Institutional Facilities", icon: School },
    ],
    specifications: [
      { label: "Marking Types", value: "Thermoplastic or Paint" },
      { label: "Durability", value: "3-5 Years (Thermoplastic)" },
      { label: "Standards", value: "Local Municipality Compliant" },
    ],
    benefits: [
      {
        title: "Organization",
        description:
          "Clear markings maximize parking capacity and improve traffic flow.",
        icon: CheckCircle2,
      },
      {
        title: "Compliance",
        description:
          "Ensures parking facilities meet local regulations and standards.",
        icon: Shield,
      },
    ],
    faq: [
      {
        question:
          "What's the difference between thermoplastic and paint marking?",
        answer:
          "Thermoplastic marking is more durable (3-5 years) and ideal for high-traffic areas, while paint is more cost-effective but requires more frequent maintenance.",
      },
    ],
  },
};

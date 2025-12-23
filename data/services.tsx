import { PenTool, Hammer, HardHat, Wrench, ClipboardList, LucideIcon } from 'lucide-react';

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: LucideIcon;
    features: string[];
    processStep: { title: string; description: string }[];
}

export const servicesData: Service[] = [
    {
        id: 'design-engineering',
        title: 'Design & Engineering',
        shortDescription: 'Advanced 3D modeling, load analysis, and structural engineering for custom tensile structures.',
        fullDescription: 'Our in-house engineering team utilizes state-of-the-art software to design tensile structures that are not only visually stunning but also structurally sound. We perform rigorous load analysis to ensure every structure can withstand local wind speeds and environmental conditions.',
        icon: PenTool,
        features: [
            '3D Architectural Visualization',
            'Wind Load & Stress Analysis',
            'Patterning & Form Finding',
            'Structural Steel Design'
        ],
        processStep: [
            { title: 'Concept', description: 'Initial sketches and 3D visualization.' },
            { title: 'Analysis', description: 'Engineering calculations for safety.' },
            { title: 'Approval', description: 'Finalizing drawings for production.' }
        ]
    },
    {
        id: 'fabrication-manufacturing',
        title: 'Fabrication & Manufacturing',
        shortDescription: 'Precision cutting, welding, and high-frequency PVC/HDPE fabric welding in our state-of-the-art facility.',
        fullDescription: 'We operate a fully equipped manufacturing facility in Jeddah/Riyadh, capable of handling large-scale steel and fabric fabrication. Our automated cutting and high-frequency welding machines ensure precision and durability for every canopy.',
        icon: Hammer,
        features: [
            'High-Frequency Fabric Welding',
            'CNC Steel Cutting & Drilling',
            'Quality Control Testing',
            'Premium Powder Coating'
        ],
        processStep: [
            { title: 'Material Prep', description: 'Sourcing high-grade steel and fabric.' },
            { title: 'Fabrication', description: 'Welding and shaping components.' },
            { title: 'Finishing', description: 'Painting and quality checks.' }
        ]
    },
    {
        id: 'installation',
        title: 'Professional Installation',
        shortDescription: 'Expert on-site assembly and tensioning by certified safety-compliant installation teams.',
        fullDescription: 'Our installation teams are trained in safety protocols and strictly adhere to engineering specifications. We ensure efficient, safe, and precise installation of shade structures, minimizing disruption to your site.',
        icon: HardHat,
        features: [
            'Certified Installation Crews',
            'Safety-First Approach (OSHA standards)',
            'Efficient Project Management',
            'Site Cleanup & Handover'
        ],
        processStep: [
            { title: 'Site Prep', description: 'Marking foundations and safety zones.' },
            { title: 'Assembly', description: 'Erecting steel and tensioning fabric.' },
            { title: 'Final Check', description: 'Safety inspection and handover.' }
        ]
    },
    {
        id: 'maintenance-repair',
        title: 'Maintenance & Repair',
        shortDescription: 'Cleaning, fabric tensioning, structural inspections, and rapid repair services for all shade types.',
        fullDescription: 'Detco offers comprehensive maintenance packages to extend the lifespan of your shade structures. From routine fabric cleaning to emergency repairs of storm damage, our team is ready to respond.',
        icon: Wrench,
        features: [
            'Fabric Cleaning & Washing',
            'Re-tensioning of Cables & Fabric',
            'Steel Structure Repainting',
            'Emergency Shade Repairs'
        ],
        processStep: [
            { title: 'Inspection', description: 'Assessing damage or wear.' },
            { title: 'Proposal', description: 'Recommending repair or cleaning.' },
            { title: 'Execution', description: 'Restoring structure to optimal condition.' }
        ]
    },
    {
        id: 'site-survey-consultation',
        title: 'Site Survey & Consultation',
        shortDescription: 'Detailed site analysis, measurements, and feasibility studies to optimize shade placement.',
        fullDescription: 'Every great project starts with accurate data. Our surveyors visit your location to assess soil conditions, take precise measurements, and recommend the best shading orientation for maximum coverage.',
        icon: ClipboardList,
        features: [
            'Laser Distance Measurement',
            'Sun Path Analysis',
            'feasibility Studies',
            'Budget Estimation'
        ],
        processStep: [
            { title: 'Visit', description: 'On-site measurement taking.' },
            { title: 'Report', description: 'Feasibility and recommendations.' },
            { title: 'Quote', description: 'Accurate cost estimation.' }
        ]
    }
];

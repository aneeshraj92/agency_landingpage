// src/components/Services.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const servicesData = [
  { title: "Lead Generation", description: "High-velocity lead acquisition systems and automated nurturing." },
  { title: "Paid Advertising", description: "Precision-targeted campaigns across all major platforms." },
  { title: "Funnel Architecture", description: "Conversion-optimized pathways, turning clicks into high-value clients." },
  { title: "Strategy Consulting", description: "Custom blueprints and fractional CMO support for scalable growth." },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          What We Do: <span className="text-purple-400">Our Core Mission</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
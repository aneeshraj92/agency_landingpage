// src/components/Services.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui path

const servicesData = [
  {
    title: "Lead Generation",
    description: "High-velocity lead acquisition systems and automated nurturing sequences.",
    icon: "☄️", // Placeholder for a modern icon
  },
  {
    title: "Paid Advertising",
    description: "Precision-targeted campaigns across all major platforms (Meta, Google, LinkedIn).",
    icon: "🎯",
  },
  {
    title: "Funnel Architecture",
    description: "Conversion-optimized pathways, turning clicks into high-value clients.",
    icon: "⚙️",
  },
  {
    title: "Strategy Consulting",
    description: "Custom blueprints and fractional CMO support for scalable digital growth.",
    icon: "🧠",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          What We Do: <span className="text-purple-400">Our Core Mission</span>
        </h2>
        <p className="text-center text-lg text-gray-400 mb-12">
          Launching digital brands beyond the horizon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-3">{service.icon}</div>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
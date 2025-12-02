// src/components/WhyUs.tsx

export function WhyUs() {
  const pillars = [
    { title: "Veteran Experience", description: "10+ years launching high-profile B2B and SaaS brands." },
    { title: "Iterative Process", description: "Agile sprints and weekly reporting ensures transparent, rapid development." },
    { title: "Results-Oriented", description: "We focus on revenue metrics, not vanity metrics. Your success is our KPI." },
  ];

  return (
    <section id="why-us" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Partner with <span className="text-purple-400">Mission Control</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center p-6 border-b-2 border-purple-600/50 hover:border-purple-600 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-white">{pillar.title}</h3>
              <p className="text-gray-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
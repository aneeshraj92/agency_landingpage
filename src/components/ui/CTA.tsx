// src/components/CTA.tsx
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui path

export function CTA() {
  return (
    <section id="contact" className="bg-gray-950 text-center py-24 px-6 border-t border-b border-purple-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-white mb-4">
          Ready for Mission Launch?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Stop guessing and start scaling. Book your free, no-obligation strategy session to map your growth trajectory.
        </p>
        <Button 
          size="lg" 
          className="text-xl px-12 py-8 bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]"
          // Replace '#' with your actual booking link
          asChild 
        >
          <a href="#consultation">
            Book a Free Strategy Call
          </a>
        </Button>
      </div>
    </section>
  );
}
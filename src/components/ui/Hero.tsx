// src/components/Hero.tsx
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative h-[90vh] flex items-center justify-center bg-black overflow-hidden p-6 text-white">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-gray-900)_0%,_var(--tw-color-black)_100%)]">
        {/* Subtle Background Placeholder */}
      </div>
      
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400">
          **COSMIC AGENCY**
        </h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Launching digital brands **beyond the horizon**. Performance-focused, data-driven results for elite ventures.
        </p>
        <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 transition-colors text-lg mt-4">
          Discover Your Orbit
        </Button>
      </div>
    </section>
  );
}
// src/app/page.tsx
import { Hero } from "@/components/ui/Hero";
import { Services } from "@/components/ui/Services";
import { WhyUs } from "@/components/ui/WhyUs";
import { Testimonials } from "@/components/ui/Testimonials";
import { Footer } from "@/components/ui/Footer";
import { BookingForm } from "@/components/ui/BookingForm"; // The integrated form
import { CTA } from "@/components/ui/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black antialiased">
      
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <CTA />

      {/* Booking Form Section */}
      <section id="consultation" className="py-24 bg-gray-900 border-t border-b border-purple-900/50">
          <div className="container mx-auto px-6">
             {/* The form automatically handles submission to your API route */}
             <BookingForm />
          </div>
      </section>

      <Footer />
    </main>
  );
}
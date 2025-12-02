// src/components/Testimonials.tsx

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted by <span className="text-purple-400">Pioneers</span>
        </h2>
        <blockquote className="border-l-4 border-purple-600 pl-6 italic text-lg text-gray-300">
          "They delivered a **400% ROI** in the first 90 days. Their funnel architecture is light years ahead of the competition. The absolute best investment we made this year."
          <footer className="mt-3 font-semibold text-white not-italic">
            — Dr. Evelyn Reed, <cite className="text-gray-400 font-normal">CEO of AlphaTech Solutions</cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
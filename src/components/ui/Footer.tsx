// src/components/Footer.tsx

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Cosmic Agency. All Rights Reserved.
        </p>
        <div className="space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          **Legal Entity:** Cosmic Agency LLC | **Tax ID/VAT:** 987654321-XYZ | **Registered Address:** 101 Orbit Blvd, Star City, Galaxy 001
        </p>
      </div>
    </footer>
  );
}
// src/components/BookingForm.tsx
"use client"; // Important for using hooks and client-side interaction

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    date: '',
    time: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Send data to your Next.js API Route
      const response = await fetch('/api/submit-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Success! Your consultation request has been booked.');
        setFormData({ name: '', email: '', phone: '', budget: '', date: '', time: '', notes: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error submitting form: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setMessage('❌ Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-2xl max-w-lg mx-auto border border-gray-800">
      <h2 className="text-3xl font-bold text-white mb-6">Book Your Strategy Call</h2>
      <p className="text-gray-400 mb-6">We'll review your details and confirm a time slot.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Contact Info */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email *</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
          <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
        </div>

        {/* Budget & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-gray-300">Estimated Budget ($)</Label>
            <Input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300">Preferred Date</Label>
            {/* NOTE: In a real app, this would be a full Calendar component (e.g., react-datepicker) */}
            <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="time" className="text-gray-300">Preferred Time Slot</Label>
            {/* NOTE: In a real app, this would be integrated with Calendly or a custom scheduling tool */}
            <select id="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white">
                <option value="">Select a time</option>
                <option value="9AM-10AM">9:00 AM - 10:00 AM</option>
                <option value="11AM-12PM">11:00 AM - 12:00 PM</option>
                <option value="2PM-3PM">2:00 PM - 3:00 PM</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-gray-300">Project Notes (Optional)</Label>
          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 transition-all"
        >
          {loading ? 'Sending...' : 'Confirm Booking'}
        </Button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-semibold ${message.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
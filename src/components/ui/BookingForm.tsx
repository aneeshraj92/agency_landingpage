// src/components/BookingForm.tsx
"use client"; 

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
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/submit-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Success! We received your request and will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', budget: '', date: '', time: '' });
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.error || 'Could not submit data.'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 rounded-xl shadow-2xl max-w-lg mx-auto border border-purple-800/30">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Book Your Free Strategy Call</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Name</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Phone</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-gray-300">Est. Budget ($)</Label>
            <Input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white" />
          </div>
        </div>
        
        {/* Scheduling (Simplified Calendar) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">Preferred Date</Label>
                <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="time" className="text-gray-300">Time Slot</Label>
                <select id="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white h-10">
                    <option value="">Select Time</option>
                    <option value="9AM-10AM">9:00 AM - 10:00 AM IST</option>
                    <option value="11AM-12PM">11:00 AM - 12:00 PM IST</option>
                    <option value="2PM-3PM">2:00 PM - 3:00 PM IST</option>
                </select>
            </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 transition-all shadow-md shadow-purple-500/50"
        >
          {loading ? 'Sending Request...' : 'Confirm Booking'}
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

import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await mockApi.contact.send(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-32 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fas fa-check"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Message Sent!</h2>
        <p className="text-slate-500 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="text-orange-600 font-bold hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Have questions about our platform or want to become a partner? We're here to help! Fill out the form and we'll be in touch.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-orange-600">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Email Support</p>
              <p className="font-semibold">support@homeflame.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-orange-600">
              <i className="fas fa-phone"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Call Us</p>
              <p className="font-semibold">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-orange-600">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">HQ Office</p>
              <p className="font-semibold">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
            <input 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
            <textarea 
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              placeholder="How can we help?"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSending}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

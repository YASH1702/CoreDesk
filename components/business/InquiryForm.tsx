"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { submitInquiryAction } from "@/actions/dashboard";

interface InquiryFormProps {
  businessSlugOrId: string;
  businessName: string;
}

export default function InquiryForm({ businessSlugOrId, businessName }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await submitInquiryAction({
        businessSlugOrId,
        name,
        email,
        phone,
        message,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-[#DDD6C9] shadow-sm text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#5C9E6E]/15 text-[#5C9E6E] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-[#2A2927]">Inquiry Dispatched</h4>
        <p className="text-xs text-[#5D5A56] max-w-sm mx-auto">
          Thank you for reaching out to {businessName}. Our team will review your inquiry and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#DDD6C9] shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C69A4B] mb-1">
        <MessageSquareQuote className="w-4 h-4" />
        <span>Request Consultation or Quote</span>
      </div>
      <h3 className="text-xl font-bold text-[#2A2927]">Send a Direct Inquiry to {businessName}</h3>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#2A2927] mb-1">Your Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl glass-input text-xs font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2A2927] mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl glass-input text-xs font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#2A2927] mb-1">Phone Number (Optional)</label>
        <input
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-xl glass-input text-xs font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#2A2927] mb-1">Message or Project Scope</label>
        <textarea
          required
          rows={3}
          placeholder="Please describe your requirements, preferred timing, or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-xl glass-input text-xs font-medium resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{submitting ? "Sending..." : "Submit Client Inquiry"}</span>
      </button>
    </form>
  );
}

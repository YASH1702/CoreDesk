"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen relative bg-[#F8F7F3] dark:bg-[#0B0E17] flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
      {/* Background Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F2DFC0]/40 dark:bg-[#C69A4B]/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 glass-panel rounded-3xl p-8 border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-lg dark:shadow-dark-lg bg-[#FFFCF7]/95 dark:bg-[#1B2238]/95"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C69A4B] flex items-center justify-center shadow-gold-btn">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
              Business<span className="gold-text">Flow</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">Password Reset</h1>
          <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">Enter your account email to receive a password recovery link.</p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-[#5C9E6E]/15 border border-[#5C9E6E]/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#5C9E6E] mx-auto" />
            <h3 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3]">Reset Link Sent</h3>
            <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
              We have sent instructions to <strong className="text-[#2A2927] dark:text-[#F8F7F3]">{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 text-xs text-[#C69A4B] hover:text-[#B7863D] font-bold"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white font-bold text-xs shadow-gold-btn transition-all flex items-center justify-center gap-2"
            >
              Send Password Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-6">
          <Link href="/login" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] font-semibold inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

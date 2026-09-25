"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { registerUserAction } from "@/actions/auth";
import { Sparkles, ArrowRight, Mail, Lock, User, Building, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState("BUSINESS_OWNER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await registerUserAction({
      name,
      email,
      password,
      role,
      businessName: role === "BUSINESS_OWNER" ? businessName : undefined,
    });

    setLoading(false);

    if (res.success) {
      // Sign in automatically
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!loginRes?.error) {
        if (role === "BUSINESS_OWNER") router.push("/dashboard/admin");
        else if (role === "STAFF") router.push("/dashboard/staff");
        else router.push("/dashboard/customer");
        router.refresh();
      }
    } else {
      setError(res.error || "Failed to create account.");
    }
  };

  return (
    <div className="min-h-screen relative bg-[#F8F7F3] dark:bg-[#0B0E17] flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
      {/* Background Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F2DFC0]/40 dark:bg-[#C69A4B]/10 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 glass-panel rounded-3xl p-8 border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-lg dark:shadow-dark-lg bg-[#FFFCF7]/95 dark:bg-[#1B2238]/95"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C69A4B] flex items-center justify-center shadow-gold-btn">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
              Business<span className="gold-text">Flow</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">Create Account</h1>
          <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">Start your 14-day free trial of BusinessFlow</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] bg-white dark:bg-[#111625]"
            >
              <option value="BUSINESS_OWNER">Business Owner / Practice Director</option>
              <option value="CUSTOMER">Customer / Client</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Eleanor Vance"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
              />
            </div>
          </div>

          {role === "BUSINESS_OWNER" && (
            <div>
              <label className="block text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Business Name</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  placeholder="Apex Advisory Partners"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
                />
              </div>
            </div>
          )}

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

          <div>
            <label className="block text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white font-bold text-xs shadow-gold-btn transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create BusinessFlow Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C69A4B] hover:text-[#B7863D] font-bold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

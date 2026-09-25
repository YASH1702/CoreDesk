"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, UserCheck, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/admin";

  const [email, setEmail] = useState("owner@coredesk.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, redirectPath: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    signIn("credentials", { redirect: false, email: demoEmail, password: "password123" }).then((res) => {
      if (!res?.error) {
        router.push(redirectPath);
        router.refresh();
      }
    });
  };

  return (
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
            Core<span className="gold-text">Desk</span>
          </span>
        </Link>
        <h1 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">Welcome Back</h1>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">Access your business portal & appointment workspace</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Demo Quick Accounts */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A]">
        <p className="text-[11px] font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-[#C69A4B]" /> Quick Demo Accounts:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("owner@coredesk.com", "/dashboard/admin")}
            className="px-2.5 py-2 rounded-xl bg-[#FFF8ED] dark:bg-[#1B2238] hover:bg-[#E8D7B2] dark:hover:bg-[#27314A] text-[#C69A4B] text-xs font-bold border border-[#E8D7B2] dark:border-[#27314A] transition-all text-center"
          >
            Owner
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("marcus.chen@coredesk.com", "/dashboard/staff")}
            className="px-2.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-500/20 transition-all text-center"
          >
            Staff
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("alex.morgan@gmail.com", "/dashboard/customer")}
            className="px-2.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20 transition-all text-center"
          >
            Customer
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#2A2927] dark:text-[#F8F7F3]">Password</label>
            <Link href="/forgot-password" className="text-xs text-[#C69A4B] hover:text-[#B7863D] font-bold transition-colors">
              Forgot password?
            </Link>
          </div>
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
              Sign in to CoreDesk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-6">
        Don't have an account yet?{" "}
        <Link href="/signup" className="text-[#C69A4B] hover:text-[#B7863D] font-bold">
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative bg-[#F8F7F3] dark:bg-[#0B0E17] flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
      {/* Background Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F2DFC0]/40 dark:bg-[#C69A4B]/10 rounded-full blur-[130px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 glass-panel rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] text-center text-xs text-[#5D5A56] dark:text-[#A0A8B8] bg-white dark:bg-[#1B2238]">
            Loading login portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Quote, Filter } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials?: Array<{
    id: string;
    name: string;
    role?: string | null;
    company?: string | null;
    content: string;
    avatar?: string | null;
    rating: number;
  }>;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const expandedReviews = [
    {
      id: "1",
      name: "David Sterling",
      role: "Chief Executive Officer",
      company: "Vanguard Systems Advisory",
      industry: "Consulting",
      content:
        "BusinessFlow completely transformed our advisory booking pipeline. Our enterprise clients praise the warm luxury design, and no-shows dropped to absolute zero thanks to automated calendar sync.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      rating: 5,
    },
    {
      id: "2",
      name: "Sophia Martinez",
      role: "Head of Operations",
      company: "Lumina Health & Aesthetics",
      content:
        "The automated multi-specialist scheduling and instant Stripe payment settlement eliminated over 25 hours of administrative overhead every single week for our medical clinic.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      rating: 5,
    },
    {
      id: "3",
      name: "Julian Vance",
      role: "Founder & Managing Director",
      company: "Aura Architecture Studio",
      content:
        "Being able to edit our landing page, service packages, and SEO metadata directly in the No-Code CMS without touching code is an absolute gamechanger for our design practice.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      rating: 5,
    },
    {
      id: "4",
      name: "Victoria Thorne",
      role: "Lead Salon Director",
      company: "Maison de Beauté Paris",
      content:
        "Our clients love the warm sand aesthetics and 30-second checkout. Deposit collection before appointment confirmation reduced our last-minute cancellations by 94%.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      rating: 5,
    },
    {
      id: "5",
      name: "Marcus Holloway",
      role: "Director of Performance",
      company: "Apex Athletic Club",
      content:
        "Managing 12 personal trainers across 3 studio spaces used to be chaos. BusinessFlow calculates zero-conflict time slots in real time, saving our team hours of manual work.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      rating: 5,
    },
    {
      id: "6",
      name: "Elena Rostova",
      role: "Managing Partner",
      company: "Rostova Capital Partners",
      content:
        "The executive typography, clean warm ivory aesthetic, and instant .ics calendar exports communicate unmatched professionalism to our institutional investor clients.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
      rating: 5,
    },
  ];

  const list = testimonials && testimonials.length >= 6 ? testimonials : expandedReviews;
  const [filterIndustry, setFilterIndustry] = useState("ALL");

  return (
    <section className="py-24 relative z-10 border-t border-[#DDD6C9] dark:border-[#27314A] bg-[#ECE6D8]/40 dark:bg-[#111625]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#C69A4B] uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <Quote className="w-4 h-4 text-[#C69A4B]" /> Executive Client Reviews
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
            Trusted by Enterprise Leaders Worldwide
          </p>
          <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-3">
            See how top-tier founders, medical clinics, luxury salons, and consulting practices streamline booking and elevate client trust.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#1B2238] relative flex flex-col justify-between shadow-warm-md dark:shadow-dark-md hover:border-[#C69A4B] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C69A4B]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C69A4B]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] dark:bg-[#111625] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
                    Verified Enterprise
                  </span>
                </div>

                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed italic mb-6">"{item.content}"</p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-[#ECE6D8] dark:border-[#27314A]">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-[#C69A4B]/40 shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF8ED] dark:bg-[#111625] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-center font-bold text-sm shrink-0">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-1.5">
                    {item.name} <CheckCircle2 className="w-4 h-4 text-[#5C9E6E]" />
                  </h4>
                  <p className="text-[11px] text-[#8B857D] dark:text-[#A0A8B8]">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

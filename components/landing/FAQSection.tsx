"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

interface FAQSectionProps {
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const fallbackFAQs = [
    {
      id: "1",
      question: "How does real-time slot availability calculation work?",
      answer:
        "The booking engine continuously cross-references staff working hours, scheduled breaks, approved leaves, and existing client appointments (plus configured buffer times) to calculate zero-conflict time slots automatically.",
    },
    {
      id: "2",
      question: "Are Stripe payments and deposit collections supported?",
      answer:
        "Yes! You can configure full payment or partial deposits required prior to confirmation. Funds are settled directly to your Stripe merchant account with automated receipt generation.",
    },
    {
      id: "3",
      question: "Can I manage multiple staff members and distinct services?",
      answer:
        "Absolutely. You can map staff members to specific services, assign custom hourly rates, set individual working shifts, and track staff performance analytics in the Staff Workspace.",
    },
    {
      id: "4",
      question: "How does the No-Code CMS Editor work for business owners?",
      answer:
        "The built-in CMS allows you to modify homepage copy, service categories, pricing packages, FAQs, testimonials, and SEO tags dynamically through a visual panel without editing source code.",
    },
  ];

  const list = faqs && faqs.length > 0 ? faqs : fallbackFAQs;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id || null);
  const [search, setSearch] = useState("");

  const filtered = list.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative z-10 border-t border-[#DDD6C9] dark:border-[#27314A] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-[#C69A4B] uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#C69A4B]" /> Got Questions?
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-2">
            Everything you need to know about setting up CoreDesk for your organization.
          </p>

          {/* Search Filter */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. Stripe, availability, staff)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#1B2238] overflow-hidden transition-all shadow-warm-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3] hover:text-[#C69A4B] dark:hover:text-[#C69A4B] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8B857D] dark:text-[#A0A8B8] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C69A4B]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed border-t border-[#ECE6D8] dark:border-[#27314A] pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

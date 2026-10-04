"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Calendar,
  Clock,
  ArrowRight,
  User,
  ShieldCheck,
  RotateCcw,
  Minimize2,
  Bot,
  TrendingUp,
} from "lucide-react";
import { MagneticWrapper } from "@/components/shared/MagneticWrapper";

interface Message {
  id: string;
  sender: "user" | "concierge";
  text: string;
  timestamp: string;
  cards?: {
    type: "slot" | "service" | "specialist" | "action";
    title: string;
    subtitle?: string;
    detail?: string;
    price?: string;
    ctaLabel: string;
    ctaHref: string;
  }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    sender: "concierge",
    text: "Welcome to CoreDesk. I am your Executive AI Concierge. I can check real-time specialist availability, explain service tiers, calculate package pricing, or guide you through instant booking.",
    timestamp: "Just now",
  },
];

const SUGGESTED_PROMPTS = [
  "⚡ Available slots today",
  "💼 Service packages & rates",
  "👥 Specialist directory",
  "🛡️ Zero-conflict guarantee",
  "📅 Calendar sync support",
];

export function CoreDeskConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  // Handle user sending message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Deterministic intelligence processor
    setTimeout(() => {
      const response = processQuery(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  const processQuery = (rawText: string): Message => {
    const q = rawText.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 1. Available slots / booking query
    if (q.includes("slot") || q.includes("available") || q.includes("today") || q.includes("time") || q.includes("schedule")) {
      return {
        id: Date.now().toString(),
        sender: "concierge",
        text: "Our deterministic calendar engine has 4 priority executive slots verified with zero double-booking risk:",
        timestamp,
        cards: [
          {
            type: "slot",
            title: "Thursday · 10:30 AM",
            subtitle: "Executive Strategy Audit (60m)",
            detail: "Dr. Marcus Chen · Principal Lead",
            price: "₹1,500",
            ctaLabel: "Book 10:30 AM Slot",
            ctaHref: "/book",
          },
          {
            type: "slot",
            title: "Thursday · 02:00 PM",
            subtitle: "Operational Blueprint (90m)",
            detail: "Aarav Mehta · Senior Specialist",
            price: "₹2,400",
            ctaLabel: "Book 02:00 PM Slot",
            ctaHref: "/book",
          },
        ],
      };
    }

    // 2. Services / Pricing / Packages query
    if (q.includes("service") || q.includes("price") || q.includes("package") || q.includes("cost") || q.includes("rate")) {
      return {
        id: Date.now().toString(),
        sender: "concierge",
        text: "Here is our current executive service portfolio. All sessions include deterministic preparation, recording, and action blueprints:",
        timestamp,
        cards: [
          {
            type: "service",
            title: "Executive Strategy Audit",
            subtitle: "60 minutes · 1-on-1 Deep Dive",
            detail: "Full operational diagnostic, bottleneck removal & growth roadmap.",
            price: "₹1,500",
            ctaLabel: "Configure Package",
            ctaHref: "/book",
          },
          {
            type: "service",
            title: "Operational Blueprint",
            subtitle: "90 minutes · Architecture Design",
            detail: "Comprehensive workflow mapping, tech stack review & KPI matrix.",
            price: "₹2,400",
            ctaLabel: "Configure Package",
            ctaHref: "/book",
          },
          {
            type: "service",
            title: "Executive Retainer Suite",
            subtitle: "120 minutes · Quarterly Advisory",
            detail: "Dedicated lead advisory counsel with priority direct hotline.",
            price: "₹3,200",
            ctaLabel: "Configure Package",
            ctaHref: "/book",
          },
        ],
      };
    }

    // 3. Specialists / Team query
    if (q.includes("specialist") || q.includes("team") || q.includes("doctor") || q.includes("chen") || q.includes("mehta") || q.includes("who")) {
      return {
        id: Date.now().toString(),
        sender: "concierge",
        text: "Our accredited leadership panel specializes in cross-disciplinary enterprise acceleration:",
        timestamp,
        cards: [
          {
            type: "specialist",
            title: "Dr. Marcus Chen",
            subtitle: "Principal Lead · Advisory & Strategy",
            detail: "14+ yrs enterprise operations. 4.9★ rating across 180+ audits.",
            ctaLabel: "Book with Dr. Chen",
            ctaHref: "/book",
          },
          {
            type: "specialist",
            title: "Aarav Mehta",
            subtitle: "Senior Specialist · Operations & Scale",
            detail: "Ex-tier 1 consultant. Expert in automation pipelines and team duty sync.",
            ctaLabel: "Book with Aarav",
            ctaHref: "/book",
          },
          {
            type: "specialist",
            title: "Maya Kapoor",
            subtitle: "Lead Consultant · Brand & Growth",
            detail: "Direct-to-consumer strategist with verified 32% QoQ yield growth.",
            ctaLabel: "Book with Maya",
            ctaHref: "/book",
          },
        ],
      };
    }

    // 4. Guarantee / Safety / Conflict checking query
    if (q.includes("conflict") || q.includes("guarantee") || q.includes("cancel") || q.includes("stripe") || q.includes("refund")) {
      return {
        id: Date.now().toString(),
        sender: "concierge",
        text: "CoreDesk operates on a mathematically deterministic availability model:\n\n• **Zero Double-Bookings**: Atomic PostgreSQL row locks guarantee slots can never be double-allocated.\n• **Buffer Protection**: 15-minute operational buffers are enforced between appointments.\n• **Stripe Escrow**: Payments are secured with instant receipt and calendar invite dispatch.\n• **24h Cancellation**: Full self-service reschedule or cancellation up to 24 hours prior.",
        timestamp,
        cards: [
          {
            type: "action",
            title: "Explore Core Architecture",
            subtitle: "Deterministic Prisma + PostgreSQL Engine",
            detail: "Learn how the 8 operational modules sync with zero latency.",
            ctaLabel: "View System Architecture",
            ctaHref: "/dashboard/admin/services",
          },
        ],
      };
    }

    // 5. Calendar sync query
    if (q.includes("calendar") || q.includes("google") || q.includes("apple") || q.includes("outlook") || q.includes("sync")) {
      return {
        id: Date.now().toString(),
        sender: "concierge",
        text: "All CoreDesk appointments feature multi-platform instant calendar sync. Upon booking, you can add your session with 1 click to:\n\n• **Google Calendar** (Web)\n• **Apple Calendar** (iCal / .ics)\n• **Outlook.com** & **Microsoft 365**\n• Universal `.ics` export with built-in 15-minute reminders.",
        timestamp,
        cards: [
          {
            type: "action",
            title: "Test Booking Flow & Calendar Sync",
            subtitle: "Interactive 4-Step Self-Serve Wizard",
            detail: "Complete a mock booking to test the calendar invitation dispatch.",
            ctaLabel: "Launch Booking Wizard",
            ctaHref: "/book",
          },
        ],
      };
    }

    // Default Fallback
    return {
      id: Date.now().toString(),
      sender: "concierge",
      text: `I understand you're asking about "${rawText}". I can immediately assist you with finding available slots, checking service pricing, viewing specialist profiles, or initiating a new booking reservation.`,
      timestamp,
      cards: [
        {
          type: "action",
          title: "Self-Service Booking Portal",
          subtitle: "Pick Service → Specialist → Slot → Instant Confirmation",
          ctaLabel: "Launch Live Booking",
          ctaHref: "/book",
        },
        {
          type: "action",
          title: "Executive Admin Cockpit",
          subtitle: "Command Center, Live Queue & Telemetry",
          ctaLabel: "Open Admin Console",
          ctaHref: "/dashboard/admin",
        },
      ],
    };
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <MagneticWrapper strength={0.3} radius={50}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open CoreDesk AI Concierge"
            className="group px-5 py-3 rounded-full bg-[#FAF8F5]/90 dark:bg-[#18120D]/90 hover:bg-[#FAF8F5] dark:hover:bg-[#18120D] backdrop-blur-2xl border-2 border-[#37261A]/40 dark:border-[#37261A] text-[#1E1E1E] dark:text-[#F5F2EB] shadow-[0_12px_35px_rgba(55,38,26,0.25)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#37261A] text-[#F5F2EB] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#F5F2EB]" />
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-extrabold tracking-tight flex items-center gap-1.5">
                <span>Concierge</span>
                <span className="w-2 h-2 rounded-full bg-[#5C9E6E] animate-pulse" />
              </div>
              <p className="text-[10px] text-[#5D554A] dark:text-[#AAA194] font-medium leading-none">
                Live AI Assistant
              </p>
            </div>
          </button>
        </MagneticWrapper>
      )}

      {/* Main Concierge Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[420px] max-h-[640px] h-[80vh] sm:h-[600px] flex flex-col rounded-[28px] bg-[#FAF8F5]/95 dark:bg-[#18120D]/95 backdrop-blur-2xl border-2 border-[#37261A]/30 dark:border-[#37261A] shadow-[0_25px_70px_rgba(0,0,0,0.30)] overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-[#C8C1B4]/60 dark:border-[#37261A]/80 bg-[#F5F2EB]/80 dark:bg-[#1E1610]/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#37261A] to-[#1E1E1E] text-[#F5F2EB] flex items-center justify-center font-bold text-sm shadow-sm">
                <Sparkles className="w-4 h-4 text-[#C69A4B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-[#1E1E1E] dark:text-[#F5F2EB] tracking-tight">
                    CoreDesk Concierge
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#5C9E6E]/15 text-[#5C9E6E] text-[9px] font-bold">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-[#5D554A] dark:text-[#AAA194]">
                  Deterministic Executive Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#5D554A] dark:text-[#AAA194]">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize Concierge"
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-4 py-2 border-b border-[#C8C1B4]/40 dark:border-[#37261A]/40 bg-white/40 dark:bg-black/20 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-[#DED9D0]/60 dark:bg-[#251B14] hover:bg-[#37261A] hover:text-[#F5F2EB] text-[#37261A] dark:text-[#E8DFD8] text-[10px] font-semibold whitespace-nowrap border border-[#C8C1B4]/60 dark:border-[#37261A]/60 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#37261A] text-[#F5F2EB] rounded-br-xs shadow-xs"
                      : "bg-white/80 dark:bg-[#1E1712]/90 text-[#1E1E1E] dark:text-[#F5F2EB] border border-[#C8C1B4]/60 dark:border-[#37261A]/80 rounded-bl-xs shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Optional Interactive Response Cards */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    {msg.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/90 dark:bg-[#231A13] border border-[#C8C1B4]/70 dark:border-[#37261A] shadow-xs flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-xs text-[#1E1E1E] dark:text-[#F5F2EB]">
                              {card.title}
                            </h4>
                            {card.subtitle && (
                              <p className="text-[11px] text-[#5D554A] dark:text-[#AAA194] font-medium">
                                {card.subtitle}
                              </p>
                            )}
                          </div>
                          {card.price && (
                            <span className="font-extrabold text-xs text-[#37261A] dark:text-[#C69A4B] bg-[#37261A]/10 dark:bg-[#C69A4B]/15 px-2 py-0.5 rounded-md">
                              {card.price}
                            </span>
                          )}
                        </div>

                        {card.detail && (
                          <p className="text-[11px] text-[#5D554A] dark:text-[#AAA194]/90 italic">
                            {card.detail}
                          </p>
                        )}

                        <Link
                          href={card.ctaHref}
                          onClick={() => setIsOpen(false)}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#37261A] hover:bg-[#493323] text-[#F5F2EB] font-bold text-[11px] transition-colors flex items-center justify-between group mt-1"
                        >
                          <span>{card.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-[#5D554A]/70 dark:text-[#AAA194]/60 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/70 dark:bg-[#1E1712] border border-[#C8C1B4]/50 dark:border-[#37261A]/50 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#37261A] animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#37261A] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#37261A] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-[#C8C1B4]/60 dark:border-[#37261A]/80 bg-[#F5F2EB]/80 dark:bg-[#1E1610]/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about slots, pricing, specialists..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-[#18120D] border border-[#C8C1B4] dark:border-[#37261A] text-xs text-[#1E1E1E] dark:text-[#F5F2EB] placeholder:text-[#5D554A]/60 dark:placeholder:text-[#AAA194]/60 focus:outline-none focus:ring-1 focus:ring-[#37261A] transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-[#37261A] hover:bg-[#493323] disabled:opacity-40 text-[#F5F2EB] transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

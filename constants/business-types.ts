export interface IndustryArchetype {
  id: string;
  name: string;
  tagline: string;
  serviceNoun: string;
  staffNoun: string;
  clientNoun: string;
  accentGlow: string;
  heroCopy: string;
  sampleServices: Array<{ title: string; duration: number; price: number; category: string }>;
}

export const INDUSTRY_ARCHETYPES: Record<string, IndustryArchetype> = {
  CONSULTING: {
    id: "CONSULTING",
    name: "Consulting & Strategy",
    tagline: "Empower your enterprise with high-impact strategic advisory",
    serviceNoun: "Consultation Session",
    staffNoun: "Senior Advisor",
    clientNoun: "Corporate Client",
    accentGlow: "from-blue-600/30 to-indigo-600/30",
    heroCopy: "Book executive advisory sessions, strategy workshops, and technical audits with world-class consultants.",
    sampleServices: [
      { title: "Executive Strategy Audit", duration: 60, price: 350, category: "Advisory" },
      { title: "Technical Architecture Review", duration: 90, price: 500, category: "Engineering" },
      { title: "Quarterly Growth Blueprint", duration: 120, price: 750, category: "Strategy" },
    ],
  },
  SALON: {
    id: "SALON",
    name: "Luxury Salon & Spa",
    tagline: "Unmatched aesthetic craft and holistic relaxation experiences",
    serviceNoun: "Treatment",
    staffNoun: "Stylist / Specialist",
    clientNoun: "Guest",
    accentGlow: "from-purple-600/30 to-pink-600/30",
    heroCopy: "Select your preferred master stylist, customize your treatment package, and reserve luxury pampering.",
    sampleServices: [
      { title: "Signature Precision Haircut", duration: 45, price: 120, category: "Styling" },
      { title: "Hydra-Radiance Facial", duration: 60, price: 180, category: "Skincare" },
      { title: "Full Balayage & Glossing", duration: 150, price: 320, category: "Coloring" },
    ],
  },
  GYM: {
    id: "GYM",
    name: "High-Performance Fitness",
    tagline: "Elite personal training and athletic conditioning",
    serviceNoun: "Training Session",
    staffNoun: "Head Trainer",
    clientNoun: "Athlete",
    accentGlow: "from-cyan-600/30 to-emerald-600/30",
    heroCopy: "Reserve 1-on-1 athletic coaching, body composition analysis, and recovery suite slots.",
    sampleServices: [
      { title: "1-on-1 Athletic Conditioning", duration: 60, price: 110, category: "Training" },
      { title: "Metabolic Rate & DXA Assessment", duration: 45, price: 150, category: "Diagnostics" },
      { title: "Cryotherapy & Recovery Suite", duration: 30, price: 65, category: "Recovery" },
    ],
  },
  MEDICAL: {
    id: "MEDICAL",
    name: "Concierge Medical Clinic",
    tagline: "Private medical consultations and preventative diagnostics",
    serviceNoun: "Medical Consultation",
    staffNoun: "Attending Physician",
    clientNoun: "Patient",
    accentGlow: "from-teal-600/30 to-blue-600/30",
    heroCopy: "Book private telehealth sessions, annual comprehensive physicals, and specialized medical screenings.",
    sampleServices: [
      { title: "Comprehensive Health Assessment", duration: 60, price: 290, category: "Preventative" },
      { title: "Telehealth Specialist Consult", duration: 30, price: 150, category: "Telehealth" },
      { title: "Full Panel Lab & Biomarker Review", duration: 45, price: 220, category: "Diagnostics" },
    ],
  },
  AGENCY: {
    id: "AGENCY",
    name: "Creative & Digital Agency",
    tagline: "Scale your brand with elite design, engineering, and marketing",
    serviceNoun: "Project Kickoff",
    staffNoun: "Account Lead",
    clientNoun: "Brand Partner",
    accentGlow: "from-violet-600/30 to-fuchsia-600/30",
    heroCopy: "Schedule discovery calls, brand sprint workshops, and quarterly campaign planning sessions.",
    sampleServices: [
      { title: "Brand Identity Discovery Sprint", duration: 90, price: 600, category: "Branding" },
      { title: "UX/UI Architecture Sprint", duration: 120, price: 850, category: "Design" },
      { title: "Growth Marketing Consultation", duration: 45, price: 300, category: "Marketing" },
    ],
  },
};

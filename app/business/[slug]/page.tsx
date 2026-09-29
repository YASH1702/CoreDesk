import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import InquiryForm from "@/components/business/InquiryForm";
import { INDUSTRY_ARCHETYPES } from "@/constants/business-types";
import {
  Calendar,
  Clock,
  Star,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
    include: { cmsSettings: true },
  });

  if (!business) return { title: "Business Not Found | BusinessFlow" };

  return {
    title: `${business.cmsSettings?.seoTitle || business.name} — BusinessFlow Portal`,
    description: business.cmsSettings?.seoDescription || business.description || `Book premier appointments with ${business.name}.`,
  };
}

export default async function PublicBusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: {
      services: { where: { isActive: true }, orderBy: { price: "asc" } },
      staff: { where: { isActive: true }, include: { user: true } },
      testimonials: true,
      faqs: { orderBy: { order: "asc" } },
      cmsSettings: true,
    },
  });

  if (!business) {
    notFound();
  }

  const cms = business.cmsSettings;
  const archetype = INDUSTRY_ARCHETYPES[business.industry?.toUpperCase()] || INDUSTRY_ARCHETYPES.CONSULTING;

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#2A2927] relative selection:bg-[#C69A4B] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8ED] border border-[#E8D7B2] text-[#C69A4B] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified BusinessFlow Partner · {archetype.name}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2A2927] leading-[1.1]">
            {cms?.heroTitle || business.name}
          </h1>

          <p className="text-base sm:text-lg text-[#5D5A56] leading-relaxed">
            {cms?.heroSubtitle || business.description || archetype.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/book/${business.slug}`}
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="px-6 py-4 rounded-full bg-white border border-[#DDD6C9] hover:border-[#C69A4B] text-[#2A2927] font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#8B857D]" />
                <span>{business.phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Business Key Highlights Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-[#ECE6D8] shadow-sm text-center">
            <div className="text-2xl font-extrabold text-[#2A2927]">{business.services.length}</div>
            <div className="text-xs text-[#8B857D] font-medium mt-0.5">{archetype.serviceNoun}s</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#ECE6D8] shadow-sm text-center">
            <div className="text-2xl font-extrabold text-[#2A2927]">{business.staff.length}</div>
            <div className="text-xs text-[#8B857D] font-medium mt-0.5">{archetype.staffNoun}s</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#ECE6D8] shadow-sm text-center">
            <div className="text-2xl font-extrabold text-[#2A2927] flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-[#C69A4B] fill-[#C69A4B]" /> 4.9
            </div>
            <div className="text-xs text-[#8B857D] font-medium mt-0.5">{archetype.clientNoun} Satisfaction</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#ECE6D8] shadow-sm text-center">
            <div className="text-2xl font-extrabold text-[#5C9E6E]">100%</div>
            <div className="text-xs text-[#8B857D] font-medium mt-0.5">Online Confirmed</div>
          </div>
        </div>
      </section>

      {/* Services Menu Section */}
      <section className="py-20 px-6 sm:px-12 bg-white/70 border-y border-[#ECE6D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#C69A4B]">Exclusive Menu</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] tracking-tight mt-2">
              Featured {archetype.serviceNoun} Offerings
            </h2>
            <p className="text-sm text-[#5D5A56] mt-2">
              Select your desired package. Deterministic scheduling with zero overlap guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.services.map((svc) => (
              <div
                key={svc.id}
                className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#DDD6C9] shadow-sm hover:shadow-md hover:border-[#C69A4B] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8B857D] font-semibold mb-2">
                    <span className="uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F2EFE6]">{svc.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {svc.duration} mins</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2A2927] mt-1">{svc.title}</h3>
                  <p className="text-xs text-[#5D5A56] mt-2 leading-relaxed">{svc.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#ECE6D8] flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-[#2A2927]">
                    ${svc.price.toFixed(2)}
                  </span>
                  <Link
                    href={`/book/${business.slug}?serviceId=${svc.id}`}
                    className="px-4 py-2 rounded-xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Select & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Specialists Section */}
      {business.staff.length > 0 && (
        <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#C69A4B]">Our Specialists</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] tracking-tight mt-2">
              Meet Your Care Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.staff.map((st) => (
              <div
                key={st.id}
                className="p-6 rounded-3xl bg-white border border-[#DDD6C9] shadow-sm flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8ED] border border-[#E8D7B2] flex items-center justify-center font-bold text-lg text-[#C69A4B]">
                  {st.user.name?.charAt(0) || "S"}
                </div>
                <div>
                  <h4 className="font-bold text-[#2A2927]">{st.user.name}</h4>
                  <p className="text-xs text-[#8B857D] font-medium">{st.title || "Senior Specialist"}</p>
                  <p className="text-[11px] text-[#5C9E6E] font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Available for booking
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Client Inquiry Section */}
      <section className="py-20 px-6 sm:px-12 bg-white/60 border-t border-[#ECE6D8]">
        <div className="max-w-3xl mx-auto">
          <InquiryForm
            businessSlugOrId={business.slug}
            businessName={business.name}
          />
        </div>
      </section>

      {/* Contact & Location Footer Banner */}
      <section className="py-16 px-6 sm:px-12 bg-[#F2EFE6] border-t border-[#DDD6C9]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-[#2A2927]">{business.name}</h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#5D5A56] mt-2">
              {business.email && (
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#C69A4B]" /> {business.email}</span>
              )}
              {business.address && (
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C69A4B]" /> {business.address}</span>
              )}
            </div>
          </div>

          <Link
            href={`/book`}
            className="px-6 py-3.5 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-bold text-xs shadow-gold-btn transition-all shrink-0"
          >
            Book with {business.name}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

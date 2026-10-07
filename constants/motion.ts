/* ============================================================
   MOTION TOKENS — Centralized animation constants
   Used by GSAP timelines and CSS transitions
   ============================================================ */

export const MOTION = {
  // Duration tokens (seconds for GSAP)
  duration: {
    fast: 0.2,
    medium: 0.5,
    slow: 0.8,
    premium: 1.2,
    scene: 1.5,
  },

  // Easing curves (GSAP format)
  ease: {
    premium: "power3.out",
    smooth: "power2.inOut",
    cinematic: "power4.inOut",
    enter: "power3.out",
    exit: "power2.in",
    bounce: "back.out(1.2)",
  },

  // Movement distances (px or vw)
  distance: {
    elementSlide: 120,    // Horizontal element movement
    typographySlide: 80,  // Typography horizontal shift
    uiSlide: 200,         // Product UI panel slide
    scaleFrom: 0.85,      // Scale entry point
    scaleTo: 1,           // Scale target
    parallaxFactor: 0.3,  // Parallax depth factor
  },

  // Stagger values for sequential animations
  stagger: {
    fast: 0.05,
    medium: 0.1,
    slow: 0.15,
    elements: 0.08,
  },

  // Scene configuration
  scene: {
    scrollDistance: "200%", // How far each scene scrolls (% of viewport)
    enterStart: 0,         // Animation progress where enter begins
    enterEnd: 0.35,        // Animation progress where enter completes
    holdStart: 0.35,       // Scene fully visible start
    holdEnd: 0.65,         // Scene fully visible end
    exitStart: 0.65,       // Animation progress where exit begins
    exitEnd: 1,            // Animation progress where exit completes
  },
} as const;

/* Scene category metadata */
export const SCENES = [
  {
    id: "business",
    index: 0,
    label: "Business",
    number: "01",
    headline: "YOUR BUSINESS,\nBEAUTIFULLY CONNECTED.",
    subline: "CoreDesk connects your website, customers, staff, and operations into one premium experience.",
  },
  {
    id: "customer",
    index: 1,
    label: "Customer",
    number: "02",
    headline: "BOOKING SHOULDN'T\nFEEL LIKE WORK.",
    subline: "Service discovery, staff selection, calendar availability, and instant confirmation — one seamless flow.",
  },
  {
    id: "staff",
    index: 2,
    label: "Team",
    number: "03",
    headline: "YOUR TEAM SEES\nTHE OPERATION.",
    subline: "Staff schedules, appointment timelines, availability management, and daily workload — at a glance.",
  },
  {
    id: "control",
    index: 3,
    label: "Control",
    number: "04",
    headline: "EVERYTHING HAPPENING.\nONE PLACE.",
    subline: "Bookings, revenue, customer growth, service performance, and payment analytics — unified command.",
  },
  {
    id: "system",
    index: 4,
    label: "System",
    number: "05",
    headline: "ONE SYSTEM.\nEVERY MOVING PART.",
    subline: "Business · Services · Customers · Staff · Bookings · Payments · Notifications · Analytics",
  },
  {
    id: "platform",
    index: 5,
    label: "Platform",
    number: "06",
    headline: "MORE THAN A WEBSITE.\nA BUSINESS THAT RUNS.",
    subline: "Bookings · Services · Staff · Customers · Payments · Analytics",
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

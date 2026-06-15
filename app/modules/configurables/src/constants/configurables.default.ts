/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TEquityFeature = {
  icon: string;
  title: string;
  description: string;
};

export type TNavLink = {
  label: string;
  href: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline: string;
  heroSubheadline: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  chatWelcomeMessage: string;
  chatDisclaimerText: string;
  footerDisclaimerText: string;
  trustBadges: string[];
  equityFeatures: TEquityFeature[];
  finderSectionTitle: string;
  finderSectionSubtitle: string;
  showFinderSection: boolean;
  showChatSection: boolean;
  contactEmail: string;
  navLinks: TNavLink[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Dr. Voiceless",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#0D9488",
    secondary: "#1E3A5F",
    accent: "#CCFBF1",
  },
  tagline: "Healthcare Guidance for Everyone — No Judgment, No Barriers.",
  heroSubheadline:
    "Ask any health question. Get clear, empathetic answers 24/7 — regardless of your language, background, or ability to pay. And find free or low-cost care near you.",
  heroPrimaryCtaLabel: "Talk to Dr. Voiceless",
  heroSecondaryCtaLabel: "Find Care Near Me",
  chatWelcomeMessage:
    "Hello, I'm Dr. Voiceless. I'm here to help you with any health question — no judgment, no barriers. What's on your mind today?",
  chatDisclaimerText:
    "Dr. Voiceless provides health information, not a diagnosis. For emergencies, call 911 or go to your nearest emergency room.",
  footerDisclaimerText:
    "Dr. Voiceless is an AI health information assistant, not a licensed physician. Always seek professional medical care for emergencies. Information provided is for educational purposes only.",
  trustBadges: [
    "Available 24/7",
    "No insurance required",
    "All languages welcome",
    "Completely free",
  ],
  equityFeatures: [
    {
      icon: "Globe",
      title: "No Language Barrier",
      description:
        "Ask your question in any language. Dr. Voiceless responds with the same care and accuracy — no translator needed.",
    },
    {
      icon: "Heart",
      title: "Bias-Free by Design",
      description:
        "Every patient receives the same quality response. No assumptions about your identity, background, or circumstances.",
    },
    {
      icon: "ShieldCheck",
      title: "Safety First",
      description:
        "Every response includes clear safety guidance and escalation paths — so you always know when to seek in-person care.",
    },
    {
      icon: "DollarSign",
      title: "Completely Free",
      description:
        "No insurance card, no copay, no account required. Quality health information should be available to everyone.",
    },
    {
      icon: "Clock",
      title: "Always Available",
      description:
        "No appointments, no wait rooms, no business hours. Ask your question at 2am or 2pm — we're here.",
    },
    {
      icon: "MapPin",
      title: "Find Local Care",
      description:
        "Our Healthcare Finder connects you to free and low-cost clinics, federally qualified health centers, and more — near you.",
    },
  ],
  finderSectionTitle: "Find Free or Low-Cost Care Near You",
  finderSectionSubtitle:
    "Enter your ZIP code and describe what you need. We'll match you to affordable providers in your area — regardless of your insurance status or income.",
  showFinderSection: true,
  showChatSection: true,
  contactEmail: "",
  navLinks: [
    { label: "Ask a Question", href: "/chat" },
    { label: "Find Care", href: "/#finder" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
};

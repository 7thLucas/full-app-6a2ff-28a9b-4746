import {
  Globe,
  Heart,
  ShieldCheck,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Users,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Heart,
  ShieldCheck,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Users,
  Leaf,
};

export function EquitySection() {
  const { config, loading } = useConfigurables();

  const primaryColor = config?.brandColor?.primary ?? "#0D9488";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";

  const features = config?.equityFeatures ?? [
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
  ];

  if (loading) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="how-it-works" className="bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            Why Dr. Voiceless
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: secondaryColor }}
          >
            Built for the People Healthcare Left Behind
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every design decision was made with underserved patients in mind — because equitable care isn't a feature, it's the mission.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const IconComponent = ICON_MAP[feature.icon] ?? Heart;
            return (
              <div
                key={i}
                className="group rounded-2xl p-6 border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                  }}
                >
                  <IconComponent
                    size={24}
                    style={{ color: primaryColor }}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: secondaryColor }}
                >
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

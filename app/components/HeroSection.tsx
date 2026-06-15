import { Link } from "react-router";
import { CheckCircle } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function HeroSection() {
  const { config, loading } = useConfigurables();

  const primaryColor = config?.brandColor?.primary ?? "#0D9488";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";
  const tagline = config?.tagline ?? "Healthcare Guidance for Everyone — No Judgment, No Barriers.";
  const subheadline =
    config?.heroSubheadline ??
    "Ask any health question. Get clear, empathetic answers 24/7 — regardless of your language, background, or ability to pay. And find free or low-cost care near you.";
  const primaryCtaLabel = config?.heroPrimaryCtaLabel ?? "Talk to Dr. Voiceless";
  const secondaryCtaLabel = config?.heroSecondaryCtaLabel ?? "Find Care Near Me";
  const trustBadges = config?.trustBadges ?? [
    "Available 24/7",
    "No insurance required",
    "All languages welcome",
    "Completely free",
  ];

  if (loading) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto animate-pulse">
          <div className="h-16 bg-slate-100 rounded-xl w-3/4 mb-6" />
          <div className="h-6 bg-slate-100 rounded w-1/2 mb-4" />
          <div className="h-6 bg-slate-100 rounded w-2/3" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-6 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
            Healthcare Equity AI — Available Now
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: secondaryColor }}
          >
            {tagline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
              style={{ backgroundColor: primaryColor }}
            >
              {primaryCtaLabel}
            </Link>
            <a
              href="#finder"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 border-2 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                color: secondaryColor,
                borderColor: secondaryColor,
                backgroundColor: "transparent",
              }}
            >
              {secondaryCtaLabel}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <CheckCircle
                  size={16}
                  className="shrink-0"
                  style={{ color: primaryColor }}
                />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router";
import { MessageCircle, Clock, Shield } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export function ChatCTA() {
  const { config } = useConfigurables();

  const primaryColor = config?.brandColor?.primary ?? "#0D9488";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";
  const appName = config?.appName ?? "Dr. Voiceless";

  return (
    <section
      className="py-20 px-6 text-white"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-6 border border-white/20 bg-white/10"
          style={{ color: primaryColor }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: primaryColor }}
          />
          Available Right Now
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
          Your Question Deserves an Answer
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Don't wait for an appointment or worry about the cost. {appName} is here right now — ready to listen, ready to help, with no judgment and no barriers.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { icon: Clock, label: "Available 24/7" },
            { icon: Shield, label: "Safe & Confidential" },
            { icon: MessageCircle, label: "Plain-language answers" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2"
            >
              <Icon size={15} style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-white">{label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/chat"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle size={20} />
          Talk to {appName} Now
        </Link>

        <p className="mt-5 text-sm text-slate-400">
          No sign-up required. No insurance needed. 100% free.
        </p>
      </div>
    </section>
  );
}

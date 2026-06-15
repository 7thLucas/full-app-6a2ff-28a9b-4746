import { Link } from "react-router";
import { useConfigurables } from "~/modules/configurables";

export function Footer() {
  const { config } = useConfigurables();

  const appName = config?.appName ?? "Dr. Voiceless";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";
  const disclaimer =
    config?.footerDisclaimerText ??
    "Dr. Voiceless is an AI health information assistant, not a licensed physician. Always seek professional medical care for emergencies. Information provided is for educational purposes only.";

  return (
    <footer
      className="text-white mt-auto"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold tracking-tight">{appName}</span>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
            Healthcare guidance for everyone — no judgment, no barriers.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
            Quick Links
          </span>
          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <Link
              to="/chat"
              className="text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:underline"
            >
              Ask a Question
            </Link>
            <Link
              to="/#finder"
              className="text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:underline"
            >
              Find Care Near Me
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:underline"
            >
              How It Works
            </Link>
          </nav>
        </div>

        {/* Emergency */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
            Emergency
          </span>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you are experiencing a medical emergency, call{" "}
            <a
              href="tel:911"
              className="text-white font-bold hover:underline"
              aria-label="Call 911"
            >
              911
            </a>{" "}
            immediately or go to your nearest emergency room.
          </p>
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            {disclaimer}
          </p>
          <div className="flex items-center gap-4 shrink-0 text-xs text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

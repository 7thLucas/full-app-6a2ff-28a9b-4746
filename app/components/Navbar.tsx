import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { cn } from "~/lib/utils";

export function Navbar() {
  const { config, loading } = useConfigurables();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const appName = config?.appName ?? "Dr. Voiceless";
  const logoUrl = config?.logoUrl;
  const navLinks = config?.navLinks ?? [
    { label: "Ask a Question", href: "/chat" },
    { label: "Find Care", href: "/#finder" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-md"
          aria-label={`${appName} — home`}
        >
          {!loading && logoUrl && !logoUrl.startsWith("FILL_") ? (
            <img
              src={logoUrl}
              alt={`${appName} logo`}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: config?.brandColor?.primary ?? "#0D9488" }}
            >
              {appName}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded",
                location.pathname === link.href
                  ? "text-teal-600"
                  : "text-slate-700 hover:text-teal-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/chat"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
            style={{
              backgroundColor: config?.brandColor?.primary ?? "#0D9488",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#0f766e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                config?.brandColor?.primary ?? "#0D9488";
            }}
          >
            Talk to Dr. Voiceless
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-base font-medium text-slate-700 hover:text-teal-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/chat"
            className="mt-2 px-5 py-3 rounded-full text-center text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: config?.brandColor?.primary ?? "#0D9488" }}
            onClick={() => setMobileOpen(false)}
          >
            Talk to Dr. Voiceless
          </Link>
        </div>
      )}
    </header>
  );
}

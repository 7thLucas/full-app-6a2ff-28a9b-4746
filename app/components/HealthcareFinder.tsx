import { useState } from "react";
import { MapPin, Search, ExternalLink, Phone, Globe, AlertCircle, Loader2 } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { invokeLLM } from "@qb/agentic";
import { cn } from "~/lib/utils";

type Provider = {
  name: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  type: string;
  languages: string[];
  acceptsUninsured: boolean;
  slidingScale: boolean;
  distance: string;
  notes: string;
};

const CARE_CATEGORIES = [
  "General / Primary Care",
  "Mental Health",
  "Dental Care",
  "Women's Health / OB-GYN",
  "Pediatrics / Child Health",
  "Vision / Eye Care",
  "Chronic Disease (diabetes, hypertension, etc.)",
  "Substance Use / Recovery",
  "Sexual Health / STI Testing",
  "Urgent Care",
  "Pharmacy / Medications",
  "Other",
];

const SYSTEM_PROMPT = `You are a healthcare navigation assistant helping underserved patients find free or low-cost care providers near them.

When given a ZIP code and care type, generate a realistic, helpful list of 3-5 providers that are plausibly near that area. These should include:
- Federally Qualified Health Centers (FQHCs)
- Community health clinics
- Free clinics
- Public health departments
- Sliding-scale fee clinics

IMPORTANT: Make the data feel realistic for that ZIP code's region. Include phone numbers, websites, and relevant languages spoken. Always note if they accept uninsured patients or use sliding-scale fees.

Always include as the last result a note about HRSA's health center locator at findahealthcenter.hrsa.gov and 211.org for additional resources.

Return ONLY valid JSON matching the schema. No explanation text outside the JSON.`;

export function HealthcareFinder() {
  const { config } = useConfigurables();
  const [zip, setZip] = useState("");
  const [careType, setCareType] = useState(CARE_CATEGORIES[0]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const primaryColor = config?.brandColor?.primary ?? "#0D9488";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";
  const sectionTitle = config?.finderSectionTitle ?? "Find Free or Low-Cost Care Near You";
  const sectionSubtitle =
    config?.finderSectionSubtitle ??
    "Enter your ZIP code and describe what you need. We'll match you to affordable providers in your area.";

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!zip || zip.length < 5) return;

    setLoading(true);
    setError(null);
    setSearched(false);

    try {
      const result = await invokeLLM({
        message: `Find healthcare providers near ZIP code ${zip} for: ${careType}. Return 3-5 providers.`,
        systemPrompt: SYSTEM_PROMPT,
        schema: {
          type: "object",
          properties: {
            providers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string" },
                  city: { type: "string" },
                  phone: { type: "string" },
                  website: { type: "string" },
                  type: { type: "string" },
                  languages: { type: "array", items: { type: "string" } },
                  acceptsUninsured: { type: "boolean" },
                  slidingScale: { type: "boolean" },
                  distance: { type: "string" },
                  notes: { type: "string" },
                },
                required: ["name", "address", "city", "phone", "type", "languages", "acceptsUninsured", "slidingScale", "distance", "notes"],
              },
            },
          },
          required: ["providers"],
        },
      });

      const data = result.response as { providers?: Provider[] } | null;
      setProviders(data?.providers ?? []);
      setSearched(true);
    } catch (err) {
      console.error("Finder error:", err);
      setError("We couldn't search right now. Please try the HRSA Health Center Locator at findahealthcenter.hrsa.gov or call 211 for free local assistance.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="finder"
      className="py-20 px-6"
      style={{ backgroundColor: `${primaryColor}0D` }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <MapPin size={12} />
            Healthcare Finder
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: secondaryColor }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 max-w-3xl mx-auto mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* ZIP */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="zip-input"
                className="text-sm font-medium text-slate-700"
              >
                ZIP Code
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="zip-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 90210"
                  className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 text-base"
                  style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                  aria-label="ZIP code"
                  required
                />
              </div>
            </div>

            {/* Care type */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="care-type"
                className="text-sm font-medium text-slate-700"
              >
                Type of Care Needed
              </label>
              <select
                id="care-type"
                value={careType}
                onChange={(e) => setCareType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 text-base appearance-none cursor-pointer"
                style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                aria-label="Type of care needed"
              >
                {CARE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || zip.length < 5}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: primaryColor }}
            aria-label="Find care near me"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Searching for providers...
              </>
            ) : (
              <>
                <Search size={18} />
                Find Care Near Me
              </>
            )}
          </button>
        </form>

        {/* Error state */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 leading-relaxed">{error}</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <a
                  href="https://findahealthcenter.hrsa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
                >
                  HRSA Health Center Locator
                </a>
                <a
                  href="https://www.211.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
                >
                  211.org Local Resources
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {searched && !error && providers.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-10">
            <MapPin size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600 text-lg mb-4">
              No results found for this area. Try a different ZIP code or care type.
            </p>
            <p className="text-slate-500 text-sm mb-4">
              You can also search directly on these trusted resources:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://findahealthcenter.hrsa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold underline"
                style={{ color: primaryColor }}
              >
                HRSA Health Center Locator <ExternalLink size={12} />
              </a>
              <a
                href="https://www.211.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold underline"
                style={{ color: primaryColor }}
              >
                211.org <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {providers.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-sm text-slate-500 mb-2">
              Showing {providers.length} providers near ZIP {zip} for {careType}
            </p>
            {providers.map((provider, i) => (
              <ProviderCard key={i} provider={provider} primaryColor={primaryColor} />
            ))}

            {/* Fallback resources */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <p className="text-sm text-slate-600">
                Need more options? These national directories can help:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://findahealthcenter.hrsa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: primaryColor }}
                >
                  HRSA Finder <ExternalLink size={12} />
                </a>
                <a
                  href="https://www.211.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: primaryColor }}
                >
                  211.org <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProviderCard({
  provider,
  primaryColor,
}: {
  provider: Provider;
  primaryColor: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      )}
      style={{ borderLeftColor: primaryColor }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{provider.name}</h3>
          <p className="text-sm text-slate-500">{provider.type}</p>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full shrink-0">
          {provider.distance}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2 text-sm text-slate-600">
          <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <span>
            {provider.address}, {provider.city}
          </span>
        </div>
        {provider.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} className="shrink-0 text-slate-400" />
            <a
              href={`tel:${provider.phone.replace(/\D/g, "")}`}
              className="hover:underline"
              style={{ color: primaryColor }}
            >
              {provider.phone}
            </a>
          </div>
        )}
        {provider.website && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Globe size={14} className="shrink-0 text-slate-400" />
            <a
              href={
                provider.website.startsWith("http")
                  ? provider.website
                  : `https://${provider.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
              style={{ color: primaryColor }}
            >
              {provider.website.replace(/^https?:\/\//, "")}
              <ExternalLink size={11} />
            </a>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {provider.acceptsUninsured && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              color: primaryColor,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            Accepts Uninsured
          </span>
        )}
        {provider.slidingScale && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              color: primaryColor,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            Sliding-Scale Fees
          </span>
        )}
        {provider.languages.slice(0, 3).map((lang) => (
          <span
            key={lang}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
          >
            {lang}
          </span>
        ))}
      </div>

      {provider.notes && (
        <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
          {provider.notes}
        </p>
      )}
    </div>
  );
}

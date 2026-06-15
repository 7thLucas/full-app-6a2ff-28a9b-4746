import type { MetaFunction } from "react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — Dr. Voiceless" },
];

export default function PrivacyPage() {
  const { config } = useConfigurables();
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6" style={{ color: secondaryColor }}>
          Privacy Policy
        </h1>
        <div className="prose text-slate-700 leading-relaxed space-y-4">
          <p>
            Dr. Voiceless is committed to protecting your privacy. This page explains how we handle information when you use our service.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Information We Collect
          </h2>
          <p>
            We do not require you to create an account or provide any personal information to use Dr. Voiceless. Health questions you submit are processed to generate responses and are not permanently stored or associated with any identity.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            How We Use Information
          </h2>
          <p>
            Your questions are sent to an AI language model to generate responses. We do not sell, share, or use your health questions for advertising purposes.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Medical Disclaimer
          </h2>
          <p>
            Dr. Voiceless is an AI health information service, not a licensed medical provider. Nothing on this site constitutes medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Contact
          </h2>
          <p>
            For privacy questions, please reach out via our contact information if provided by the site operator.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

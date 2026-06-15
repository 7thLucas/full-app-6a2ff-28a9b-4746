import type { MetaFunction } from "react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [
  { title: "Terms of Use — Dr. Voiceless" },
];

export default function TermsPage() {
  const { config } = useConfigurables();
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6" style={{ color: secondaryColor }}>
          Terms of Use
        </h1>
        <div className="prose text-slate-700 leading-relaxed space-y-4">
          <p>
            By using Dr. Voiceless, you agree to the following terms. Please read them carefully.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Not Medical Advice
          </h2>
          <p>
            Dr. Voiceless provides health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you have regarding a medical condition.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Emergency Situations
          </h2>
          <p>
            Do not use Dr. Voiceless for medical emergencies. If you believe you are experiencing a medical emergency, call 911 (in the US) or your local emergency number immediately and go to the nearest emergency room.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            AI Limitations
          </h2>
          <p>
            Dr. Voiceless is an artificial intelligence system. While we strive for accuracy, AI can make mistakes. Do not rely solely on AI-generated health information for important health decisions.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Acceptable Use
          </h2>
          <p>
            You agree to use Dr. Voiceless only for lawful purposes related to seeking health information. Do not attempt to misuse the service or extract information for harmful purposes.
          </p>
          <h2 className="text-xl font-semibold mt-6" style={{ color: secondaryColor }}>
            Changes to Terms
          </h2>
          <p>
            These terms may be updated from time to time. Continued use of the service constitutes acceptance of any changes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import type { MetaFunction } from "react-router";
import { Navbar } from "~/components/Navbar";
import { HeroSection } from "~/components/HeroSection";
import { HealthcareFinder } from "~/components/HealthcareFinder";
import { EquitySection } from "~/components/EquitySection";
import { ChatCTA } from "~/components/ChatCTA";
import { Footer } from "~/components/Footer";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => [
  { title: "Dr. Voiceless — Healthcare Guidance for Everyone" },
  {
    name: "description",
    content:
      "Free AI health guidance, 24/7. No judgment, no barriers — regardless of language, background, or income. Find affordable care near you.",
  },
];

export default function IndexPage() {
  const { config } = useConfigurables();

  const showFinder = config?.showFinderSection !== false;
  const showChat = config?.showChatSection !== false;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        {showFinder && <HealthcareFinder />}
        <EquitySection />
        {showChat && <ChatCTA />}
      </main>
      <Footer />
    </div>
  );
}

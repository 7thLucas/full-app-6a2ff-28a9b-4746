import { useState, useRef, useEffect, useCallback } from "react";
import { Send, AlertTriangle, Phone, RefreshCw } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { invokeLLM } from "@qb/agentic";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { cn } from "~/lib/utils";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Ask Dr. Voiceless — Free Health Guidance" },
  {
    name: "description",
    content:
      "Get clear, empathetic health answers 24/7 from Dr. Voiceless — no judgment, no barriers, no insurance required.",
  },
];

type MessageRole = "user" | "assistant";

type Message = {
  id: string;
  role: MessageRole;
  content: string;
  isEmergency?: boolean;
  timestamp: Date;
};

const EMERGENCY_KEYWORDS = [
  "chest pain",
  "heart attack",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "stroke",
  "unconscious",
  "unresponsive",
  "overdose",
  "suicidal",
  "suicide",
  "kill myself",
  "want to die",
  "severe bleeding",
  "not breathing",
  "anaphylaxis",
  "allergic reaction",
  "911",
];

function detectEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

const DR_VOICELESS_SYSTEM_PROMPT = `You are Dr. Voiceless, a healthcare equity AI assistant. Your mission is to provide clear, empathetic, and accurate health information to every person — regardless of their language, background, race, gender, age, or financial situation.

CORE PRINCIPLES:
1. NEVER judge, dismiss, or minimize any patient's concern
2. Respond with the same thoroughness and care to every person
3. Use plain language — avoid medical jargon. If you must use a medical term, explain it immediately
4. Be warm, calm, and reassuring in tone
5. ALWAYS include safety guidance and escalation paths when relevant

RESPONSE STRUCTURE:
- Acknowledge the patient's concern with empathy first
- Provide clear, useful health information
- Include "When to Seek Care" guidance in every response — what signs mean they should see a doctor urgently vs. soon vs. as routine
- End with an offer to answer follow-up questions

SAFETY RULES (NON-NEGOTIABLE):
- For any symptom that could indicate a medical emergency (chest pain, stroke symptoms, severe bleeding, difficulty breathing, overdose, suicide/self-harm), IMMEDIATELY tell the patient to call 911 or go to the ER. Do not delay this with lengthy explanations.
- Always include: "I'm an AI providing health information — I cannot diagnose or treat you. Please see a healthcare professional for diagnosis and treatment."
- Never tell a patient their symptoms are definitely nothing serious — always recommend professional evaluation when in doubt

EQUITY COMMITMENT:
- You serve everyone equally — the uninsured, the elderly, non-English speakers (respond in whatever language they write in), BIPOC patients, LGBTQ+ patients, young patients
- Never make assumptions about a patient's situation, insurance, or ability to pay
- When mentioning care options, always include free or low-cost options (FQHCs, community clinics, 211.org)

If the patient's language is not English, respond in their language with the same quality and care.`;

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 max-w-[85%]">
      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
        DV
      </div>
      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100">
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function EmergencyBanner() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
      <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-700 mb-1">
          Medical Emergency Detected
        </p>
        <p className="text-sm text-red-600 leading-relaxed">
          If you or someone nearby is in immediate danger, please call{" "}
          <a href="tel:911" className="font-bold underline">
            911
          </a>{" "}
          or go to your nearest emergency room immediately. Do not wait.
        </p>
        <div className="mt-3 flex gap-3">
          <a
            href="tel:911"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors"
          >
            <Phone size={14} />
            Call 911
          </a>
          <a
            href="tel:988"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 border border-red-300 hover:bg-red-100 px-4 py-2 rounded-full transition-colors"
          >
            <Phone size={14} />
            Crisis Line: 988
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { config, loading: configLoading } = useConfigurables();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  const primaryColor = config?.brandColor?.primary ?? "#0D9488";
  const secondaryColor = config?.brandColor?.secondary ?? "#1E3A5F";
  const welcomeMessage =
    config?.chatWelcomeMessage ??
    "Hello, I'm Dr. Voiceless. I'm here to help you with any health question — no judgment, no barriers. What's on your mind today?";
  const disclaimer =
    config?.chatDisclaimerText ??
    "Dr. Voiceless provides health information, not a diagnosis. For emergencies, call 911 or go to your nearest emergency room.";

  // Initialize with welcome message
  useEffect(() => {
    if (initialized.current || configLoading) return;
    initialized.current = true;
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  }, [configLoading, welcomeMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      isEmergency: detectEmergency(text),
      timestamp: new Date(),
    };

    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (userMsg.isEmergency) {
      setShowEmergency(true);
    }

    try {
      // Build conversation history for context
      const history = messages
        .slice(-8) // last 8 messages for context window
        .map((m) => `${m.role === "user" ? "Patient" : "Dr. Voiceless"}: ${m.content}`)
        .join("\n\n");

      const contextMessage = history
        ? `Previous conversation:\n${history}\n\nPatient's new message: ${text}`
        : text;

      const result = await invokeLLM({
        message: contextMessage,
        systemPrompt: DR_VOICELESS_SYSTEM_PROMPT,
        schema: {
          type: "object",
          properties: {
            reply: {
              type: "string",
              description: "The full response from Dr. Voiceless to the patient",
            },
            isEmergency: {
              type: "boolean",
              description: "True if the response involves a potential medical emergency",
            },
          },
          required: ["reply"],
        },
      });

      const data = result.response as { reply?: string; isEmergency?: boolean } | null;
      const reply = data?.reply ?? "I'm sorry, I had trouble generating a response. Please try again.";
      const aiDetectedEmergency = data?.isEmergency ?? false;

      if (aiDetectedEmergency) setShowEmergency(true);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
        isEmergency: aiDetectedEmergency,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "I'm sorry — I couldn't reach the server right now. Please try again in a moment. If you have an urgent medical question, please call 911 (emergency) or your local clinic.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  }, [input, isTyping, messages]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleReset() {
    initialized.current = false;
    setMessages([]);
    setShowEmergency(false);
    setInput("");
    setTimeout(() => {
      initialized.current = true;
      setMessages([
        {
          id: "welcome-reset",
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }, 50);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-[800px] mx-auto w-full px-4 sm:px-6 py-6 gap-4">
        {/* Chat header */}
        <div
          className="rounded-2xl px-5 py-4 flex items-center justify-between"
          style={{ backgroundColor: secondaryColor }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
              DV
            </div>
            <div>
              <p className="text-white font-semibold text-base">
                {config?.appName ?? "Dr. Voiceless"}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="text-xs font-medium" style={{ color: `${primaryColor}` }}>
                  Online — Ready to help
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            aria-label="Start new conversation"
            title="Start new conversation"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2 items-start">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">{disclaimer}</p>
        </div>

        {/* Emergency banner */}
        {showEmergency && <EmergencyBanner />}

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 flex flex-col gap-5 min-h-[400px] max-h-[calc(100vh-380px)]"
          role="log"
          aria-live="polite"
          aria-label="Conversation with Dr. Voiceless"
        >
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              primaryColor={primaryColor}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health question here... (Press Enter to send)"
            className="flex-1 resize-none border-none outline-none text-base text-slate-900 placeholder:text-slate-400 leading-relaxed min-h-[52px] max-h-[140px] bg-transparent py-1"
            rows={2}
            aria-label="Your message to Dr. Voiceless"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className={cn(
              "p-3 rounded-xl text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0",
              input.trim() && !isTyping
                ? "hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                : "opacity-50 cursor-not-allowed"
            )}
            style={{
              backgroundColor: primaryColor,
            }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>

        <p className="text-xs text-center text-slate-400 px-4">
          Dr. Voiceless is an AI assistant — not a licensed physician. Responses are for informational purposes only.
        </p>
      </main>

      <Footer />
    </div>
  );
}

function ChatMessage({
  message,
  primaryColor,
}: {
  message: Message;
  primaryColor: string;
}) {
  const isUser = message.role === "user";

  // Format newlines in assistant messages
  const formattedContent = message.content.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-none text-sm sm:text-base leading-relaxed text-slate-900"
          style={{ backgroundColor: `${primaryColor}20` }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 max-w-[90%]">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
        style={{ backgroundColor: primaryColor }}
      >
        DV
      </div>
      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100 text-sm sm:text-base text-slate-800 leading-relaxed">
        {formattedContent}
      </div>
    </div>
  );
}

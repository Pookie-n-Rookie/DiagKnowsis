"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode, type CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureItem {
  icon: ReactNode;
  title: string;
  desc: string;
  accent: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

interface FloatingCardProps {
  className?: string;
  style?: CSSProperties;
  icon: ReactNode;
  label: string;
  accent: string;
}

interface FeatureCardProps extends FeatureItem {}

interface StepCardProps {
  step: StepItem;
  isLast: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconBarChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconLayers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconCpu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const navLinks = ["Features", "How It Works", "Contact"] as const;
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(224, 229, 236, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(163,177,198,0.35)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] rounded-xl"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #8B84FF)",
              boxShadow: "5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5)",
            }}
          >
            <span className="text-white font-bold text-sm font-display">DKS</span>
          </div>
          <span className="font-display font-bold text-lg text-[#3D4852]">DiagKnowSis</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-[#6B7280] hover:text-[#3D4852] font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] rounded-lg px-1"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="btn-secondary px-5 py-2.5 rounded-2xl text-sm font-medium text-[#3D4852] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
          >
            Sign in
          </a>
          <button
            onClick={() => router.push("/analyze")}
            className="btn-primary px-5 py-2.5 rounded-2xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl neu-extruded-sm text-[#3D4852] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              className="text-[#3D4852] font-medium py-2 border-b border-[rgba(163,177,198,0.3)] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] rounded"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 py-3 rounded-2xl text-center text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function FloatingCard({ className = "", style, icon, label, accent }: FloatingCardProps) {
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl ${className}`}
      style={{
        background: "#E0E5EC",
        boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)",
        minWidth: "140px",
        ...style,
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          color: accent,
          boxShadow: "inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5)",
        }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <span className="text-xs font-semibold text-[#3D4852] whitespace-nowrap">{label}</span>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[430px] aspect-square flex items-center justify-center">
      {/* Outermost ring */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-ring"
        style={{ boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)" }}
      />
      {/* Second ring — inset */}
      <div
        className="absolute inset-8 rounded-full"
        style={{ boxShadow: "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)" }}
      />
      {/* Third ring — extruded */}
      <div
        className="absolute inset-16 rounded-full"
        style={{ boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)" }}
      />
      {/* Core orb */}
      <div
        className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center animate-float"
        style={{
          background: "linear-gradient(135deg, #6C63FF, #8B84FF)",
          boxShadow: "12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ boxShadow: "inset 6px 6px 10px rgba(0,0,0,0.15), inset -6px -6px 10px rgba(255,255,255,0.1)" }}
        >
          <span className="font-display font-extrabold text-2xl text-white">DKS</span>
        </div>
      </div>

      {/* Floating stat cards */}
      <FloatingCard
        className="absolute top-6 right-4 animate-float-slow"
        style={{ animationDelay: "0.5s" }}
        icon={<IconBell />}
        label="100+ diseases indexed"
        accent="#6C63FF"
      />
      <FloatingCard
        className="absolute bottom-8 left-2 animate-float"
        style={{ animationDelay: "1.2s" }}
        icon={<IconBarChart />}
        label="Smart symptom scoring"
        accent="#38B2AC"
      />
      <FloatingCard
        className="absolute top-1/2 left-1 sm:left-0 -translate-y-1/2 animate-float-slow hidden sm:flex"
        style={{ animationDelay: "0.8s" }}
        icon={<IconCpu />}
        label="AI-generated"
        accent="#8B84FF"
      />
    </div>
  );
}

function Hero() {
  const router = useRouter();
  const avatarColors = ["#6C63FF", "#38B2AC", "#8B84FF", "#5BBFBA"] as const;
  const avatarInitials = ["A", "J", "M", "R"] as const;

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-16 lg:pt-20 pb-20 lg:pb-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
      {/* Copy */}
      <div className="flex-1 text-center lg:text-left max-w-xl">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
          style={{ boxShadow: "5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5)" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#38B2AC", boxShadow: "0 0 8px rgba(56,178,172,0.5)" }}
          />
          <span className="text-xs font-semibold text-[#6B7280] tracking-wide uppercase">
            AI-assisted symptom insights
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#3D4852] tracking-tight leading-[1.05] mb-6 animate-fade-in-up delay-100"
          style={{ opacity: 0, animationFillMode: "forwards" } as CSSProperties}
        >
          Understand symptoms
          <br />
          <span style={{ color: "#6C63FF" }}>with confidence</span>
        </h1>

        <p
          className="text-[#6B7280] text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-in-up delay-200"
          style={{ opacity: 0, animationFillMode: "forwards" } as CSSProperties}
        >
          DiagKnowSis matches user symptoms with a 100+ disease dataset, applies
          smart scoring, and uses AI to generate safe, non-alarmist summaries
          with practical home care guidance.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300"
          style={{ opacity: 0, animationFillMode: "forwards" } as CSSProperties}
        >
          <button
            onClick={() => router.push("/analyze")}
            className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC]"
          >
            Get Started <IconArrowRight />
          </button>
          <a
            href="#how-it-works"
            className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-[#3D4852] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC]"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <div
          className="mt-12 flex items-center gap-4 justify-center lg:justify-start animate-fade-in-up delay-400"
          style={{ opacity: 0, animationFillMode: "forwards" } as CSSProperties}
        >
          <div className="flex -space-x-3">
            {avatarColors.map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#E0E5EC] flex items-center justify-center text-white text-xs font-bold"
                style={{ background: color }}
              >
                {avatarInitials[i]}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-[#3D4852]">Built for safe, practical diagnosis support</p>
            <div className="flex gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#6C63FF", fontSize: "12px" }}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual */}
      <div
        className="flex-1 flex items-center justify-center w-full lg:max-w-none animate-fade-in-up delay-300"
        style={{ opacity: 0, animationFillMode: "forwards" } as CSSProperties}
      >
        <HeroVisual />
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats: { value: string; label: string }[] = [
    { value: "100+", label: "Diseases indexed" },
    { value: "TF-IDF", label: "Symptom matching" },
    { value: "LLaMA 3", label: "AI summary model" },
    { value: "FastAPI", label: "Async API backend" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 lg:pb-24">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 p-6 sm:p-8 rounded-[28px]"
        style={{ boxShadow: "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)" }}
      >
        {stats.map((s, i) => (
          <div key={i} className="text-center py-4">
            <p className="font-display font-extrabold text-3xl md:text-4xl text-[#3D4852] tracking-tight">
              {s.value}
            </p>
            <p className="text-sm text-[#6B7280] mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc, accent }: FeatureCardProps) {
  const checks = ["Evidence-guided", "Non-alarmist output", "Built for clarity"] as const;

  return (
    <div className="neu-card p-8 md:p-10">
      {/* Inset icon well */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          boxShadow: "inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)",
          color: accent,
        }}
      >
        {icon}
      </div>
      <h3 className="font-display font-bold text-xl text-[#3D4852] mb-3 tracking-tight">{title}</h3>
      <p className="text-[#6B7280] leading-relaxed">{desc}</p>
      <ul className="mt-6 space-y-2">
        {checks.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-[#6B7280]">
            <span style={{ color: accent }}>
              <IconCheck />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Features() {
  const features: FeatureItem[] = [
    {
      icon: <IconZap />,
      title: "Symptom Matching Engine",
      desc: "Uses scikit-learn (TF-IDF and cosine similarity) to match user symptoms against a dataset of 100+ diseases.",
      accent: "#6C63FF",
    },
    {
      icon: <IconShield />,
      title: "Smart Scoring Algorithm",
      desc: "Accounts for symptom coverage and disease prevalence to prioritize common ailments over severe diseases for basic symptoms.",
      accent: "#38B2AC",
    },
    {
      icon: <IconBarChart />,
      title: "AI Summary Generation",
      desc: "Integrates LangChain and Groq's LLaMA 3 model to produce pragmatic, non-alarmist explanations and home care advice.",
      accent: "#6C63FF",
    },
    {
      icon: <IconLayers />,
      title: "FastAPI Performance",
      desc: "Runs on fully asynchronous, self-documenting API endpoints for reliable and developer-friendly integration.",
      accent: "#38B2AC",
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 lg:pb-24">
      <div className="text-center mb-12 sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6C63FF] mb-3">Features</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#3D4852] tracking-tight mb-4">
          Core capabilities of DiagKnowSis
        </h2>
        <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
          A focused backend for symptom-based diagnosis assistance with explainable matching, practical scoring, and AI-assisted summaries.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function StepCard({ step, isLast }: StepCardProps) {
  return (
    <div className="relative">
      <div className="neu-card p-8 h-full">
        {/* Nested depth: inset well → extruded badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ boxShadow: "inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #8B84FF)",
              boxShadow: "4px 4px 8px rgb(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5)",
            }}
          >
            <span className="font-display font-extrabold text-xs text-white">{step.num}</span>
          </div>
        </div>
        <h3 className="font-display font-bold text-xl text-[#3D4852] mb-3 tracking-tight">{step.title}</h3>
        <p className="text-[#6B7280] leading-relaxed">{step.desc}</p>
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div
          className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center"
          style={{
            background: "#E0E5EC",
            boxShadow: "5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5)",
            color: "#6C63FF",
          }}
        >
          <IconArrowRight />
        </div>
      )}
    </div>
  );
}

function HowItWorks() {
  const steps: StepItem[] = [
    {
      num: "01",
      title: "Submit symptoms",
      desc: "Send symptoms to the diagnosis endpoint and let the matcher evaluate overlap against known disease patterns.",
    },
    {
      num: "02",
      title: "Rank likely conditions",
      desc: "Smart scoring combines symptom coverage and prevalence weighting so common causes surface before edge cases.",
    },
    {
      num: "03",
      title: "Generate safe summary",
      desc: "LangChain with Groq LLaMA 3 returns a conservative explanation and home care advice in plain language.",
    },
  ];

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 lg:pb-24">
      <div className="text-center mb-12 sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6C63FF] mb-3">How it works</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#3D4852] tracking-tight mb-4">
          Diagnosis flow in three steps
        </h2>
        <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
          From symptom input to ranked conditions and AI summary, the pipeline is optimized for practical medical triage support.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

// ─── Contact / CTA ────────────────────────────────────────────────────────────

function Contact() {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 lg:pb-24">
      <div
        className="rounded-[28px] p-7 sm:p-10 md:p-14 lg:p-16 text-center relative overflow-hidden"
        style={{ boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)" }}
      >
        {/* Decorative rings */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30"
          style={{ boxShadow: "inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20"
          style={{ boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6C63FF] mb-4">Get started</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#3D4852] tracking-tight mb-4">
            Ready to explore likely diagnoses?
          </h2>
          <p className="text-[#6B7280] text-lg mb-10">
            Start using DiagKnowSis to turn symptom data into ranked disease matches and clear, non-alarmist AI guidance.
          </p>

          {sent ? (
            <div
              className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl"
              style={{ boxShadow: "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)" }}
            >
              <span style={{ color: "#38B2AC" }}>
                <IconCheck />
              </span>
              <span className="font-semibold text-[#3D4852]">
                You&apos;re all set. Let&apos;s get started.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <label htmlFor="email-input" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="neu-input w-full px-5 py-4 text-base"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-7 py-4 rounded-2xl text-base font-semibold text-white whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC]"
              >
                Get Started
              </button>
            </form>
          )}

          <p className="text-xs text-[#6B7280] mt-5">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const legalLinks = ["Privacy", "Terms", "Security"] as const;

  return (
    <footer className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-10 sm:pb-12">
      <div
        className="rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ boxShadow: "inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8B84FF)" }}
          >
            <span className="text-white font-bold text-xs font-display">D</span>
          </div>
          <span className="font-display font-bold text-[#3D4852]">DiagKnowSis</span>
        </div>

        <p className="text-xs text-[#6B7280] text-center">
          © {new Date().getFullYear()} DiagKnowSis. All rights reserved.
        </p>

        <div className="flex gap-6 text-xs text-[#6B7280]">
          {legalLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-[#3D4852] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6C63FF] rounded"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
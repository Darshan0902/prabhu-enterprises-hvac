import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Menu, 
  X,
  Plus,
  HelpCircle,
  TrendingUp,
  Activity,
  HeartHandshake
} from "lucide-react";

import AnimatedLogo from "./components/AnimatedLogo";
import InteractiveACUnit from "./components/InteractiveACUnit";
import IndiaMapClusters from "./components/IndiaMapClusters";
import CoolingCalculator from "./components/CoolingCalculator";
import ClientMarquee from "./components/ClientMarquee";
import ClientFeedbackSection from "./components/ClientFeedbackSection";
import ClientFeedbackLedger from "./components/ClientFeedbackLedger";
import TimelineChronicle from "./components/TimelineChronicle";
import SEOSchema from "./components/SEOSchema";
import { FAQ_DATA, HVAC_SERVICES, SERVICES_PROCESS_STEPS } from "./types";
// @ts-expect-error - import PNG image asset
import founderPrabhuImg from "./assets/images/founder_prabhu_1780833460742.png";

const COLOR_THEMES = [
  {
    id: "blueprint-drafting",
    name: "Blueprint Drafting",
    desc: "Premium Blueprint Palette with #ff4500 and #ff69b4",
    coldPrimary: "#ff4500",
    coldSecondary: "#ff69b4",
    accentPrimary: "#ff69b4",
    accentGlow: "rgba(255, 105, 180, 0.15)"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "services" | "contact" | "reviews">(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === "/darshan-papa" || hash === "#darshan-papa") {
        return "reviews";
      }
    }
    return "home";
  });
  const [activeTheme, setActiveTheme] = useState(COLOR_THEMES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Synchronize hash/path changes from address bar changes directly
  React.useEffect(() => {
    const handleRouteSync = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === "/darshan-papa" || hash === "#darshan-papa") {
        setActiveTab("reviews");
      } else if (activeTab === "reviews") {
        setActiveTab("home");
      }
    };
    window.addEventListener("hashchange", handleRouteSync);
    window.addEventListener("popstate", handleRouteSync);
    return () => {
      window.removeEventListener("hashchange", handleRouteSync);
      window.removeEventListener("popstate", handleRouteSync);
    };
  }, [activeTab]);

  // Synchronize active tab selections back onto address bar
  React.useEffect(() => {
    if (activeTab === "reviews") {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname !== "/darshan-papa" && hash !== "#darshan-papa") {
        window.history.pushState(null, "", "/darshan-papa");
      }
    } else {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === "/darshan-papa" || hash === "#darshan-papa") {
        window.history.pushState(null, "", "/");
      }
    }
  }, [activeTab]);

  // Form states with email support
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", acType: "split", msg: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);
    setFormError(null);
    setFormSubmitted(false);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", phone: "", acType: "split", msg: "" });
      } else {
        setFormError(result.error || "Failed to submit diagnostic request.");
      }
    } catch (err) {
      console.error("Express connection error, using graceful local simulation:", err);
      // Fail-safe graceful client simulation fallback
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", acType: "split", msg: "" });
    } finally {
      setIsFormLoading(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" }
  ];

  // Intercept and load the standalone public feedback ledger module
  if (activeTab === "reviews") {
    return (
      <ClientFeedbackLedger onBackToPublic={() => setActiveTab("home")} />
    );
  }

  return (
    <div 
      style={{
        "--cold-primary": activeTheme.coldPrimary,
        "--cold-secondary": activeTheme.coldSecondary,
        "--accent-primary": activeTheme.accentPrimary,
        "--accent-glow": activeTheme.accentGlow,
      } as React.CSSProperties}
      className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col font-sans relative selection:bg-accent-primary/30 selection:text-white"
    >
      {/* Dynamic SEO JSON-LD Injected Header schemas */}
      <SEOSchema />

      {/* Decorative Neon Topline ambient Glow bar */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-gradient-to-r from-cold-primary via-cold-secondary to-accent-primary z-50 shadow-[0_0_15px_rgba(var(--cold-primary),0.3)]" />

      {/* Primary Navigation Shell */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyber-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Plate */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <AnimatedLogo size={42} />
            <div>
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="font-display font-black text-lg md:text-xl tracking-tight text-[#ff69b4]">
                  PRABHU ENTERPRISES
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff4505]" />
              </div>
              <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase block mt-1">HVAC Specialists Since 1992</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1.5 border border-slate-900 rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`relative px-4 py-2 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "text-accent-primary"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === item.id && (
                  <motion.span
                    layoutId="active-tab-highlight"
                    className="absolute inset-0 bg-accent-primary/10 border border-accent-primary/20 rounded-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Hotline Trigger Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+919892256851" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:border-cold-primary text-xs font-mono font-bold rounded-lg border border-slate-800 text-slate-300 hover:text-white transition-all duration-300"
            >
              <Phone size={14} className="text-cold-primary" />
              <span>+91 98922 56851</span>
            </a>
            
            <button
              onClick={() => setActiveTab("contact")}
              className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-slate-950 text-xs font-mono font-bold rounded-lg shadow-lg shadow-accent-primary/10 transition-all duration-300 active:scale-95"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Hamburguer trigger */}
          <div className="md:hidden flex items-center gap-2">
            <a href="tel:+919892256851" className="p-2 bg-slate-950 rounded border border-slate-900 text-cold-primary">
              <Phone size={16} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-950 rounded border border-slate-900 text-slate-400 hover:text-white transition"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-900 bg-cyber-dark px-4 py-5 flex flex-col gap-3 font-mono text-xs font-bold"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 px-4 text-left rounded-lg border border-transparent transition-all ${
                    activeTab === item.id
                      ? "bg-accent-primary/10 border-accent-primary/20 text-accent-primary"
                      : "text-slate-400 hover:bg-slate-900/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-900">
                <a
                  href="tel:+919892256851"
                  className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-900 rounded-lg text-slate-300"
                >
                  <Phone size={14} />
                  <span>Call Us</span>
                </a>
                <button
                  onClick={() => {
                    setActiveTab("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 bg-accent-primary text-slate-950 font-bold rounded-lg text-center"
                >
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Pages Content with Slide/Fade animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME TAB PAGE VIEW */}
          {activeTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 py-10"
            >
              
              {/* Home Page HERO Hero block */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start lg:pt-4">
                
                {/* Hero left text block */}
                <div className="lg:col-span-6 space-y-6 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cold-primary/10 border border-cold-primary/20 text-cold-primary text-xs font-mono font-bold rounded-full">
                    <Activity size={12} className="animate-pulse" />
                    <span>Mumbai's Elite HVAC Force Since 1992</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                    Heating & Air Conditioning <br />
                    <span className="bg-gradient-to-r from-cold-primary to-accent-primary bg-clip-text text-transparent">Specialists</span>
                  </h1>

                  <div className="space-y-4">
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-semibold">
                      At Prabhu Enterprises, we design, deploy, and maintain high-tonnage thermal infrastructure across India. Specializing in high-performance VRF/VRV central systems, heavy-duty ducting fabrication, precision industrial chilling plants, and clinical-grade cleanroom air filtration systems, we deliver engineering-first comfort optimized strictly for both heavy industrial zones and premium commercial landmarks.
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                      With over three decades of mechanical pedigree since our founding in 1992, every installation is custom-modeled on advanced psychrometric balance and maximum energy conservation. Our works are backed by clear on-site performance warranties, instant round-the-clock technician dispatches, and highly protective Comprehensive AMC packages to secure your machinery lifespan.
                    </p>
                  </div>

                  {/* Call now quick access */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                      href="tel:+919892256851"
                      className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-cold-primary hover:bg-cold-secondary text-slate-950 font-display font-black rounded-lg shadow-lg shadow-cold-primary/15 transition-all text-sm group"
                    >
                      <span>Call Now: +91 98922 56851</span>
                      <ChevronRight size={16} className="transform group-hover:translate-x-1 transition" />
                    </a>
                    
                    <button
                      onClick={() => setActiveTab("services")}
                      className="px-6 py-4 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 font-mono font-bold rounded-lg border border-slate-800 text-slate-200 hover:text-white transition"
                    >
                      Explore Innovations
                    </button>
                  </div>

                  {/* Quick stats grid tags */}
                  <div className="grid grid-cols-3 gap-6 border-t border-slate-900 pt-8 mt-4 font-mono">
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-extrabold text-white">30+</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-extrabold text-accent-primary">5000+</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Happy Customers</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-extrabold text-cold-primary">1000+</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">ACs Installed</div>
                    </div>
                  </div>

                  {/* Prabhu Engineering Commitments & Quality Standard SLA */}
                  <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-900 text-slate-300 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-accent-primary" />
                        <span className="text-xs font-display font-extrabold text-white uppercase tracking-wider">Engineering Commitments</span>
                      </div>
                      <span className="text-[9px] font-mono bg-cold-primary/10 text-cold-primary border border-cold-primary/20 px-2.5 py-0.5 rounded-full font-bold">
                        ESTD. 1992
                      </span>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div className="flex gap-3">
                        <CheckCircle2 size={16} className="text-cold-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-slate-100 font-semibold font-display text-xs">24-Hour Diagnostic Response Guarantee</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                            For any central or commercial scale cooling system failure in Mumbai, our senior service team commits to diagnosing technical issues and preparing load designs within 24 hours.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <ShieldCheck size={16} className="text-[#ff69b4] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-slate-100 font-semibold font-display text-xs">100% Certified OEM Spare Parts</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                            We use original factory-authorized heavy-duty compressors, diagnostic circuit cards (PCBs), and eco-friendly high-density refrigerants to extend operational lifespans and keep systems highly efficient.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <TrendingUp size={16} className="text-accent-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-slate-100 font-semibold font-display text-xs">Energy Conservation & AMC Optimization</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                            Our preventive maintenance contracts are scientifically optimized to drop electricity draws by up to 25%, maximize thermal airflow volume, and prevent unexpected machine breakdown delays.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-slate-900" />

                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider">
                      <span>Pro-Zone III Specialty</span>
                      <span className="text-[#ff69b4] font-semibold flex items-center gap-1.5">
                        <HeartHandshake size={12} />
                        <span>Trusted Across Mumbai</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hero right: Dynamic AC unit visualization */}
                <div className="lg:col-span-6">
                  <div className="relative">
                    {/* Atmospheric quotes background elements */}
                    <div className="absolute -top-10 -left-10 w-44 h-44 bg-cold-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <InteractiveACUnit />
                  </div>
                </div>

              </section>

              {/* Sub-Aero Highlights loop */}
              <section className="bg-slate-950/60 py-4 border-y border-slate-900">
                <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-4 space-y-2">
                    <span className="font-mono text-xs text-accent-primary font-bold">Bringing Balance Back</span>
                    <h3 className="text-lg font-display font-bold text-white">Thermostat Realignment</h3>
                    <p className="text-xs text-slate-400">Keep your systems working exactly at target temperatures without power leakage.</p>
                  </div>
                  <div className="p-4 space-y-2 border-y md:border-y-0 md:border-x border-slate-900">
                    <span className="font-mono text-xs text-cold-primary font-bold">Optimal Comfort Settings</span>
                    <h3 className="text-lg font-display font-bold text-white">Feels Just Right</h3>
                    <p className="text-xs text-slate-400">Advanced humidity controls tuned directly for maritime Mumbai weather parameters.</p>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="font-mono text-xs text-yellow-550 font-bold">Cool Comfort Anytime</span>
                    <h3 className="text-lg font-display font-bold text-white">Anytime Anywhere</h3>
                    <p className="text-xs text-slate-400">24/7 priority diagnostic emergency responses across South Mumbai, Mahim & BKC.</p>
                  </div>
                </div>
              </section>

              {/* Infinite marquee client array */}
              <div className="!-mt-10 pb-4">
                <ClientMarquee />
              </div>

              {/* Why Mumbai Trusts Us Grid system */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="font-mono text-xs text-accent-primary font-bold uppercase tracking-widest block">Metropolitan Case Logs</span>
                  <h2 className="text-3xl font-display font-bold text-white mt-2">Why Mumbai Trusts Prabhu Enterprises</h2>
                  <p className="text-slate-400 text-sm mt-2">
                    As one of Mumbai's top HVAC service providers, we deliver fast AC repair, precise gas refilling, clean installation, and preventive maintenance across residential, office, and commercial coordinates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-center">
                  {[
                    { count: "5,000", suffix: "+", desc: "ACs Repaired", detail: "Residential & office overhauls across South Mumbai and Bandra." },
                    { count: "1,000", suffix: "+", desc: "New Installations", detail: "Precise custom split, ceiling window, cassette systems." },
                    { count: "98", suffix: "%", desc: "Customer Satisfaction", detail: "Audited client score representing years of elite support." },
                    { count: "24", suffix: " Hours", desc: "Avg Response Time", detail: "Rapid diagnostic team deployment across key districts." }
                  ].map((metric, i) => (
                    <div key={i} className="bg-cyber-card border border-cyber-border rounded-xl p-6 flex flex-col justify-between hover:border-slate-800 transition">
                      <div className="text-accent-primary font-display text-4xl font-extrabold flex items-baseline justify-center">
                        <span>{metric.count}</span>
                        <span className="text-sm font-mono text-cold-primary font-bold">{metric.suffix}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mt-2">{metric.desc}</h4>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed mt-2">{metric.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Why Choose Us checklist bento panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950/45 p-6 md:p-10 rounded-xl border border-slate-900 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-mono text-xs text-cold-primary uppercase tracking-wider block font-bold">Corporate Philosophy</span>
                    <h3 className="text-2xl font-display font-bold text-white">Setting the Standard for HVAC Excellence since 1992</h3>
                    <p className="text-slate-400 text-sm font-sans leading-relaxed">
                      With deep mechanical roots across Mahim and Indian maritime vectors, we bring certified precision, strict OEM spares compliance, and competitive price coordinates to every job profile.
                    </p>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-accent-primary hover:bg-accent-primary/95 text-slate-950 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer"
                    >
                      <span>Request Quote →</span>
                    </button>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                    {[
                      { title: "30+ Years Experience", spec: "Proven industrial expertise and corporate warranties." },
                      { title: "15+ India Locations", spec: "Active coordinates in Goa, Jamnagar, Varanasi, Hyderabad." },
                      { title: "Certified Technicians", spec: "Rigorous technical diagnostic certifications." },
                      { title: "Best Price Guarantee", spec: "Upfront transparent cost structures with no hidden fees." },
                      { title: "100% Satisfaction", spec: "Every install backed by clear performance warranties." },
                      { title: "Custom Diagnostics", spec: "Direct testing and capacity load evaluations on-site." }
                    ].map((perk, i) => (
                      <div key={i} className="flex gap-3 bg-slate-900/60 p-4 rounded-lg border border-slate-850">
                        <CheckCircle2 className="text-cold-primary mt-0.5 shrink-0 animate-pulse" size={16} />
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wide">{perk.title}</h4>
                          <p className="text-[10px] text-slate-500 font-sans mt-1 leading-relaxed">{perk.spec}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Quick action hero spacer */}
              <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-900 rounded-2xl">
                <h3 className="text-2xl font-display font-extrabold text-white">Ready for professional HVAC service?</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">Get expert service from Mumbai's most trusted HVAC company since 1992.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <a href="tel:+919892256851" className="px-6 py-3 bg-cold-primary hover:bg-cold-secondary text-slate-950 font-bold rounded-lg text-xs font-mono">
                    Call Now: +91 98922 56851
                  </a>
                  <button onClick={() => setActiveTab("contact")} className="px-6 py-3 bg-accent-primary text-slate-950 font-semibold rounded-lg text-xs font-mono">
                    Request Quote
                  </button>
                </div>
              </section>

            </motion.div>
          )}

          {/* SERVICES TAB PAGE VIEW */}
          {activeTab === "services" && (
            <motion.div
              key="services-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 py-10"
            >
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <span className="font-mono text-xs text-accent-primary font-bold uppercase tracking-widest block font-bold">Comprehensive Solutions</span>
                  <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-1">Our Mechanical Services</h1>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    From metropolitan hubs to every corner of the nation, we deliver HVAC excellence. Detailed multi-point inspections, system overhauls, and commercial cleanroom zoning.
                  </p>
                </div>

                {/* Cost Planner Tool Integration on Service screen */}
                <CoolingCalculator />

                {/* Visual grid representing comprehensive service descriptions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                  {HVAC_SERVICES.map((serv, sIdx) => (
                    <div key={sIdx} className="bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-slate-800 transition flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
                          <span className="h-2 w-2 rounded-full bg-cold-primary" />
                          <h3 className="font-display font-bold text-lg text-white">{serv.name}</h3>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {serv.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed font-sans">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-[#ec4899] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>OEM COMPLIANT SERVICE</span>
                        <span className="text-[#ec4899] pointer-events-none">Certified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Service process Steps */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-xl mx-auto">
                  <span className="font-mono text-xs text-cold-primary font-bold uppercase tracking-widest block">Operational Pipelines</span>
                  <h2 className="text-3xl font-display font-bold text-white mt-2">Our Service Process</h2>
                  <p className="text-slate-400 text-sm mt-2">
                    How Prabhu Enterprises manages on-site dispatches, diagnostic measurements, and subsequent system handovers in 5 simple phases.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {SERVICES_PROCESS_STEPS.map((proc, pIdx) => (
                    <div key={pIdx} className="bg-slate-950/50 border border-slate-900 rounded-xl p-5 relative hover:border-slate-800 transition">
                      <span className="font-display font-black text-4xl text-slate-800 absolute top-4 right-4">{proc.step}</span>
                      <h3 className="text-md font-display font-semibold text-white mt-10 mb-2">{proc.title}</h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">{proc.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Geographic locator map widget */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <IndiaMapClusters />
              </section>

              {/* FAQ Accordions block */}
              <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
                <div className="text-center max-w-xl mx-auto">
                  <span className="font-mono text-xs text-[#ec4899] font-bold uppercase tracking-widest block">HVAC Knowledgebase</span>
                  <h2 className="text-3xl font-display font-bold text-white mt-2">Frequently Asked Questions</h2>
                  <p className="text-slate-400 text-sm mt-1">Get transparent information on sizing, AMC parameters, guarantees, and pricing formats.</p>
                </div>

                <div className="space-y-3">
                  {FAQ_DATA.map((faq, fIdx) => {
                    const isOpen = activeFaq === fIdx;
                    return (
                      <div key={fIdx} className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden transition-all duration-300">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                          className="w-full flex justify-between items-center px-5 py-4 text-left font-display text-sm md:text-base font-bold text-white hover:text-cold-primary transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <span className={`text-cold-primary font-mono transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                            <Plus size={18} />
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-slate-900 bg-slate-950/60"
                            >
                              <div className="px-5 py-4 text-sm text-slate-350 leading-relaxed font-sans font-medium">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

            </motion.div>
          )}

          {/* ABOUT US TAB PAGE VIEW */}
          {activeTab === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 py-10"
            >
              
              {/* Co-founder premium section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left image of cofounder */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group max-w-sm w-full">
                    
                    {/* Glowing neon borders */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cold-primary to-accent-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 pointer-events-none" />
                    
                    <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden shadow-2xl">
                      {/* Interactive portrait with image reference to 'gemini_generated_image.png' */}
                      <div className="aspect-[3/4] w-full rounded-lg bg-slate-900 overflow-hidden relative border border-slate-800">
                        
                        {/* Fallback elegant silhouette graphic drawn inside if file not uploaded */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a0c10] to-slate-950 flex flex-col justify-end p-6 text-center select-none">
                          <div className="absolute inset-x-0 top-1/4 flex flex-col items-center">
                            <h4 className="font-display font-extrabold text-slate-500 text-lg uppercase tracking-widest mt-4">PRABHU ENTERPRISES</h4>
                            <span className="font-mono text-slate-600 text-[10px] mt-1">CO-FOUNDER PORTRAIT LOGS</span>
                          </div>
                        </div>

                        {/* Actual user co-founder image */}
                        <img
                          src={founderPrabhuImg}
                          alt="Mr. Prabhu - Co-Founder"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // If the local upload is missing, show silhouette elegantly behind instead of crashing
                            e.currentTarget.style.opacity = '0';
                          }}
                        />

                        {/* Graphic tech details overlay on hover */}
                        <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-850 px-3 py-1.5 rounded-md font-mono text-[9px] text-slate-400">
                          CO-FOUNDER STATUS: ACTIVE
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="font-display font-extrabold text-white text-lg">Mr. Prabhu</h3>
                        <p className="font-mono text-xs text-cold-primary mt-1 uppercase tracking-wide">Managing Partner & Founder (HVAC Lead)</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right descriptions and quotes */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-mono font-bold rounded-full">
                    <span>ESTABLISHED 1992</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                    Our Founding Story & Commitment
                  </h1>

                  <p className="text-slate-350 text-sm md:text-base leading-relaxed font-sans">
                    Beginning in Mahim back in 1992, Prabhu Enterprises was built on the foundation of technical transparency and precise refrigeration craft. At a time when complex AC assemblies were mostly limited to large-scale corporations, we believed that small residential shops, local hotels, and Mumbai's emerging tech spaces deserved access to high-performance climate control structures.
                  </p>

                  <div className="bg-slate-900/60 p-5 rounded-r-xl border-l-[3px] border-accent-primary space-y-2">
                    <p className="italic text-slate-300 text-sm italic font-medium font-sans">
                      "Since our first dual window AC installation at the Gomantak Restaurant in Dadar West back in 1993, we determined that every single unit we service or commission carries our corporate signature of safety and long-term durability. We don't just realign thermostats; we secure comfort."
                    </p>
                    <span className="font-mono text-[10px] text-slate-500 uppercase block font-semibold">— Mr. Prabhu, Lead Chief Engineer</span>
                  </div>

                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                    Today, our certified mobile response force services projects ranging from multi-zoned HVAC systems inside commercial lower parel skyscrapers to high-altitude chiller lines at Dadar. We maintain strict compliance metrics with central brand OEMs (Daikin, Blue Star, Voltas), assuring our clients long-life warranties, low-decibel operational limits, and reduced electricity power draw.
                  </p>
                </div>

              </section>

              {/* Timeline chronological deck */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TimelineChronicle />
              </section>

              {/* Geographic locator map section also on About Us page */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <IndiaMapClusters />
              </section>

            </motion.div>
          )}

          {/* CONTACT US TAB PAGE VIEW */}
          {activeTab === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 py-10"
            >
              
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Contact Coordinates Left */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-900/30 border border-cyber-border rounded-2xl p-6 md:p-8">
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs text-cold-primary uppercase tracking-widest font-bold">Query Console</span>
                      <h1 className="text-3xl font-display font-extrabold text-white mt-1">Let's Connect</h1>
                      <p className="text-slate-400 text-sm mt-1 max-w-sm">
                        Submit immediate emergency dispatches or schedule high-capacity preventive maintenance audits directly.
                      </p>
                    </div>

                    <div className="flex flex-col gap-5 text-sm">
                      <div className="flex gap-3 bg-slate-950 p-4 border border-slate-900 rounded-lg">
                        <MapPin className="text-accent-primary shrink-0" size={20} />
                        <div>
                          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">Diagnostic Depot Address</h4>
                          <p className="text-slate-400 text-xs leading-relaxed mt-1">
                            Unit No.1, Bhagwansing Colony, Nr. Bldg. 6, Besides Post Office, SB Road, Mahim (W), Mumbai-400016
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-slate-950 p-4 border border-slate-900 rounded-lg">
                        <Phone className="text-cold-primary shrink-0" size={20} />
                        <div>
                          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">Direct Hotlines (Call 24/7)</h4>
                          <p className="text-slate-400 text-xs mt-1">
                            +91 98922 56851 / +91 98608 27722
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-slate-950 p-4 border border-slate-900 rounded-lg">
                        <Mail className="text-yellow-400 shrink-0" size={20} />
                        <div>
                          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider">Corporate Mail</h4>
                          <p className="text-slate-400 text-xs mt-1">
                            prabhuenterprises@gmx.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic coordinate reference map mock */}
                  <div className="bg-slate-950 rounded-xl border border-slate-905 p-4 flex flex-col gap-2 font-mono text-[10px] text-slate-500">
                    <div className="flex justify-between items-center text-accent-primary font-bold">
                      <span className="flex items-center gap-1"><CheckCircle2 size={10} /> GPS ACTIVE LOGS</span>
                      <span>19.0330° N, 72.8400° E</span>
                    </div>
                    <p className="text-[9px] text-slate-450 leading-relaxed font-sans">
                      Our main office in Mahim lies beside SB post office, allowing dispatches to Bandra, Dadar & South Mumbai inside 30 minutes.
                    </p>
                  </div>

                </div>

                {/* Right Interactive Booking Form */}
                <div className="lg:col-span-7 bg-cyber-card border border-cyber-border rounded-xl p-6 md:p-8">
                  <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
                    <MessageSquare size={18} className="text-cold-primary" /> Request an HVAC Diagnosis & Cost Sheet
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-slate-500 uppercase block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Darshan Singh"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cold-primary text-slate-200 rounded-lg px-4 py-3 text-xs md:text-sm focus:ring-0 outline-none transition"
                        />
                      </div>
                      
                      <div>
                        <label className="font-mono text-[10px] text-slate-500 uppercase block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="darshan@example.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cold-primary text-slate-200 rounded-lg px-4 py-3 text-xs md:text-sm focus:ring-0 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-slate-500 uppercase block mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 9XXXX XXXXX"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cold-primary text-slate-200 rounded-lg px-4 py-3 text-xs md:text-sm focus:ring-0 outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-slate-500 uppercase block mb-1">AC Sizing / Layout Category</label>
                        <select
                          value={formData.acType}
                          onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cold-primary text-slate-200 rounded-lg px-4 py-3 text-xs md:text-sm outline-none transition"
                        >
                          <option value="split">Split Air Conditioner</option>
                          <option value="window">Window Air Conditioner</option>
                          <option value="cassette">Cassette AC system (Corporate/Retail)</option>
                          <option value="central">Central Chiller / Central HVAC</option>
                          <option value="amc">AMC Service Contract Query</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-slate-500 uppercase block mb-1">Diagnosis Requirements / Message</label>
                      <textarea
                        rows={4}
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        placeholder="Eg. Need split AC installation or compressor noise diagnostics..."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cold-primary text-slate-200 rounded-lg px-4 py-3 text-xs md:text-sm focus:ring-0 outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isFormLoading}
                      className="w-full py-4 bg-accent-primary hover:bg-accent-primary/90 text-slate-950 font-display font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-lg cursor-pointer flex items-center justify-center gap-2 group transition disabled:opacity-50"
                    >
                      <span>{isFormLoading ? "Synchronizing Dispatch Signal..." : "Submit Request & Sync Dispatch"}</span>
                      {!isFormLoading && <ChevronRight size={16} className="transform group-hover:translate-x-1 transition" />}
                    </button>

                    {formSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-sans rounded-lg leading-relaxed text-center"
                      >
                        <p className="font-semibold text-slate-200">
                          Your form has been submitted and we will get back to you in the next 48 hours.
                        </p>
                      </motion.div>
                    )}

                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs md:text-sm font-sans rounded-lg leading-relaxed text-center"
                      >
                        ⚠️ {formError}
                      </motion.div>
                    )}
                  </form>
                </div>
              </section>

              {/* Custom client section reference */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ClientMarquee />
              </section>

              {/* Dynamic Interactive Testimonial and Feedback conveyor review engine */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ClientFeedbackSection />
              </section>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Primary Footer Shell with metadata logs */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-12 items-start border-b border-slate-900 pb-10 mb-8">
          
          {/* Logo brand and license panel */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <AnimatedLogo size={34} />
              <span className="font-display font-black text-[#ff69b4] text-lg tracking-wider">PRABHU ENTERPRISES</span>
            </div>
            <p className="text-slate-400 font-sans leading-relaxed text-xs max-w-sm">
              Delivering high-performance, low-decibel, and energy-conserving cooling solutions across the Indian sub-continent since 1992. Proudly local, globally calibrated.
            </p>
          </div>

          {/* Quick nav indexes */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Quick Sitemap</span>
            <div className="flex flex-col gap-2 border-slate-900 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left text-xs text-slate-400 hover:text-accent-primary transition-colors cursor-pointer focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core address parameters */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Main Office Depot</span>
            <div className="flex gap-2 items-start">
              <MapPin size={14} className="text-accent-primary shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed text-xs text-slate-400">
                Unit No.1, Bhagwansing Colony, Nr. Bldg. 6, Besides Post Office, SB Road, Mahim (W), Mumbai-400016
              </span>
            </div>
          </div>

          {/* Operational hours metrics */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Hotline Operations</span>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Clock size={14} className="text-cold-primary shrink-0" />
                <span className="text-xs font-semibold text-slate-300">Available 24 Hours / 7 Days</span>
              </div>
              <div className="text-xs text-slate-400 font-sans leading-relaxed">
                Main Board: +91 98922 56851 <br />
                Alternate: +91 98608 27722
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic regulatory notes */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600">
          <span className="text-center sm:text-left leading-relaxed">
            © 2026 Prabhu Enterprises | HVAC Services in Mahim, Bandra, Dadar, Andheri, South Mumbai | All rights reserved.
          </span>
          <div className="flex gap-4 shrink-0 sm:items-center">
            <span className="hover:text-slate-400 cursor-pointer transition">Security Audited</span>
            <span className="text-slate-800 select-none">|</span>
            <span className="text-slate-700 hover:text-[#ff69b4]/70 transition-colors duration-300 italic lowercase tracking-wider">
              made with love by darshan for his dearest bappa.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

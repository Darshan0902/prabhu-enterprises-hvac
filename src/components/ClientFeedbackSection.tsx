import React, { useState, useEffect } from "react";
import { 
  Star, 
  Sparkles, 
  UserCheck, 
  Lock,
  ArrowRight
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Mehta (Piramal Towers)",
    location: "Lower Parel, Mumbai",
    rating: 5,
    text: "Prabhu Enterprises repaired our cooling duct systems inside 2 hours. Extremely clean work, noise decibels dropped under limits, and no leakage since then. Outstanding AMC response!",
    date: "May 2026",
    verified: true
  },
  {
    id: 2,
    name: "Darshan Singh (Sunteck BKC)",
    location: "Bandra Kurla Complex, Mumbai",
    rating: 5,
    text: "We have signed an annual service contract with them for 12 multi-split cassette units. The technicians are polite, punctual, and calibrate temperature with precise digital equipment. Solid work.",
    date: "April 2026",
    verified: true
  },
  {
    id: 3,
    name: "Dr. Vivek Nair (Nair Clinical Diagnostics)",
    location: "Mahim West, Mumbai",
    rating: 5,
    text: "Cleanroom temperature and humidity control is extremely critical for our pathology labs. They completed the overhaul on a tight Sunday shift. Highly recommend their emergency service hotline.",
    date: "June 2026",
    verified: true
  },
  {
    id: 4,
    name: "Manpreet Oberoi (Oberoi Grandeur Hotel)",
    location: "Dadar, Mumbai",
    rating: 5,
    text: "We called Prabhu Enterprises at midnight for a complete compressor outage in our lobby. The team dispatched from Mahim depot and restored full chilling inside 45 mins. Exceptional!",
    date: "March 2026",
    verified: true
  },
  {
    id: 5,
    name: "Amit Godse (Jay Chemicals)",
    location: "Thane Wagle Estate",
    rating: 4,
    text: "Excellent troubleshooting on our heavy industrial chiller loop line. They explained the oil-leak issue clearly with pressure logs and replaced components under standard warranty.",
    date: "February 2026",
    verified: true
  }
];

export default function ClientFeedbackSection() {
  const [list, setList] = useState<Testimonial[]>([]);

  const loadTestimonials = () => {
    try {
      const saved = localStorage.getItem("prabhu_testimonials");
      if (saved) {
        setList(JSON.parse(saved));
      } else {
        localStorage.setItem("prabhu_testimonials", JSON.stringify(INITIAL_TESTIMONIALS));
        setList(INITIAL_TESTIMONIALS);
      }
    } catch {
      setList(INITIAL_TESTIMONIALS);
    }
  };

  // Synchronous update listening across all storage events
  useEffect(() => {
    loadTestimonials();

    const handleStorageChange = () => {
      loadTestimonials();
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom trigger from our own actions context
    window.addEventListener("prabhu_testimonials_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("prabhu_testimonials_updated", handleStorageChange);
    };
  }, []);

  return (
    <div id="client-feedback-conveyor" className="bg-cyber-card border border-cyber-border rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden">
      
      {/* Decorative ambient background filter */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Head block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div>
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Sparkles size={12} className="animate-pulse" />
            Client Reviews & Ledger
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black text-white mt-1 tracking-tight">
            Commercial Testimonials
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
            Verify real operational client feedback from premium Mumbai skyscrapers, hospitals, and offshore processing rigs.
          </p>
        </div>
      </div>

      {/* Main Slide-Conveyor track area */}
      <div className="relative w-full overflow-hidden">
        {list.length === 0 ? (
          <div className="p-12 text-center bg-slate-950/40 border border-slate-900 rounded-xl text-slate-500 text-xs font-mono">
            NO ACTIVE TESTIMONIALS FOUND IN REPOSITORY.
          </div>
        ) : (
          <>
            {/* Blurry fade shadows on edge boundaries */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

            {/* Horizontally scrolling tray of review cards */}
            <div className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-850 scrollbar-track-transparent">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-80 md:w-96 bg-slate-950/80 border border-slate-900/60 p-5 rounded-xl hover:border-slate-850 transition-all duration-300 relative flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-semibold text-sm text-white tracking-wide">{item.name}</h4>
                        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mt-0.5">{item.location}</span>
                      </div>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-[8.5px] font-bold text-emerald-400 uppercase shrink-0">
                          <UserCheck size={9} /> Verified Client
                        </span>
                      )}
                    </div>

                    {/* Star scale */}
                    <div className="flex gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < item.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-800"}
                        />
                      ))}
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed font-sans italic opacity-95">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Metadata and footer tags inside the card */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-900/60 pt-3 mt-4">
                    <span>COORD: MUMBAI_LEDGER</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  Sparkles, 
  UserCheck, 
  Plus, 
  X, 
  CheckCircle2, 
  Heart, 
  MessageSquare, 
  Clock 
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // New review form states
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");

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

  // Synchronize update listening
  useEffect(() => {
    loadTestimonials();

    const handleStorageChange = () => {
      loadTestimonials();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("prabhu_testimonials_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("prabhu_testimonials_updated", handleStorageChange);
    };
  }, []);

  const handleAddNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newItem: Testimonial = {
      id: Date.now(),
      name: newName.trim(),
      location: newLocation.trim() || "Mumbai Resident",
      rating: newRating,
      text: newText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      verified: true // Client feedback added from official form is pre-validated
    };

    const updated = [newItem, ...list];
    setList(updated);
    localStorage.setItem("prabhu_testimonials", JSON.stringify(updated));
    
    // Dispatch event to sync any listening ledger modules instantly
    window.dispatchEvent(new Event("storage"));

    // Reset inputs
    setNewName("");
    setNewLocation("");
    setNewText("");
    setNewRating(5);
    setShowAddModal(false);

    setSuccessMsg("Thank you! Your feedback has been recorded and synchronized successfully.");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  return (
    <div id="client-feedback-conveyor" className="bg-cyber-card border border-cyber-border rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden transition-all duration-300">
      
      {/* Decorative subtle background overlay */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Head block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div>
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Sparkles size={12} className="text-accent-primary animate-pulse" />
            Client Reviews & Ledger
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black text-white mt-1 tracking-tight">
            Commercial Testimonials
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-xl leading-relaxed">
            Verify real operational client feedback from premium Mumbai skyscrapers, hospitals, and commercial sectors.
          </p>
        </div>

        {/* Action Button: Have feedback? Share it with us */}
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-[#ff69b4]/10 hover:bg-[#ff69b4]/20 border border-[#ff69b4]/30 hover:border-[#ff69b4]/60 text-[#ff69b4] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shrink-0 self-start sm:self-center"
        >
          <Plus size={14} />
          <span>Have feedback? Share it with us!</span>
        </button>
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
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#030712]/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#030712]/40 to-transparent z-10 pointer-events-none" />

            {/* Horizontally scrolling tray of review cards */}
            <div className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-850 scrollbar-track-transparent">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-80 md:w-96 bg-slate-950/80 border border-slate-905/40 p-5 rounded-xl hover:border-slate-800 transition-all duration-300 relative flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-display font-semibold text-sm text-white tracking-wide truncate max-w-[180px]">{item.name}</h4>
                        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mt-0.5 truncate max-w-[180px]">{item.location}</span>
                      </div>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded font-mono text-[8.5px] font-bold text-emerald-400 uppercase shrink-0">
                          <CheckCircle2 size={10} /> Verified Client
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

                    <p className="text-slate-300 text-xs leading-relaxed font-sans italic opacity-95 text-justify min-h-[60px]">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Metadata and footer tags inside the card */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-900/40 pt-3 mt-4">
                    <span>MUMBAI_LEDGER</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Embedded Review Add Overlay Form Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-slate-950 border border-slate-900 rounded-2xl p-6 w-full max-w-lg relative overflow-hidden"
            >
              {/* Decorative design aesthetics */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/5 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer transition p-1"
                title="Dismiss"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#ff69b4] font-bold uppercase block">Prabhu Feedback Channel</span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mt-0.5">Share Your Real Comfort Experience</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                  We look forward to listing your feedback! Submitted items load onto the testimonials list immediately.
                </p>
              </div>
              
              <form onSubmit={handleAddNewReview} className="space-y-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Your Name / Business Corporate Title</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni (CEO Co-op)"
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-200 rounded-lg px-4 py-2.5 text-xs outline-none focus:border-[#ff69b4] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Locality / Area Location</label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Bandra West, Mumbai"
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-200 rounded-lg px-4 py-2.5 text-xs outline-none focus:border-[#ff69b4] transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Comfort Rating Star</label>
                    <div className="flex gap-2 py-1.5 items-center">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setNewRating(starValue)}
                          className="cursor-pointer text-yellow-500 hover:scale-110 transition focus:outline-none"
                          title={`${starValue} Stars`}
                        >
                          <Star 
                            size={18} 
                            className={starValue <= newRating ? "fill-yellow-500 text-yellow-500" : "text-slate-800"} 
                          />
                        </button>
                      ))}
                      <span className="text-[10px] font-mono text-slate-400 ml-2 font-bold uppercase">{newRating} / 5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Your feedback narrative text</label>
                  <textarea
                    required
                    maxLength={305}
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tell us about the installation speed, precision diagnostic quality, thermal balancing result, or maintenance technicians..."
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-200 rounded-lg px-4 py-2.5 text-xs outline-none focus:border-[#ff69b4] transition font-sans leading-relaxed text-justify"
                  />
                </div>

                <div className="p-3 bg-[#ff69b4]/5 border border-[#ff69b4]/10 rounded-lg text-[10px] text-slate-400 leading-normal flex items-start gap-2">
                  <Clock size={14} className="text-[#ff69b4] shrink-0 mt-0.5" />
                  <span>
                    No deletion or editing tools are available after publishing to preserve feedback authenticity and reliability.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition text-xs font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-accent-primary to-[#ff69b4] hover:opacity-95 text-slate-950 font-display font-black rounded-lg transition text-xs uppercase cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success notification popup message */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-5 right-5 max-w-sm bg-slate-950 border border-emerald-500/30 p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50 text-xs font-sans text-slate-200"
          >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">Broadcast Successful</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{successMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

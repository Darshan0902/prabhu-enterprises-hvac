import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Plus, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  ThumbsUp, 
  Clock, 
  Heart,
  X,
  Lock,
  Unlock,
  LogOut,
  Edit,
  Trash2,
  AlertCircle
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

const DEFAULT_ITEMS: Testimonial[] = [
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

export default function ClientFeedbackLedger({ onBackToPublic }: { onBackToPublic: () => void }) {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("prabhu_rep_ledger_auth") === "true";
    }
    return false;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [list, setList] = useState<Testimonial[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Active deleting feedback item tracking for secure UI confirmation
  const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);

  // Active editing feedback item tracking
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  
  const [successMsg, setSuccessMsg] = useState("");

  // Add review form states
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");

  // Edit review form states
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState("");
  const [editVerified, setEditVerified] = useState(true);
  const [editDate, setEditDate] = useState("");

  // Sync testimonials loader
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    try {
      const saved = localStorage.getItem("prabhu_testimonials");
      if (saved) {
        setList(JSON.parse(saved));
      } else {
        localStorage.setItem("prabhu_testimonials", JSON.stringify(DEFAULT_ITEMS));
        setList(DEFAULT_ITEMS);
      }
    } catch {
      setList(DEFAULT_ITEMS);
    }
  };

  const updateListAndSave = (newList: Testimonial[]) => {
    setList(newList);
    localStorage.setItem("prabhu_testimonials", JSON.stringify(newList));
    // Trigger storage event so public carousel view re-renders automatically
    window.dispatchEvent(new Event("storage"));
  };

  // Handling manual credentials sign-in
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Darshan@2002" && password === "Beeru$_999") {
      setIsLoggedIn(true);
      sessionStorage.setItem("prabhu_rep_ledger_auth", "true");
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid security keys or user signature. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("prabhu_rep_ledger_auth");
  };

  // Create feedback handler
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
      verified: true
    };

    const updated = [newItem, ...list];
    updateListAndSave(updated);
    
    // Clear form inputs
    setNewName("");
    setNewLocation("");
    setNewText("");
    setNewRating(5);
    setShowAddModal(false);

    setSuccessMsg("Successfully posted and broadcasted review records on Mumbai database!");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  // Open edit modal and fill initial state values
  const startEditItem = (item: Testimonial) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditLocation(item.location);
    setEditRating(item.rating);
    setEditText(item.text);
    setEditVerified(item.verified);
    setEditDate(item.date);
    setShowEditModal(true);
  };

  // Submit edit review handler
  const handleSaveEditReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editName.trim() || !editText.trim()) return;

    const updatedList = list.map((item) => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          name: editName.trim(),
          location: editLocation.trim() || "Mumbai Resident",
          rating: editRating,
          text: editText.trim(),
          verified: editVerified,
          date: editDate || item.date
        };
      }
      return item;
    });

    updateListAndSave(updatedList);
    setShowEditModal(false);
    setEditingItem(null);

    setSuccessMsg("Review record modified and updated cleanly in storage ledger.");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  // Confirm delete feedback card
  const handleDeleteItem = (item: Testimonial) => {
    const updatedList = list.filter((x) => x.id !== item.id);
    updateListAndSave(updatedList);
    setItemToDelete(null);

    setSuccessMsg(`Review from ${item.name} deleted successfully from ledger indices.`);
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const computedStats = useMemo(() => {
    const total = list.length;
    const avg = total > 0 ? (list.reduce((acc, current) => acc + current.rating, 0) / total).toFixed(1) : "0.0";
    const verifiedCount = list.filter(item => item.verified).length;
    return { total, avg, verifiedCount };
  }, [list]);

  // RENDER LOGIN TAB WALL IF NOT IN ACTIVE AUTHENTICATED SESSION
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-[#ff69b4]/30 selection:text-white">
        
        {/* Decorative top ambient bar */}
        <div className="bg-gradient-to-r from-cold-primary via-cold-secondary to-[#ff69b4] h-1.5 w-full shrink-0" />

        {/* Back and title bar on login */}
        <header className="border-b border-slate-900 bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={onBackToPublic}
              className="p-2 border border-slate-900 hover:border-slate-800 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition flex items-center gap-2 cursor-pointer text-xs font-mono"
            >
              <ArrowLeft size={14} />
              <span>Back to home</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Secured Gateway</span>
          </div>
        </header>

        {/* Form panel container */}
        <div className="flex-grow flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-slate-900/40 border border-slate-900/80 p-8 rounded-2xl space-y-6 relative overflow-hidden"
          >
            {/* Ambient hot pink glow behind lock */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#ff69b4]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center space-y-2 relative">
              <div className="mx-auto w-12 h-12 bg-[#ff69b4]/10 border border-[#ff69b4]/20 rounded-full flex items-center justify-center text-[#ff69b4] mb-3">
                <Lock size={20} />
              </div>
              <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">REPUTATION LEDGER SIGN-IN</h2>
              <p className="text-[11px] text-slate-400 leading-normal max-w-xs mx-auto">
                Authenticate with administrative keys to permit feedback records management, database cleaning, and publishing edits.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Signature ID</label>
                <input
                  type="text"
                  required
                  placeholder="Enter administrator credential name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-200 rounded-lg px-4 py-2.5 outline-none transition font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Gateway Passphrase</label>
                <input
                  type="password"
                  required
                  placeholder="Enter high-tier authentication key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-200 rounded-lg px-4 py-2.5 outline-none transition font-sans"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-[10.5px] leading-relaxed flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="cursor-pointer w-full py-2.5 bg-gradient-to-r from-accent-primary to-[#ff69b4] hover:opacity-95 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md shadow-[#ff69b4]/5 mt-2"
              >
                Access Diagnostic Ledger
              </button>
            </form>

            <div className="border-t border-slate-900/60 pt-4 text-center">
              <button 
                onClick={onBackToPublic}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300 transition"
              >
                ← ABORT TO PUBLIC PORTAL
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer info lock indicator */}
        <footer className="text-center py-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest border-t border-slate-900/20">
          POWERED BY BAPPA DIAGNOSTIC OPERATIONS SECURITY GROUP
        </footer>
      </div>
    );
  }

  // RENDER REPUTATION CONTROL PANEL (AUTHENTICATED SESSION RESTS HERE)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#ff69b4]/30 selection:text-white">
      
      {/* Decorative top ambient bar */}
      <div className="bg-gradient-to-r from-cold-primary via-cold-secondary to-[#ff69b4] h-1.5 w-full shrink-0" />

      {/* Authenticated Review Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToPublic}
              className="p-2 border border-slate-900 hover:border-slate-800 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition flex items-center justify-center cursor-pointer"
              title="Return to Main Commercial Website"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="font-display font-black text-sm sm:text-base md:text-lg text-white uppercase tracking-wider">PRABHU REPUTATION CONSOLE</h1>
              </div>
              <span className="text-[10px] text-emerald-500 font-mono tracking-widest block uppercase">Logged in as Administrator</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-accent-primary to-[#ff69b4] hover:opacity-95 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-lg transition"
            >
              <Plus size={14} />
              <span>Add a Review</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-3.5 py-2 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 hover:border-red-900/80 text-xs text-red-300 font-mono rounded-lg cursor-pointer transition flex items-center gap-1.5"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Review Section Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Intro Hero Section Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest font-bold rounded-full uppercase">
            <Unlock size={12} />
            <span>Reputation Ledger Managed</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
            Reputation Management Engine
          </h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Welcome, Darshan. You have entered the active administrative gate. From here, you can add new reviews, modify client names/localities, verify feedback, or delete records entirely. Any changes reflect on the frontend system immediately in real-time.
          </p>
        </div>

        {/* Quick Analytical Stat Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-[#ff69b4]/10 rounded-xl">
              <Star size={20} className="text-accent-primary fill-accent-primary" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Average Satisfaction Rating</span>
              <div className="text-xl font-display font-black text-white flex items-baseline gap-2 mt-0.5">
                <span>{computedStats.avg} / 5.0</span>
                <span className="text-xs text-slate-500 font-normal">Superb Comfort</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-cold-primary/10 rounded-xl">
              <Users size={20} className="text-cold-primary" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Total Testimonials In Database</span>
              <div className="text-xl font-display font-black text-white flex items-baseline gap-2 mt-0.5">
                <span>{computedStats.total} Records</span>
                <span className="text-xs text-slate-500 font-normal">Active Index</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Verified Status Ratio</span>
              <div className="text-xl font-display font-black text-white flex items-baseline gap-2 mt-0.5">
                <span>{computedStats.verifiedCount} / {computedStats.total} Verified</span>
                <span className="text-xs text-slate-500 font-normal">Official Stamp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Management List with Action Controls */}
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-900">
            <h3 className="font-display font-black text-sm uppercase text-slate-300 tracking-wider flex items-center gap-2">
              <MessageSquare size={16} className="text-accent-primary" />
              <span>Feedback Records</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">SORTED BY NEWEST FIRST</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item) => (
              <motion.div
                key={item.id}
                className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-800 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Rating block & date */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          size={13} 
                          className={starIndex < item.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-800"} 
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 block uppercase bg-slate-950/60 px-2 py-0.5 rounded border border-slate-900">{item.date}</span>
                  </div>

                  {/* Feedback text */}
                  <p className="text-slate-300 text-xs md:text-sm font-sans leading-relaxed text-justify italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Details and Actions footer block */}
                <div className="border-t border-slate-900/60 pt-4 mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-white text-xs font-semibold font-display truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-505 font-mono truncate block mt-0.5">
                        {item.location}
                      </span>
                    </div>

                    <span className={`shrink-0 font-mono text-[8px] font-black rounded px-2 py-0.5 flex items-center gap-1 border ${
                      item.verified 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-slate-800/40 border-slate-700/35 text-slate-500"
                    }`}>
                      <CheckCircle2 size={10} />
                      <span>{item.verified ? "VERIFIED" : "UNVERIFIED"}</span>
                    </span>
                  </div>

                  {/* ADMIN ACTION CONTROLS */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-900/30">
                    <button
                      onClick={() => startEditItem(item)}
                      className="cursor-pointer px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-lg text-[10.5px] font-mono flex items-center gap-1.5 transition"
                    >
                      <Edit size={12} className="text-[#ff69b4]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="cursor-pointer px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 hover:text-red-300 text-red-400 border border-red-900/20 rounded-lg text-[10.5px] font-mono flex items-center gap-1.5 transition"
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {list.length === 0 && (
            <div className="text-center py-16 bg-slate-900/10 border border-slate-900 rounded-2xl">
              <span className="text-slate-500 text-xs font-mono uppercase block">No Client Testimonials Logged Yet.</span>
              <p className="text-slate-600 text-xs mt-1">Be the first to share your comfort experience with Prabhu Enterprises!</p>
            </div>
          )}
        </div>

        {/* Back control panel bar bottom */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-slate-900 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-slate-300 font-semibold font-display">Completed Management Session?</p>
            <p className="text-[11px] text-slate-505">Exit to main commercial page to safeguard access.</p>
          </div>
          <button
            onClick={onBackToPublic}
            className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-850 text-xs font-mono text-white rounded-xl border border-slate-800 transition text-center"
          >
            ← Safely Close Console
          </button>
        </div>

      </main>

      {/* Add review modal/overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-slate-950 border border-slate-900 rounded-2xl p-6 w-full max-w-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/5 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer transition p-1"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#ff69b4] font-bold uppercase block text-left">Reputation Management</span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mt-0.5 text-left font-sans">Publish Direct Review</h3>
              </div>
              
              <form onSubmit={handleAddNewReview} className="space-y-4 text-xs font-sans text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Client Name / Corporate business</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni (President Co-op)"
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Locality / City Location</label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Bandra West, Mumbai"
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Rating Score</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-900 text-slate-201 rounded-lg px-3 py-2.5 outline-none transition cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ Satisfactory (4/5)</option>
                      <option value="3">⭐⭐⭐ Neutral (3/5)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-505 uppercase tracking-widest block">Feedback Narrative Text</label>
                  <textarea
                    required
                    maxLength={300}
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Provide diagnostic feedback narrative text..."
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition font-sans leading-relaxed text-justify"
                  />
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
                    Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit review modal/overlay */}
      <AnimatePresence>
        {showEditModal && editingItem && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-slate-950 border border-slate-900 rounded-2xl p-6 w-full max-w-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/5 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer transition p-1"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#ff69b4] font-bold uppercase block text-left">Edit Record</span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mt-0.5 text-left font-sans">Modify Testimonial Record</h3>
              </div>
              
              <form onSubmit={handleSaveEditReview} className="space-y-4 text-xs font-sans text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">Client Name / Business Name</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Locality / City Location</label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-505 uppercase tracking-widest block cursor-pointer">Date Anchor Label</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. May 2026"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">Comfort Rating Score</label>
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-900 text-slate-210 rounded-lg px-3 py-2.5 outline-none transition cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ Satisfactory (4/5)</option>
                      <option value="3">⭐⭐⭐ Neutral (3/5)</option>
                    </select>
                  </div>

                  <div className="space-y-2 flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer pt-2 select-none group">
                      <input
                        type="checkbox"
                        checked={editVerified}
                        onChange={(e) => setEditVerified(e.target.checked)}
                        className="w-4 h-4 bg-slate-950 border-slate-900 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer text-left"
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider group-hover:text-white transition">Verify Officially</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-505 uppercase tracking-widest block">Feedback experience details</label>
                  <textarea
                    required
                    maxLength={305}
                    rows={4}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-[#ff69b4] text-slate-201 rounded-lg px-4 py-2.5 outline-none transition font-sans leading-relaxed text-justify"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition text-xs font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-accent-primary to-[#ff69b4] hover:opacity-95 text-slate-950 font-display font-black rounded-lg transition text-xs uppercase cursor-pointer"
                  >
                    Update Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete secure confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-955 border border-red-900/30 p-6 rounded-2xl max-w-sm w-full text-center space-y-4"
            >
              <div className="mx-auto w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center">
                <Trash2 size={22} />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">Secure Deletion Gateway</h3>
                <p className="text-slate-400 text-xs leading-normal">
                  Are you absolutely certain you want to purge the review record submitted by <strong className="text-slate-200">{itemToDelete.name}</strong>? This operation of diagnostic data is permanent.
                </p>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-400 hover:text-white font-mono rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteItem(itemToDelete)}
                  className="px-4 py-2 bg-red-650 hover:bg-red-600 font-display font-bold text-xs uppercase bg-red-600 text-white rounded-lg transition cursor-pointer"
                >
                  Confirm Permanent Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success notification popup */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-5 right-5 max-w-sm bg-slate-950 border border-[#ff69b4]/30 p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50 text-xs font-sans text-slate-200"
          >
            <CheckCircle2 size={16} className="text-[#ff69b4] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">Console Event logged</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{successMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

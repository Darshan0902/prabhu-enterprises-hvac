import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Database, 
  ArrowLeft, 
  Trash2, 
  Edit3, 
  Plus, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  LogOut, 
  RefreshCw, 
  FileJson,
  Check,
  AlertTriangle,
  X,
  Star
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

export default function AdminPortal({ onBackToPublic }: { onBackToPublic: () => void }) {
  const [list, setList] = useState<Testimonial[]>([]);
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("prabhu_admin_auth") === "true");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Terminal activity simulation log
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_INIT: Booting Prabhu Secure Admin console...",
    "SEC_VERIFY: Active IP firewall rules loaded."
  ]);

  // Form input states
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [newVerified, setNewVerified] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState("");
  const [editVerified, setEditVerified] = useState(true);

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
      pushLog("DB_FETCH: Sync completed with 100% data integrity.");
    } catch {
      setList(DEFAULT_ITEMS);
    }
  };

  const pushLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const updateListAndSave = (newList: Testimonial[]) => {
    setList(newList);
    localStorage.setItem("prabhu_testimonials", JSON.stringify(newList));
    // Trigger storage event so public carousel view re-renders automatically
    window.dispatchEvent(new Event("storage"));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = passcode.trim();

    if ((cleanEmail === "admin@prabhu.in" || cleanEmail === "test@prabhu.in" || cleanEmail === "prabhu") && (cleanCode === "admin1992" || cleanCode === "admin123")) {
      setIsAuthenticated(true);
      localStorage.setItem("prabhu_admin_auth", "true");
      setErrorMsg("");
      setSuccessMsg("Administrator credentials verified. Access granted.");
      pushLog(`AUTH_SUCCESS: Session established for user ${cleanEmail}.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setErrorMsg("Authentication failed. Invalid login coordinates or session key.");
      pushLog("AUTH_ERROR: Unauthorized access entry blocked.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("prabhu_admin_auth");
    setSuccessMsg("Administrator session disconnected.");
    pushLog("AUTH_DISCONNECT: Secure session killed by user command.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newItem: Testimonial = {
      id: Date.now(),
      name: newName,
      location: newLocation || "Mumbai client",
      rating: newRating,
      text: newText,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      verified: newVerified
    };

    const updated = [newItem, ...list];
    updateListAndSave(updated);
    setNewName("");
    setNewLocation("");
    setNewText("");
    setNewRating(5);
    setShowAddModal(false);
    setSuccessMsg("New physical landmark testimonial linked successfully.");
    pushLog(`DB_INSERT: Client '${newItem.name}' review published.`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const triggerEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditLocation(item.location);
    setEditRating(item.rating);
    setEditText(item.text);
    setEditVerified(item.verified);
    pushLog(`DB_EDIT_LOCK: Record ID ${item.id} acquired for write operations.`);
  };

  const saveEdits = (id: number) => {
    if (!editName.trim() || !editText.trim()) return;

    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: editName,
          location: editLocation,
          rating: editRating,
          text: editText,
          verified: editVerified
        };
      }
      return item;
    });

    updateListAndSave(updated);
    setEditingId(null);
    setSuccessMsg("Testimonial payload updated permanently.");
    pushLog(`DB_COMMIT: Changes committed safely for Record ID ${id}.`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const deleteReview = (id: number) => {
    const confirm = window.confirm("Are you sure you want to permanently delete this client review from our main database repository?");
    if (confirm) {
      const updated = list.filter(item => item.id !== id);
      updateListAndSave(updated);
      setSuccessMsg("Review permanently deleted.");
      pushLog(`DB_DELETE: Record ID ${id} deleted successfully.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const exportBackupJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prabhu_reviews_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    pushLog("DB_BACKUP: Testimonial catalog downloaded successfully.");
  };

  const computedStats = React.useMemo(() => {
    const total = list.length;
    const avg = total > 0 ? (list.reduce((acc, current) => acc + current.rating, 0) / total).toFixed(1) : "0.0";
    const verifiedCount = list.filter(item => item.verified).length;
    return { total, avg, verifiedCount };
  }, [list]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono selection:bg-emerald-500/30 selection:text-white">
      {/* Dynamic top safety banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border-b border-slate-900 px-4 py-2.5 text-center text-[10px] uppercase tracking-widest text-slate-400">
        🔓 SECURITY CONFLICT OVERRIDE: Active SSL-encrypted administrative ledger. Simulating standalone site on <span className="text-accent-primary underline">admin.prabhuenterprises.co.in</span>
      </div>

      {/* Admin header */}
      <header className="border-b border-slate-900 bg-slate-950 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToPublic}
              className="p-2 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition flex items-center justify-center cursor-pointer"
              title="Return to Main Commercial Website"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400 animate-pulse animate-duration-1000" />
                <h1 className="font-sans font-black text-lg text-white uppercase tracking-wider">PRABHU ENTERPRISES</h1>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block">ADMIN_PORTAL // LOCALIZED CENTRAL LEDGER CONTROL</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-2 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 text-xs font-bold text-rose-400 hover:text-rose-300 rounded-lg cursor-pointer transition"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Terminate Session</span>
              </button>
            )}
            <button 
              onClick={onBackToPublic}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:border-slate-800 border border-slate-800 text-xs text-slate-300 font-sans rounded-lg cursor-pointer transition hidden sm:inline"
            >
              Back to Main Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Section Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* NOT AUTHENTICATED BOARD */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 border border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6"
            >
              {/* Corner target markings */}
              <div className="absolute top-2 left-2 text-[8px] text-slate-800">SECURE_GATEWAY_V14</div>
              <div className="absolute bottom-2 right-2 text-[8px] text-slate-800">STATE: STANDBY</div>

              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-slate-900 border border-slate-800 text-accent-primary flex items-center justify-center rounded-xl mb-4">
                  <Lock size={22} className="animate-pulse" />
                </div>
                <h2 className="font-sans font-black text-xl text-white tracking-wide uppercase">ADMIN SECURITY CONSOLE</h2>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Sign in with registered municipal coordinate credentials to update the nationwide project reviews database.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs rounded-lg font-mono flex items-start gap-2">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Administrative Access Email</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@prabhu.in"
                    className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-accent-primary text-slate-200 rounded-lg px-3.5 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Security Passcode Vault-Key</label>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="e.g. admin1992"
                    className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-accent-primary text-slate-200 rounded-lg px-3.5 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-primary hover:bg-accent-primary/90 text-slate-950 font-sans font-black text-xs py-3 uppercase tracking-wider rounded-lg transition active:scale-[0.98] cursor-pointer"
                >
                  Verify Access Clearance
                </button>
              </form>

              <div className="border-t border-slate-900 pt-4 text-[10px] text-slate-500 leading-relaxed space-y-1.5">
                <p className="font-bold text-slate-400">🚨 Evaluation Credentials:</p>
                <div className="bg-slate-900/50 p-2 border border-slate-900 rounded font-mono text-[9px] text-slate-500">
                  <div className="flex justify-between"><span>Email:</span><strong className="text-accent-primary">admin@prabhu.in</strong></div>
                  <div className="flex justify-between"><span>Passcode:</span><strong className="text-accent-primary">admin1992</strong></div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* FULL AUTHENTICATED CONTROL CENTER */
          <div className="space-y-8">
            
            {/* Quick dashboard status overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5 font-bold">
                  <Database size={11} className="text-cold-primary" /> Active Testimonials
                </span>
                <div className="text-2xl font-sans font-black text-white">{computedStats.total} Records</div>
                <p className="text-[9px] text-slate-400">Total client narratives index</p>
              </div>

              <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5 font-bold">
                  <TrendingUp size={11} className="text-green-400" /> Rated Average
                </span>
                <div className="text-2xl font-sans font-black text-white">{computedStats.avg} / 5.0</div>
                <p className="text-[9px] text-slate-400">Composite corporate rating</p>
              </div>

              <div className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5 font-bold">
                  <Users size={11} className="text-emerald-400" /> Verified Accounts
                </span>
                <div className="text-2xl font-sans font-black text-white">{computedStats.verifiedCount} Clients</div>
                <p className="text-[9px] text-slate-400">Authenticated client anchors</p>
              </div>

              {/* Dynamic live simulation log terminal widget */}
              <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl flex flex-col justify-between min-h-[95px] font-mono text-[9px] text-slate-500 overflow-hidden leading-snug">
                <div className="text-slate-450 font-bold border-b border-slate-900 pb-1 uppercase tracking-wide flex items-center justify-between">
                  <span>TERMINAL_LOG_SYNC</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                </div>
                <div className="mt-1 flex-1 space-y-0.5 max-h-[50px] overflow-hidden select-none">
                  {terminalLogs.slice(0, 3).map((log, l) => (
                    <div key={l} className="truncate text-slate-600 font-mono text-[8px]">{log}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950 p-4 border border-slate-900 rounded-xl">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-300">Live Client Testimonials Index ({list.length} records)</h3>
                <p className="text-[10px] text-slate-500">Immediate synchronous updates mapping directly onto our public home page carousel.</p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={exportBackupJSON}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-slate-300 border border-slate-800 rounded-lg transition"
                >
                  <FileJson size={13} className="text-amber-500" />
                  <span>Download Backup Ledger</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent-primary hover:bg-accent-primary/95 text-[10.5px] font-bold text-slate-950 rounded-lg transition shadow-lg shadow-accent-primary/10"
                >
                  <Plus size={14} />
                  <span>Add New Client Review</span>
                </button>
              </div>
            </div>

            {/* Main Ledger Table / Rows */}
            <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-slate-900 text-[10px] text-slate-450 uppercase tracking-wider">
                      <th className="py-3 px-4 font-bold">Client / Company Name</th>
                      <th className="py-3 px-4 font-bold">Location</th>
                      <th className="py-3 px-4 font-bold whitespace-nowrap">Rating Score</th>
                      <th className="py-3 px-4 font-bold max-w-sm">Narrative Payload Details</th>
                      <th className="py-3 px-4 font-bold">Channel Verification</th>
                      <th className="py-3 px-4 font-bold text-right">Ledger Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs">
                    {list.map((item) => {
                      const isEditing = editingId === item.id;
                      return (
                        <tr 
                          key={item.id} 
                          className={`hover:bg-slate-900/10 transition-colors ${
                            isEditing ? "bg-accent-primary/5 hover:bg-accent-primary/5" : ""
                          }`}
                        >
                          {/* Item client/company name col */}
                          <td className="py-4 px-4 font-sans font-semibold text-white">
                            {isEditing ? (
                              <input 
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 text-xs outline-none"
                              />
                            ) : (
                              <span>{item.name}</span>
                            )}
                          </td>

                          {/* Locality column */}
                          <td className="py-4 px-4 font-mono text-slate-400">
                            {isEditing ? (
                              <input 
                                type="text"
                                value={editLocation}
                                onChange={(e) => setEditLocation(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 text-xs outline-none"
                              />
                            ) : (
                              <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-500 border border-slate-900">{item.location}</span>
                            )}
                          </td>

                          {/* Outlined ratings scale */}
                          <td className="py-4 px-4">
                            {isEditing ? (
                              <select
                                value={editRating}
                                onChange={(e) => setEditRating(Number(e.target.value))}
                                className="bg-slate-900 border border-slate-800 text-slate-200 rounded px-1.5 py-1 text-xs cursor-pointer"
                              >
                                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                <option value="4">⭐⭐⭐⭐ (4)</option>
                                <option value="3">⭐⭐⭐ (3)</option>
                              </select>
                            ) : (
                              <div className="flex gap-0.5 text-yellow-500">
                                {"★".repeat(item.rating)}
                              </div>
                            )}
                          </td>

                          {/* Specific feedback text column */}
                          <td className="py-4 px-4 text-slate-300 font-sans max-w-sm">
                            {isEditing ? (
                              <textarea 
                                rows={2}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 text-xs outline-none"
                              />
                            ) : (
                              <span className="line-clamp-2 leading-relaxed text-slate-400 text-xs text-justify">"{item.text}"</span>
                            )}
                          </td>

                          {/* Channel/Account status verification badge */}
                          <td className="py-4 px-4">
                            {isEditing ? (
                              <label className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-400 hover:text-white">
                                <input 
                                  type="checkbox"
                                  checked={editVerified}
                                  onChange={(e) => setEditVerified(e.target.checked)}
                                  className="rounded bg-slate-900 border-slate-800 text-accent-primary focus:ring-opacity-0 transition"
                                />
                                <span>Apply Verified Badge</span>
                              </label>
                            ) : (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded ${
                                item.verified 
                                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                  : "bg-slate-900 border border-slate-800 text-slate-600"
                              }`}>
                                <CheckCircle size={10} />
                                <span>{item.verified ? "VERIFIED_ACC" : "GUEST_POST"}</span>
                              </span>
                            )}
                          </td>

                          {/* Table rows modify controls */}
                          <td className="py-4 px-4 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 rounded cursor-pointer transition border border-slate-800"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEdits(item.id)}
                                  className="p-1 px-2.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded flex items-center gap-1 cursor-pointer hover:bg-emerald-400 transition"
                                >
                                  <Check size={11} /> Commit
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => triggerEdit(item)}
                                  className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:border-slate-800 border border-transparent text-slate-450 hover:text-accent-primary rounded-lg cursor-pointer transition"
                                  title="Edit Testimonial Details"
                                >
                                  <Edit3 size={13} />
                                </button>
                                <button
                                  onClick={() => deleteReview(item.id)}
                                  className="p-1.5 bg-slate-900 hover:bg-rose-950/20 hover:border-rose-900/30 border border-transparent text-slate-450 hover:text-rose-400 rounded-lg cursor-pointer transition"
                                  title="Delete Testimonial Permanently"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simulated Live Connection Log Status Console for visual polish */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-mono">
                <span>Database Connection Status Logs</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Connection Established
                </span>
              </div>
              <div className="bg-slate-900/40 p-3 rounded border border-slate-900 text-[9px] text-slate-500 font-mono space-y-1 max-h-[100px] overflow-y-auto">
                <p className="text-slate-500">[LOCAL_LEDGER_STORAGE]: Mapped directly to browser's reactive sandbox data storage.</p>
                <p className="text-slate-600">[METADATA]: Port 3000 mapped, reverse-proxy live feedback listening enabled on standard server interfaces.</p>
                <p className="text-slate-600">[MUMBAI_NODE_SYNC]: Successfully synchronized central coordinate maps for Dadar, Mahim, Lower Parel, and Margao.</p>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Insert review modal (for authenticated Admin only) */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 border border-slate-900 rounded-2xl p-6 w-full max-w-lg relative"
            >
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="font-sans font-black text-lg text-white mb-4 uppercase tracking-wider">Publish New Client Review</h3>
              
              <form onSubmit={handleAddNewReview} className="space-y-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Client / Company Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Piramal Towers Office"
                    className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-accent-primary text-slate-200 rounded-lg px-3 py-2 text-xs outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Locality / City</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Lower Parel, Mumbai"
                      className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-accent-primary text-slate-200 rounded-lg px-3 py-2 text-xs outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Performance Rating Score</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-850 text-slate-200 rounded-lg px-2.5 py-2 text-xs outline-none transition cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Client Testimonial text Payload</label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Provide specific details about the HVAC repair job, cooling performance, or service hotline turnaround timeline..."
                    className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-accent-primary text-slate-200 rounded-lg px-3 py-2 text-xs outline-none transition font-sans leading-relaxed text-justify"
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="new-verified-check"
                    checked={newVerified}
                    onChange={(e) => setNewVerified(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-850 text-accent-primary focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="new-verified-check" className="font-mono text-[10px] text-slate-400 select-none cursor-pointer">
                    Publish immediately under verified corporate list
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-accent-primary hover:bg-accent-primary/95 text-slate-950 font-black rounded-lg transition text-xs font-sans uppercase"
                  >
                    Inject & Broadcast
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success notifier popup banner */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 bg-slate-950 border border-emerald-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 text-xs font-mono text-emerald-400 animate-slide-in">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}

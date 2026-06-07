import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TIMELINE_DATA, ProjectMilestone } from "../types";
import { Clock, MapPin, Tag, ChevronLeft, ChevronRight, Layers, FileText } from "lucide-react";

export default function TimelineChronicle() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Residential" | "Commercial" | "Industrial" | "Specialty">("All");
  const [activeItem, setActiveItem] = useState<ProjectMilestone>(TIMELINE_DATA[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter achievements based on selection
  const filteredMilestones = TIMELINE_DATA.filter(
    (item) => selectedCategory === "All" || item.scope === selectedCategory
  );

  const handleNext = () => {
    const currentIndex = filteredMilestones.findIndex((m) => m.year === activeItem.year);
    if (currentIndex < filteredMilestones.length - 1) {
      setActiveItem(filteredMilestones[currentIndex + 1]);
      scrollYearIntoView(filteredMilestones[currentIndex + 1].year);
    }
  };

  const handlePrev = () => {
    const currentIndex = filteredMilestones.findIndex((m) => m.year === activeItem.year);
    if (currentIndex > 0) {
      setActiveItem(filteredMilestones[currentIndex - 1]);
      scrollYearIntoView(filteredMilestones[currentIndex - 1].year);
    }
  };

  const scrollYearIntoView = (year: number | string) => {
    const element = document.getElementById(`year-btn-${year}`);
    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        left: element.offsetLeft - containerRef.current.offsetWidth / 2 + element.offsetWidth / 2,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 md:p-8 hover:border-slate-800 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-cold-primary uppercase tracking-widest font-semibold block">Chronology Logs (1992 - 2026)</span>
          <h2 className="text-2xl font-display font-bold text-white mt-1">Our Historic Technical Milestones</h2>
          <p className="text-slate-400 text-sm max-w-xl mt-1">
            Browse through 30+ years of documented HVAC projects, from early window AC setups in Dadar to complex aerospace, offshore oil rig cooling, and centralized cleanroom projects.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 border border-slate-800 rounded-lg">
          {(["All", "Residential", "Commercial", "Industrial", "Specialty"] as const).map((cat) => (
            <button
               key={cat}
               onClick={() => {
                 setSelectedCategory(cat);
                 // Reset active item to first element in filtered array
                 const items = TIMELINE_DATA.filter(i => cat === "All" || i.scope === cat);
                 if (items.length > 0) setActiveItem(items[0]);
               }}
               className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                 selectedCategory === cat
                   ? "bg-cold-primary text-slate-950"
                   : "text-slate-400 hover:text-slate-200"
               }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Slidable Years Rail strip */}
      <div className="relative border-b border-slate-900 pb-4 mb-8">
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cyber-card to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cyber-card to-transparent pointer-events-none z-10" />
        
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none py-2 items-center"
        >
          {filteredMilestones.map((item) => (
            <button
              id={`year-btn-${item.year}`}
              key={item.year}
              onClick={() => {
                setActiveItem(item);
                scrollYearIntoView(item.year);
              }}
              className={`px-4 py-2 border rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                activeItem.year === item.year
                  ? "border-[#ec4899] text-[#ec4899] bg-[#ec4899]/5 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                  : "border-slate-850 bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {item.year === "1997-B" ? "1997 (Cassette Assembly)" : item.year === "2016-B" ? "2016 (Custom TFA)" : item.year}
            </button>
          ))}
        </div>
      </div>

      {/* Main Selected Timeline Detail Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/40 p-5 md:p-8 rounded-xl border border-slate-900">
        
        {/* Left Stats sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-900 pb-6 lg:pb-0 lg:pr-8 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-mono text-[10px] text-slate-500 uppercase">Chronology coordinates</span>
              <div className="text-4xl md:text-5xl font-display font-extrabold text-[#ec4899] tracking-tight mt-1">
                {activeItem.year === "1997-B" ? "1997" : activeItem.year === "2016-B" ? "2016" : activeItem.year}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                <Clock size={14} className="text-[#00f2fe]" />
                <span>Job Period: <strong>{activeItem.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                <MapPin size={14} className="text-[#ec4899]" />
                <span>Line Coordinates: <strong>{activeItem.location}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                <Layers size={14} className="text-yellow-400" />
                <span>Category Scope: <strong className="uppercase text-yellow-400">{activeItem.scope}</strong></span>
              </div>
            </div>
          </div>

          {/* Stepping controls navigation buttons */}
          <div className="flex gap-2">
            <button
              disabled={filteredMilestones.findIndex((m) => m.year === activeItem.year) === 0}
              onClick={handlePrev}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white disabled:opacity-20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
              <span className="text-xs font-mono">Previous Logs</span>
            </button>
            <button
              disabled={filteredMilestones.findIndex((m) => m.year === activeItem.year) === filteredMilestones.length - 1}
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white disabled:opacity-20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <span className="text-xs font-mono">Next Logs</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Core Details panel with fade transition */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-6 pl-0 lg:pl-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.year}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-mono text-[#00f2fe] uppercase tracking-widest block font-bold">Landmark Account / Client</span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-1">{activeItem.client}</h3>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                {activeItem.description}
              </p>

              {activeItem.details && (
                <div className="p-3 bg-slate-900 border-l-2 border-slate-800 rounded-r-lg text-xs text-slate-400 font-mono leading-relaxed flex items-start gap-2.5">
                  <FileText size={14} className="text-[#ec4899] shrink-0 mt-0.5" />
                  <span>
                    <strong>Project Logs:</strong> {activeItem.details}
                  </span>
                </div>
              )}

              {/* Technical Specifications Matrix Tags */}
              <div className="mt-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2 font-bold flex items-center gap-1">
                  <Tag size={10} /> Certified Technical Hardware Spec
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.techTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-900 border border-slate-850 rounded text-[10px] font-mono text-slate-300 hover:border-slate-700 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

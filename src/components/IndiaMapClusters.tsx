import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, CheckCircle2, Compass, Radio, Server, Layers, Calendar, Clock, Sparkles } from "lucide-react";
import { GEOGRAPHIC_ZONES } from "../types";

// High-Fidelity Exact Coordinate and Specification list for Nationwide Industrial Hubs
const PAN_INDIA_HUBS = [
  { 
    name: "Varanasi - GSB Kashi Matth", 
    lat: "25.3176° N",
    lng: "82.9739° E",
    location: "Kashi Vishwanath, UP",
    desc: "Heritage preservation climate engineering at the GSB Kashi Matth Temple Complex. Delivering powerful air treatment without breaking historic stone acoustics.",
    scope: "Spiritual Heritage",
    commissioned: "2026",
    duration: "Ongoing Phase",
    techTags: ["Silent Flow", "Invisible Ducting", "Aero Acoustic Control"],
    highlights: [
      "No visible external piping to preserve centuries-old architectural masonry",
      "Dynamic acoustic containment dampers keeping noise levels below 32 dB",
      "High-capacity precision thermal balances for heavy crowd congregations"
    ]
  },
  { 
    name: "Jamnagar - Reliance Rig", 
    lat: "22.4707° N",
    lng: "70.0577° E",
    location: "Coastal Gujarat",
    desc: "Severe offshore maritime HVAC overhauls and diagnostic corrections. Repaired high-pressure condenser fluid flows under extreme marine humidity.",
    scope: "Marine Industrial",
    commissioned: "2005",
    duration: "9-Day Deploy",
    techTags: ["Chilled Water", "Nitrogen Seal", "Anti-Corrosive Coat"],
    highlights: [
      "Surgical pressure leak sealing on critical high-saline offshore platforms",
      "Marine-grade heavy epoxy-coated custom chassis configurations",
      "Continuous diagnostic logging and pressure load test certification"
    ]
  },
  { 
    name: "Goa - Nanutel Hotel", 
    lat: "15.2736° N",
    lng: "73.9582° E",
    location: "Margao, Goa",
    desc: "Large scale hospitality comfort cooling system engineering and install. Designed custom environmental rooms for resort kitchens.",
    scope: "Hospitality & Commercial",
    commissioned: "1996",
    duration: "30-Day Project",
    techTags: ["90 TR Chillwater", "5.5 TR Walk-In", "Heavy Compressor"],
    highlights: [
      "90 Ton Central Chillwater cooling loop configuration and balancing",
      "Bespoke 5.5-tonne walk-in cold storage with military-grade compressor",
      "Integrated smart thermostat controls spanning tropical coastal humidity"
    ]
  },
  { 
    name: "Silvassa - Tips Cassette", 
    lat: "20.2766° N",
    lng: "73.0022° E",
    location: "Silvassa UT",
    desc: "Complete industrial package climate assemblies built with precision static pressure settings for tape replication and clean manufacturing floors.",
    scope: "Factory Manufacturing",
    commissioned: "1995",
    duration: "20-Day Deploy",
    techTags: ["Static Pressure", "Thermal Overload", "Tape Copy Line AC"],
    highlights: [
      "Full factory environmental encapsulation with constant dust scrubbing",
      "High-output thermal balancing across massive cassette extrusion bays",
      "Emergency air-turn exchange systems commissioned in a record 20 days"
    ]
  },
  { 
    name: "Hyderabad - Arch Pharmacy", 
    lat: "17.3850° N",
    lng: "78.4867° E",
    location: "Hyderabad, Telangana",
    desc: "Highly controlled laboratory split AC and cassette arrays engineered to sustain critical material preservation standards.",
    scope: "Pharmaceutical Lab",
    commissioned: "2006",
    duration: "15-Day Deploy",
    techTags: ["Twin Cassettes", "8 Special Splits", "Lab Climate Guard"],
    highlights: [
      "Twin overhead high-efficiency cassettes & 6 heavy industrial split units",
      "Carbon particle-scrubbing air filters for toxic compounding labs",
      "Secured priority diagnostic integration with remote status consoles"
    ]
  },
  { 
    name: "Aurangabad - Masjid Khana", 
    lat: "19.8762° N",
    lng: "75.3433° E",
    location: "Padegaon Block, Aurangabad",
    desc: "High urgent emergency installation of premium climate infrastructure executed ahead of historic royal religious visitations.",
    scope: "High Density Specialty",
    commissioned: "2008",
    duration: "12-Day Speed",
    techTags: ["9 Heavy OLG Splits", "Ultra-Speed Install", "Congregation Balance"],
    highlights: [
      "Rapid assembly and ducting of 9 separate heavy-duty OLG split modules",
      "Perfected acoustics for direct speech preservation inside prayer halls",
      "Completed fully within a rigorous 12-day strict arrival deadline"
    ]
  },
  { 
    name: "Mumbai - Corporate Headquarters", 
    lat: "19.0330° N",
    lng: "72.8400° E",
    location: "Mahim & Dadar, Mumbai",
    desc: "Our primary mechanical deployment station and main headquarters since 1992. Coordinates and dispatches 24/7 mobile HVAC technicians across Maharashtra.",
    scope: "Central Operations HQ",
    commissioned: "1992",
    duration: "Continuous",
    techTags: ["Piramal 18HP VRV", "Naman 32TR TFA", "Mitra Basu Loops"],
    highlights: [
      "Incepted first Dadar Plaza window AC configurations in 1993",
      "Engineered 18 HP VRV loops at Lower Parel sky offices in 2016",
      "Direct integration of high-altitude chiller assemblies at Dadar Kohinoor"
    ]
  }
];

// High-Fidelity Local Coordinates for Mumbai Peninsula Sub-Districts
const MUMBAI_LOCAL_ZONES = [
  {
    id: "south-mumbai",
    name: "South Mumbai Division",
    lat: "18.9690° N",
    lng: "72.8210° E",
    density: "410+ Commercial Assets",
    desc: "Premium, extreme altitude skyscraper mechanical contracts. Focuses on variable-refrigerant climate controllers and massive fresh air flow systems.",
    highlightClients: ["Piramal Towers Upper Executive", "Naman Towers Prabhadevi", "Dadar West Plaza Complex"],
    techTags: ["18 HP VRV loops", "32 TR custom TFA", "High Rise Altitude"],
    landmark: "Piramal Towers, Prabhadevi"
  },
  {
    id: "central-mumbai",
    name: "Mahim Headquarters & Central",
    lat: "19.0330° N",
    lng: "72.8400° E",
    density: "580+ Active Sites",
    desc: "Our primary corporate hub near SB Post Office. Dispatches local rapid-responders to Dadar West, Prabhadevi, central shopping arenas and social institutions.",
    highlightClients: ["Mahim HQ Bhagwansing Colony", "Sawantraj TejRaj Store", "Lions Club Santacruz"],
    techTags: ["Rapid 2-Hour Dispatch", "Retail Cassettes", "Complete AMCs"],
    landmark: "Mahim Post Office Block"
  },
  {
    id: "western-suburbs",
    name: "Western Suburbs & BKC",
    lat: "19.0607° N",
    lng: "72.8358° E",
    density: "390+ Premium Properties",
    desc: "Bandra Kurla Complex (BKC) financial heights, Andheri corporate setups, Lokhandwala celebrity residences, and high-density Borivali textile outlets.",
    highlightClients: ["Sunteck Penthouse BKC", "Andheri Plaza Cassettes", "Neena Gupta Celebrity Home"],
    techTags: ["Twin 18 HP VRV loops", "BKC Commercial Sky", "Low-Decibel Residential"],
    landmark: "Bandra Kurla Complex Heights"
  },
  {
    id: "eastern-suburbs",
    name: "Eastern Suburbs & Thane",
    lat: "19.2000° N",
    lng: "72.9700° E",
    density: "215+ Industrial Sites",
    desc: "Services major lab and factory estates. Specialized in deep ventilation, massive ducted package lines, and heavy-duty gas leak nitrogen pressure testing.",
    highlightClients: ["Jay Chemicals Thane", "Wagle Estate Laboratories", "Kala Hanuman Kandivali Columns"],
    techTags: ["Ducted 11-Ton Package", "Chemical Laboratory Isolation", "Vibration Dampers"],
    landmark: "Wagle Estate Factory Sector"
  },
  {
    id: "thane-navi",
    name: "Inland Outskirts & Resorts",
    lat: "18.7500° N",
    lng: "73.3400° E",
    density: "160+ Hospitality Lodges",
    desc: "Thermal management spanning high-humidity mountain resorts to coastal hotel chambers. Extends professional AMC schedules for humid atmospheres.",
    highlightClients: ["Uncle's Kitchen Khopoli", "Ratnagiri Coastal Rooms", "Panvel Logistics Chiller Box"],
    techTags: ["Tropical Humidity Guard", "16-Split Hospitality Array", "Compressor Overhaul"],
    landmark: "Khopoli Hill Coordinates"
  }
];

export default function IndiaMapClusters() {
  const [mapMode, setMapMode] = useState<"national" | "local">("national");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };

  return (
    <div id="geographic-coverage-panel" className="bg-cyber-card border-2 border-cyber-border rounded-2xl p-6 md:p-8 hover:border-slate-800 transition-all">
      
      {/* Blueprint Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-slate-850 pb-6">
        <div>
          <span className="font-mono text-xs text-[#ff4500] uppercase tracking-widest font-black flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff4500]" />
            Geographic Integrity ledger
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white mt-1 tracking-tight">
            HVAC Geographic Matrix
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mt-1.5 leading-relaxed font-semibold">
            Uncompromisingly accurate coordinates mapping over three decades of mechanical dispatches. View detailed engineering files by clicking any sector card below.
          </p>
        </div>

        {/* Dynamic Mode Selector Tabs */}
        <div className="inline-flex bg-[#030712] p-1.5 rounded-xl border border-slate-800 gap-1.5 w-full sm:w-auto">
          <button
            id="map-mode-national-btn"
            onClick={() => { setMapMode("national"); setExpandedCard(null); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-black uppercase transition-all duration-300 cursor-pointer ${
              mapMode === "national"
                ? "bg-[#ff4500] text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass size={14} className="animate-spin-slow" />
            <span>National Scale</span>
          </button>
          <button
            id="map-mode-local-btn"
            onClick={() => { setMapMode("local"); setExpandedCard(null); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-black uppercase transition-all duration-300 cursor-pointer ${
              mapMode === "local"
                ? "bg-[#ff69b4] text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Radio size={14} />
            <span>Mumbai Grid</span>
          </button>
        </div>
      </div>

      {/* Blueprint Subheading Grid Scale */}
      <div className="flex justify-between items-center text-xs font-mono text-white font-extrabold uppercase mb-8 bg-slate-950 px-4 py-3 rounded-lg border border-slate-800">
        <span className="flex items-center gap-2">
          <Server size={14} className="text-[#ff4500]" />
          ACTIVE GEOMETRIC STATION INDEX
        </span>
        <span className="text-[#ff4500] font-sans font-black">
          SCALE MATCH: {mapMode === "national" ? "GPS CONTINENTAL DIRECT" : "METROPOLITAN PRECISION FEED"}
        </span>
      </div>

      {/* Main Dynamic Cards Grid Container */}
      <AnimatePresence mode="wait">
        {mapMode === "national" ? (
          /* NATIONAL GRID INTERACTIVE Blueprints */
          <motion.div
            key="national-cards-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PAN_INDIA_HUBS.map((hub) => {
              const isExpanded = expandedCard === hub.name;
              return (
                <motion.div
                  key={hub.name}
                  onClick={() => toggleCard(hub.name)}
                  layout
                  className="bg-[#030712] border-2 border-slate-800 hover:border-[#ff4500] rounded-xl p-5 cursor-pointer selection:bg-[#ff4500]/20 transition-all duration-300 shadow-md group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Head details */}
                    <div className="flex justify-between items-center mb-4 border-b border-slate-850 pb-2">
                      <span className="text-[10px] bg-[#0a0e17] text-[#ff4500] px-2.5 py-1 rounded font-mono font-black flex items-center gap-1">
                        <Calendar size={10} className="text-[#ff69b4]" />
                        {hub.commissioned}
                      </span>
                      <span className="text-[10px] font-mono font-extrabold text-slate-400 tracking-wider">
                        {hub.scope}
                      </span>
                    </div>

                    {/* Accurate Coordinates HUD */}
                    <div className="bg-slate-900/50 p-2 rounded mb-3 flex items-center justify-between text-[11px] font-mono font-black text-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#ff4500]" />
                        {hub.lat}
                      </span>
                      <span className="text-right">
                        {hub.lng}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display text-lg font-black text-white mb-2 group-hover:text-[#ff4500] transition">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold mb-4">
                      {hub.desc}
                    </p>

                    {/* Tech Tags Container */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hub.techTags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono font-bold bg-[#030712] text-[#ff69b4] border border-[#ff4500]/30 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Specifications block */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-slate-800 pt-3 mt-3 overflow-hidden"
                        >
                          <span className="text-[10px] font-mono text-[#ff4500] uppercase tracking-wider block mb-2 font-black">
                            Site Milestones & Specs Deployed:
                          </span>
                          <ul className="space-y-2">
                            {hub.highlights.map((h, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-350">
                                <CheckCircle2 size={12} className="text-[#ff4500] mt-0.5 shrink-0" />
                                <span className="font-medium text-slate-100">{h}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400 font-black">
                            <span>TIMELINE: {hub.duration}</span>
                            <span>STATUS: LIVE_AMC</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expand cue footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 font-bold">
                      <Clock size={11} className="text-[#ff4500]" />
                      Response: 24-Hr Urgent
                    </span>
                    <span className="text-[#ff4500] font-black flex items-center gap-0.5">
                      {isExpanded ? "Collapse Spec [-]" : "Details Spec [+]"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* LOCAL MUMBAI GRID INTERACTIVE Blueprints */
          <motion.div
            key="local-cards-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MUMBAI_LOCAL_ZONES.map((zone) => {
              const isExpanded = expandedCard === zone.id;
              return (
                <motion.div
                  key={zone.id}
                  onClick={() => toggleCard(zone.id)}
                  layout
                  className="bg-[#030712] border-2 border-slate-800 hover:border-[#ff69b4] rounded-xl p-5 cursor-pointer selection:bg-[#ff69b4]/20 transition-all duration-300 shadow-md group flex flex-col justify-between"
                >
                  <div>
                    {/* Card border and tags */}
                    <div className="flex justify-between items-center mb-4 border-b border-slate-850 pb-2">
                      <span className="text-[10px] bg-[#0a0e17] text-[#ff69b4] px-2.5 py-1 rounded font-mono font-black flex items-center gap-1">
                        <Layers size={10} className="text-[#ff4500]" />
                        {zone.density}
                      </span>
                      <span className="text-[10px] font-mono font-extrabold text-slate-400 tracking-wider">
                        Active Loop: {zone.landmark.split(",")[0]}
                      </span>
                    </div>

                    {/* Accurate Space Coordinates */}
                    <div className="bg-slate-900/50 p-2 rounded mb-3 flex items-center justify-between text-[11px] font-mono font-black text-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#ff4500]" />
                        {zone.lat}
                      </span>
                      <span className="text-right">
                        {zone.lng}
                      </span>
                    </div>

                    {/* Zone Title */}
                    <h3 className="font-display text-lg font-black text-white mb-2 group-hover:text-[#ff69b4] transition">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold mb-4">
                      {zone.desc}
                    </p>

                    {/* Tech Tags Container */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {zone.techTags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono font-bold bg-[#030712] text-[#ff69b4] border border-[#ff69b4]/30 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable specs block */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-slate-800 pt-3 mt-3 overflow-hidden"
                        >
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-black">
                            Commercial Landmarks Served inside Zone:
                          </span>
                          <ul className="space-y-2">
                            {zone.highlightClients.map((client, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-350">
                                <CheckCircle2 size={12} className="text-[#ff69b4] mt-0.5 shrink-0" />
                                <span className="font-medium text-slate-100">{client}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400 font-black">
                            <span>BEACON MAP: ACTIVE</span>
                            <span>DISPATCH RANGE: LOCAL_MUMBAI</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expand cue footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 font-bold">
                      <Clock size={11} className="text-[#ff69b4]" />
                      Response: 2-Hr Rapid
                    </span>
                    <span className="text-[#ff69b4] font-black flex items-center gap-0.5">
                      {isExpanded ? "Collapse landmarks [-]" : "Details landmarks [+]"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blueprint Footer coordinate ledger */}
      <div className="mt-8 flex justify-between items-center border-t border-slate-800 pt-5 text-xs font-mono text-slate-400 font-bold">
        <span className="flex items-center gap-2">
          <Sparkles size={13} className="text-[#ff4500] animate-pulse" />
          ESTABLISHED 1992 MECHANICAL FIELD RECORDS
        </span>
        <span>MUMBAI MAHIM STATION LEDGER</span>
      </div>
    </div>
  );
}

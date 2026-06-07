import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, ShieldCheck, CheckCircle2, Copy, Send, Check } from "lucide-react";

export default function CoolingCalculator() {
  const [roomArea, setRoomArea] = useState<number>(150); // average sq ft
  const [systemType, setSystemType] = useState<"split" | "window" | "cassette" | "central">("split");
  const [coolingMode, setCoolingMode] = useState<"clean" | "gas" | "repair" | "install" | "amc">("clean");
  const [gasType, setGasType] = useState<"R32" | "R410A" | "R22">("R32");
  const [isCopied, setIsCopied] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Auto-Tonnage guidelines
  const recommendedTonnage = roomArea < 120 ? "1.0 TR" : roomArea < 180 ? "1.5 TR" : roomArea < 280 ? "2.0 TR" : roomArea < 450 ? "3.0 TR (Cassette)" : "5.0+ TR (Central/Ducted)";

  // Base prices based on provided corporate data
  const calculateEstimate = () => {
    let basePrice = 1050; // default basic AC service
    
    if (coolingMode === "clean") {
      basePrice = systemType === "split" ? 1050 : systemType === "window" ? 1050 : systemType === "cassette" ? 1800 : 3500;
    } else if (coolingMode === "gas") {
      basePrice = 1050; // gas fill starts at 1050
      if (gasType === "R32") basePrice += 450;
      if (gasType === "R410A") basePrice += 550;
      if (gasType === "R22") basePrice += 650;
    } else if (coolingMode === "repair") {
      basePrice = 750; // starting diagnostic price
    } else if (coolingMode === "install") {
      basePrice = systemType === "split" ? 1800 : systemType === "window" ? 1200 : systemType === "cassette" ? 3500 : 12000;
    } else if (coolingMode === "amc") {
      basePrice = systemType === "split" ? 3500 : systemType === "window" ? 2800 : systemType === "cassette" ? 8500 : 18000;
    }

    // Multiply somewhat for commercial or massive sizing
    if (roomArea > 280) {
      basePrice = Math.round(basePrice * 1.5);
    }

    return basePrice;
  };

  const currentPrice = calculateEstimate();

  const handleCopyReport = () => {
    const reportText = `Prabhu Enterprises HVAC Estimate:
------------------------------------------
System Configuration: ${systemType.toUpperCase()}
Calculated Capacity Requirement: ${recommendedTonnage}
Select Service: ${coolingMode.toUpperCase()} SERVICE
Proposed Spares/Gas: ${coolingMode === "gas" ? gasType : "N/A"}
Total Estimated base starts from: Rs. ${currentPrice}/-
Recommended Diagnostic Step: Nitrogen pressure test for high coastal humidity.
*Diagnostic estimates apply. Final rates on-site subject to capacity parameter review.`;
    
    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 md:p-8 hover:border-slate-800 transition-all shadow-xl">
      <div className="flex items-center gap-3 border-b border-slate-900 pb-5 mb-6">
        <div className="p-3 bg-cold-primary/10 rounded-lg text-cold-primary">
          <Calculator size={22} />
        </div>
        <div>
          <span className="font-mono text-xs text-cold-primary uppercase tracking-widest font-semibold block">Interactive Diagnosis</span>
          <h2 className="text-xl font-display font-bold text-white">Smart HVAC Cost Planner</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Input Fields side */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Room Area Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-semibold uppercase text-slate-400 font-mono">Area Parameters (Sq. Feet)</label>
              <span className="font-mono text-sm text-[#00f2fe] font-bold">{roomArea} sq. ft.</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={roomArea}
              onChange={(e) => setRoomArea(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cold-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>50 sq ft (Room)</span>
              <span>500 sq ft (Store/Office)</span>
              <span>1000 sq ft (Factory Block)</span>
            </div>
          </div>

          {/* System Mounting Category Grid */}
          <div>
            <label className="text-[10px] font-semibold uppercase text-slate-500 font-mono block mb-2.5">AC Mounting / Layout Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "split", label: "Split AC" },
                { id: "window", label: "Window AC" },
                { id: "cassette", label: "Cassette AC" },
                { id: "central", label: "Central HVAC" },
              ].map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => setSystemType(sys.id as any)}
                  className={`py-3 px-2 border text-center rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    systemType === sys.id
                      ? "border-cold-primary text-cold-primary bg-cold-primary/5 font-bold"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {sys.label}
                </button>
              ))}
            </div>
          </div>

          {/* Operational Requirement Column */}
          <div>
            <label className="text-[10px] font-semibold uppercase text-slate-500 font-mono block mb-2.5">Specific Service Scope</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { id: "clean", label: "Jet Washing" },
                { id: "gas", label: "Gas Filling" },
                { id: "repair", label: "Diagnosis" },
                { id: "install", label: "Mounting" },
                { id: "amc", label: "Annual AMC" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCoolingMode(mode.id as any)}
                  className={`py-2 px-1 border text-center rounded-lg text-xs transition-all cursor-pointer ${
                    coolingMode === mode.id
                      ? "border-cold-primary text-cold-primary bg-cold-primary/5 font-bold"
                      : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Refrigerant Gas option panel if Gas selection is active */}
          {coolingMode === "gas" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-slate-950 p-4 rounded-xl border border-slate-900"
            >
              <label className="text-[10px] font-semibold uppercase text-slate-500 font-mono block mb-2.5">Select Refrigerant Type</label>
              <div className="flex gap-4">
                {[
                  { gas: "R32", eco: "Eco-Friendly, High-efficiency" },
                  { gas: "R410A", eco: "Dual pressure refrigerant" },
                  { gas: "R22", eco: "Older systems classic compressor" },
                ].map((item) => (
                  <label key={item.gas} className="flex-1 flex flex-col p-3 border border-slate-800 rounded-lg cursor-pointer bg-slate-900/40 select-none">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gasChoice"
                        checked={gasType === item.gas}
                        onChange={() => setGasType(item.gas as any)}
                        className="text-cold-primary focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="font-mono font-bold text-xs text-white">{item.gas}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">{item.eco}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Right Dynamic Report side */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <span className="font-mono text-slate-500 text-[10px] uppercase">Diagnosed Estimate</span>
              <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">Verified Rate</span>
            </div>

            <div className="py-2">
              <span className="text-slate-400 text-xs font-mono uppercase block">Estimated Base Charge</span>
              <div className="text-3xl font-display font-extrabold text-white mt-1">
                Rs. {currentPrice}/-
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-1">
                *Subject to site survey & specific compressor parameters. Professional diagnostics are charged moderatley based on complexity.
              </p>
            </div>

            <div className="border-t border-slate-900 pt-4 flex flex-col gap-2.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Recommended Tonnage:</span>
                <span className="text-[#00f2fe] font-bold">{recommendedTonnage}</span>
              </div>
              <div className="flex justify-between">
                <span>System Selection:</span>
                <span className="text-white uppercase">{systemType} AC</span>
              </div>
              <div className="flex justify-between">
                <span>Proposed Gas Spec:</span>
                <span className="text-white">{coolingMode === "gas" ? gasType : "N/A Line Pressure"}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Warranty:</span>
                <span className="text-emerald-400 font-bold">1-Year on new units</span>
              </div>
            </div>

            {/* Micro-Recommendation Diagnostic alert for Mumbai conditions */}
            <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] text-adaptive text-amber-300 flex items-start gap-2 leading-relaxed">
              <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Mumbai Pro Guidance:</strong> Higher marine salt humidity in Dadar, Mahim, and Colaba triggers micro-fractures in copper condensers. We suggest a precise Nitrogen Leak diagnosis before gas refilling.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-900">
            <button
              onClick={handleCopyReport}
              className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-mono cursor-pointer transition-all active:scale-95"
            >
              {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{isCopied ? "Estimates Copied!" : "Copy Cost Sheet"}</span>
            </button>

            <button
              onClick={() => {
                setIsBooked(true);
                setTimeout(() => setIsBooked(false), 3000);
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-cold-primary hover:bg-cold-secondary text-slate-950 font-bold rounded-lg text-xs cursor-pointer transition-all active:scale-95"
            >
              {isBooked ? <CheckCircle2 size={14} /> : <Send size={14} />}
              <span>{isBooked ? "Query Recorded!" : "Book Assessment"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

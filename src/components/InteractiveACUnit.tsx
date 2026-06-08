import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Power, Sun, ShieldCheck, HelpCircle, ArrowUp, ArrowDown, Wind, Snowflake, Flame, Cpu, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

export default function InteractiveACUnit() {
  const [isOn, setIsOn] = useState(true);
  const [temperature, setTemperature] = useState(18); // default nice and cool
  const [mode, setMode] = useState<"cool" | "heat" | "fan" | "eco">("cool");
  const [showDiagnostics, setShowDiagnostics] = useState(true);

  // Compute metrics based on settings
  const targetRPM = isOn ? (mode === "cool" ? 950 - (temperature - 16) * 42 : mode === "heat" ? 820 : mode === "eco" ? 520 : 680) : 0;
  const targetCOP = isOn ? (mode === "eco" ? 4.3 : mode === "cool" ? 3.9 - (temperature - 18) * 0.05 : 3.4) : 0;
  const currentDraw = isOn ? ((mode === "cool" ? (32 - temperature) * 0.16 : mode === "heat" ? 2.1 : 0.75) * (mode === "eco" ? 0.65 : 1)).toFixed(2) : "0.00";
  const compressorLoad = isOn ? Math.max(12, Math.min(100, Math.round((mode === "cool" ? (31 - temperature) * 7.8 : mode === "heat" ? 68 : mode === "eco" ? 30 : 0) * (mode === "eco" ? 0.75 : 1)))) : 0;
  const noiseDecibels = isOn ? Math.round(26 + (targetRPM / 1000) * 9) : 0;

  // Temperature control limits
  const incrementTemp = () => {
    if (temperature < 30) setTemperature((t) => t + 1);
  };
  const decrementTemp = () => {
    if (temperature > 16) setTemperature((t) => t - 1);
  };

  // Breeze colors matching the strict orange-red (#ff4500) and Pink (#ff69b4) palette
  const getParticleColor = () => {
    if (mode === "cool") return "#ff69b4"; // Luxurious Cool Pink breeze
    if (mode === "heat") return "#ff4500"; // Warm Orange-Red wave
    if (mode === "eco") return "#10b981";  // Efficient green wave
    return "#e5e7eb"; // White/Grey fan air
  };

  const getParticleColorAlpha = () => {
    if (mode === "cool") return "rgba(255, 105, 180, 0.45)";
    if (mode === "heat") return "rgba(255, 69, 0, 0.45)";
    if (mode === "eco") return "rgba(16, 185, 129, 0.4)";
    return "rgba(255, 255, 255, 0.3)";
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-cyber-card border-2 border-cyber-border rounded-3xl p-6 md:p-8 hover:border-[#ff69b4] transition-all duration-300 overflow-hidden shadow-2xl">
      {/* Dynamic Keyframes for realistic crossflow blade drum spinning */}
      <style>{`
        @keyframes crossFlowSpin {
          0% { background-position-x: 0px; }
          100% { background-position-x: 180px; }
        }
        .crossflow-drum-spinning {
          background: repeating-linear-gradient(
            90deg,
            #030712 0px,
            #0f172a 12px,
            #334155 18px,
            #1e293b 24px,
            #030712 36px
          );
          background-size: 60px 100%;
          animation: crossFlowSpin linear infinite;
        }
      `}</style>

      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,69,0,0.06)_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-5 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff4500] animate-pulse" />
            <span className="font-mono text-xs text-[#ff4500] uppercase tracking-widest font-black">ACTIVE SIMULATION GRID</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-black text-white mt-1 tracking-tight">
            PRABHU PRO-ZONE III AC SIMULATOR
          </h3>
          <p className="text-slate-400 text-xs font-medium mt-1 font-sans">
            Precision climate control diagnostics console reproducing dynamic thermal exchanges.
          </p>
        </div>
        
        <button
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-black text-slate-300 hover:text-white hover:border-[#ff69b4] transition cursor-pointer"
        >
          <Cpu size={14} className="text-[#ff69b4]" />
          <span>{showDiagnostics ? "Hide Diagnostics" : "Reveal Diagnostics"}</span>
        </button>
      </div>

      {/* MAIN CONTAINER: Split AC Mockup on TOP spanning full width */}
      <div className="w-full flex flex-col items-center mb-10 relative z-10 bg-slate-950/60 p-6 rounded-2xl border border-slate-850">
        <span className="font-mono text-[9px] text-[#ff69b4] font-black uppercase tracking-widest mb-4">
          Indoor Air Handler Assembly (Evaporator / Vent Louver Loop)
        </span>

        {/* Realistic White Modern Split AC Chassis */}
        <div className="relative w-full max-w-2xl bg-gradient-to-b from-white via-slate-100 to-slate-200 border-2 border-slate-300 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 border-b-[8px] border-b-slate-400 pr-0">
          
          {/* Top Intake Grill Slot with clean dark intake filters */}
          <div className="w-full px-5 pt-3 pb-1">
            <div className="w-full h-4 bg-slate-800 border border-slate-400/50 rounded-md overflow-hidden flex divide-x divide-slate-700">
              {[...Array(18)].map((_, i) => (
                <div key={i} className="h-full w-full bg-[#0a0f1d] hover:bg-slate-900 transition-colors duration-200" />
              ))}
            </div>
            <div className="flex justify-between px-1 mt-1 text-[9px] font-mono font-extrabold uppercase tracking-widest">
              <span style={{ color: '#000000' }}>High Airflow Filter Net</span>
              <span style={{ color: '#f9043c' }}>Intake Section</span>
            </div>
          </div>

          {/* Curved Front Panel Chamber */}
          <div className="relative px-6 py-4 flex justify-between items-center z-10">
            {/* Elegant Branding & Metallic Crown Indicator */}
            <div className="flex items-center gap-3">
              {/* Squeezed Prabhu enterprises logo */}
              <div className="shrink-0 scale-75 origin-left">
                <AnimatedLogo size={36} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-display uppercase tracking-widest" style={{ color: '#000000', fontWeight: 'bold' }}>
                  PRABHU ENTERPRISES
                </span>
                <span className="font-mono text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ borderColor: '#ee0063', color: '#ff00ff' }}>
                  PRO-ZONE III INVERTER SPECIALTY
                </span>
              </div>
            </div>

            {/* Glowing High Glass-Gloss OLED Display screen */}
            <div className="bg-[#030712] border-2 border-[#ff4500]/20 rounded-xl px-4 py-2 shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] min-w-[100px] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Subtle matrix flare */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,105,180,0.04)_1px,transparent_1px)] bg-[size:100%_4px]" />
              
              {isOn ? (
                <div className="relative text-center">
                  <div className="flex items-baseline gap-0.5 justify-center">
                    <span className="font-mono text-xl font-bold text-[#ff69b4] drop-shadow-[0_0_10px_rgba(255,105,180,0.6)] animate-pulse">
                      {temperature}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#ff69b4]">°C</span>
                  </div>
                  {/* Small animated fan indicator */}
                  <div className="flex items-center gap-1.5 mt-1 justify-center">
                    <RefreshCw size={10} className="text-[#ff4500] animate-spin" style={{ animationDuration: `${2 - (targetRPM / 500)}s` }} />
                    <span className="font-mono text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">{mode}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-1">
                  <span className="font-mono text-[10px] text-slate-600 font-black uppercase tracking-widest">STANDBY</span>
                </div>
              )}
            </div>
          </div>

          {/* Thin horizontal chrome-style splitting seam */}
          <div className="w-full h-[2px] bg-slate-300/80 shadow-sm relative z-10" />

          {/* Internal Tangential Cross-Flow Blower Chamber */}
          <div className="relative w-[96%] mx-auto h-11 bg-slate-950 rounded-lg overflow-hidden flex items-center border border-slate-900 shadow-inner mt-2 mb-1.5">
            <span className="absolute top-1 left-2.5 font-mono text-[8px] text-slate-600 uppercase tracking-widest font-black z-20">
              CROSS-FLOW IMPELLER BLOWER
            </span>
            
            {/* Cylindrical spinning drum blades (The Fan) */}
            <div 
              className={`absolute inset-x-2 inset-y-1 rounded overflow-hidden transition-all duration-500 opacity-80 ${
                isOn ? "crossflow-drum-spinning" : "bg-[#040813]"
              }`}
              style={{
                animationDuration: isOn ? `${Math.max(0.2, 1.6 - (targetRPM / 650))}s` : "0s"
              }}
            />

            {/* Protective grill wire guards */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-full w-[1.5px] bg-slate-950/70" />
              ))}
            </div>

            {/* Running Status readout right inside the blower slit */}
            <div className="absolute right-4 font-mono text-[9px] text-[#ff4500] font-black z-20 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-900">
              {isOn ? `${Math.round(targetRPM)} RPM` : "0 RPM"}
            </div>
          </div>

          {/* Deflector Vent Louver Flap - Motorized Swing Louver */}
          <div className="w-full px-1 mb-1 relative z-20">
            <motion.div
              animate={{
                rotateX: isOn ? 52 : 0, 
                y: isOn ? 6 : 0,
                backgroundColor: isOn ? "#e2e8f0" : "#cbd5e1"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full bg-slate-200 border border-slate-300 rounded-md shadow-md h-5 flex items-center justify-center relative origin-top"
            >
              <div className="flex gap-1 items-center justify-center">
                <span className="w-8 h-[2px] bg-slate-400 rounded-full" />
                <span className="text-[7px] font-mono font-black text-slate-500 uppercase tracking-widest">
                  {isOn ? "▼ SWING VENT OPEN ▼" : "VENT SHUT"}
                </span>
                <span className="w-8 h-[2px] bg-slate-400 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Realistic Air Currents Breeze Waves */}
        <div className="w-full max-w-xl h-24 relative flex justify-around px-4 mt-2 overflow-hidden rounded-b-xl border-t border-dashed border-slate-800">
          <AnimatePresence>
            {isOn && (
              <>
                {/* 10 customized thermal particles flowing down */}
                {[...Array(10)].map((_, i) => {
                  const startX = (i * 20) + 10;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        y: [0, 90],
                        opacity: [0, 0.9, 0],
                        scale: [0.6, 1.2, 0.6],
                        x: [
                          startX, 
                          startX + Math.sin(i * 1.5) * 12, 
                          startX + Math.sin(i * 1.5) * 6
                        ],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1.4 + Math.random() * 0.7,
                        repeat: Infinity,
                        delay: i * 0.12,
                        ease: "easeOut",
                      }}
                      className="absolute top-1 w-3 h-3 rounded-full blur-[1px]"
                      style={{
                        left: `${(i * 10) + 5}%`,
                        backgroundColor: getParticleColor(),
                        boxShadow: `0 0 10px ${getParticleColorAlpha()}`,
                      }}
                    />
                  );
                })}
                
                {/* Micro Breeze Swivel Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 100">
                  <motion.path
                    d="M 35,5 C 45,35 25,65 35,95"
                    fill="none"
                    stroke={getParticleColor()}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -35] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M 100,5 C 110,35 90,65 100,95"
                    fill="none"
                    stroke={getParticleColor()}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M 165,5 C 175,35 155,65 165,95"
                    fill="none"
                    stroke={getParticleColor()}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -35] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </>
            )}
          </AnimatePresence>
          {!isOn && (
            <div className="flex h-full items-center justify-center text-slate-600 font-mono text-[10px] tracking-widest uppercase font-black">
              System Standby - Flap Recessed
            </div>
          )}
        </div>
      </div>

      {/* PARALLEL LAYOUT: Remote Controls and Real-Time Diagnostics placed side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 items-stretch">
        
        {/* Parallel Block A: IR Infinite Remote Controller */}
        <div className="bg-slate-950/80 border-2 border-[#ff4500]/60 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-[11px] text-[#ff4500] uppercase tracking-widest font-black">
                IR REMOTE HANDSET
              </span>
              <span className="text-[10px] bg-[#ff4500]/15 text-[#ff4500] px-2 py-0.5 rounded font-mono font-bold">
                TX ACTIVE
              </span>
            </div>
            
            {/* Main Power & Mode Settings */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Power Toggle Button */}
              <button
                maxLength={undefined}
                onClick={() => setIsOn(!isOn)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-black transition-all cursor-pointer ${
                  isOn
                    ? "bg-rose-600 text-white border-2 border-rose-500 shadow-lg hover:bg-rose-700 active:scale-95"
                    : "bg-green-600 text-white border-2 border-green-500 shadow-lg hover:bg-green-700 active:scale-95"
                }`}
              >
                <Power size={15} />
                <span>{isOn ? "POWER OFF" : "POWER ON"}</span>
              </button>

              {/* Mode Toggle Button */}
              <button
                disabled={!isOn}
                onClick={() => {
                  const modes: typeof mode[] = ["cool", "heat", "fan", "eco"];
                  const currentIndex = modes.indexOf(mode);
                  setMode(modes[(currentIndex + 1) % modes.length]);
                }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-black border-2 transition-all cursor-pointer ${
                  isOn
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200"
                    : "bg-slate-950 border-slate-900 text-slate-755 cursor-not-allowed opacity-40"
                }`}
              >
                {mode === "cool" && <Snowflake size={15} className="text-[#ff69b4]" />}
                {mode === "heat" && <Flame size={15} className="text-[#ff4500]" />}
                {mode === "fan" && <Wind size={15} className="text-white" />}
                {mode === "eco" && <ShieldCheck size={15} className="text-emerald-400" />}
                <span className="uppercase">{mode}</span>
              </button>
            </div>

            {/* Beautiful Thermostat Adjuster Row */}
            <div className="mt-6 border-t border-slate-900 pt-5 flex items-center justify-between bg-slate-900/40 p-3 rounded-xl border border-slate-850">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  Thermostat Setting
                </span>
                <div className="text-3xl font-display font-black text-white flex items-baseline gap-1 mt-1">
                  <span className={isOn ? "text-[#ff69b4]" : "text-slate-600"}>
                    {temperature}
                  </span>
                  <span className="text-xs font-mono text-slate-400">°C</span>
                </div>
              </div>

              {/* Command Increments */}
              <div className="flex gap-1.5">
                <button
                  disabled={!isOn || temperature >= 30}
                  onClick={incrementTemp}
                  className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-slate-800 hover:border-[#ff69b4] text-white transition-all cursor-pointer"
                >
                  <ArrowUp size={20} className="text-[#ff69b4]" />
                </button>
                <button
                  disabled={!isOn || temperature <= 16}
                  onClick={decrementTemp}
                  className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-slate-800 hover:border-[#ff4500] text-white transition-all cursor-pointer"
                >
                  <ArrowDown size={20} className="text-[#ff4500]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 text-[10px] font-mono text-slate-500 font-extrabold flex justify-between items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900">
            <span>SIGNAL RANGE: MAX_INFRARED</span>
            <span className="text-[#ff69b4] animate-pulse">● FREQ: 38KHZ</span>
          </div>
        </div>

        {/* Parallel Block B: Real-Time Diagnostic Feed */}
        <div className="bg-slate-950/80 border-2 border-[#ff69b4]/60 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-[11px] text-[#ff69b4] uppercase tracking-widest font-black">
                PARAMETER FLOW FEED
              </span>
              <span className="text-[10px] bg-[#ff69b4]/15 text-[#ff69b4] px-2 py-0.5 rounded font-mono font-bold">
                TELEMETRY LIVE
              </span>
            </div>

            {showDiagnostics ? (
              <div className="mt-4 flex flex-col gap-3 font-mono text-xs text-slate-350">
                
                {/* Compressor Thermal Load */}
                <div className="grid grid-cols-12 items-center bg-slate-900/30 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <div className="col-span-7 flex items-center gap-2 min-w-0">
                    <Cpu size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate text-slate-300 font-bold">Compressor Load</span>
                  </div>
                  <div className={`col-span-5 text-right font-black whitespace-nowrap ${isOn ? (compressorLoad > 80 ? "text-[#ff4500]" : "text-emerald-400") : "text-slate-600"}`}>
                    {isOn ? `${compressorLoad}%` : "0% (Idle)"}
                  </div>
                </div>

                {/* Fan Speed reading */}
                <div className="grid grid-cols-12 items-center bg-slate-900/30 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <div className="col-span-7 flex items-center gap-2 min-w-0">
                    <Wind size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate text-slate-300 font-bold">Blower Fan Speed</span>
                  </div>
                  <div className={`col-span-5 text-right font-black whitespace-nowrap ${isOn ? "text-white" : "text-slate-600"}`}>
                    {isOn ? `${Math.round(targetRPM)} RPM` : "0 RPM"}
                  </div>
                </div>

                {/* System Efficiency COP coefficient */}
                <div className="grid grid-cols-12 items-center bg-slate-900/30 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <div className="col-span-7 flex items-center gap-2 min-w-0">
                    <ShieldAlert size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate text-slate-300 font-bold">System COP Metric</span>
                  </div>
                  <div className={`col-span-5 text-right font-black whitespace-nowrap ${isOn ? "text-[#ff69b4]" : "text-slate-600"}`}>
                    {isOn ? `${targetCOP.toFixed(1)} kW/kW` : "0.0"}
                  </div>
                </div>

                {/* Dynamic Energy Draw rate */}
                <div className="grid grid-cols-12 items-center bg-slate-900/30 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <div className="col-span-7 flex items-center gap-2 min-w-0">
                    <Sparkles size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate text-slate-300 font-bold">Inverter Draw</span>
                  </div>
                  <div className={`col-span-5 text-right font-black whitespace-nowrap ${isOn ? "text-[#ff4500]" : "text-slate-600"}`}>
                    {isOn ? `${currentDraw} kW/h` : "0.00 kW/h"}
                  </div>
                </div>

                {/* Coolant Suction interactive pressure feedback gauge */}
                <div className="mt-1 bg-slate-900/45 rounded-xl p-3 border border-slate-900">
                  <div className="flex justify-between text-[9px] text-slate-500 font-black uppercase tracking-wider mb-2">
                    <span>R32 Suction Pressure Gauge</span>
                    <span className="text-[#ff4500] font-bold">125 PSI Optimized</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden relative border border-slate-800">
                    <motion.div
                      animate={{ width: isOn ? `${Math.max(25, 98 - (temperature - 16) * 4.2)}%` : "0%" }}
                      className="h-full bg-gradient-to-r from-[#ff4500] to-[#ff69b4]"
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 font-mono text-xs leading-relaxed font-semibold">
                Diagnostics flow retracted. <br /> Use the top deck control console to overlay telemetry.
              </div>
            )}
          </div>

          <div className="mt-5 text-[9px] font-mono text-[#ff69b4] font-black text-center uppercase tracking-widest border-t border-slate-900 pt-3">
            System Calibrated: IS9001 Compliance
          </div>
        </div>

      </div>
    </div>
  );
}

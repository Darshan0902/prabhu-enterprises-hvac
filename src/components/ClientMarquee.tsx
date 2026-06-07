import React from "react";
import { CLIENT_LIST } from "../types";
import ClientLogo from "./ClientLogo";

export default function ClientMarquee() {
  // Let's double the list to make the infinite scrolling wrap cleanly
  const doubledClients = [...CLIENT_LIST, ...CLIENT_LIST];

  return (
    <div className="relative w-full py-8 overflow-hidden bg-slate-950/40 border-y border-cyber-border">
      {/* Absolute Ambient Glow over sides */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-cyber-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-cyber-dark to-transparent z-10 pointer-events-none" />
      
      <div className="mb-4 text-center">
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">Trusted Across Industrial & Commercial Verticals Since 1992</span>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex w-full animate-fade-in">
        <div className="flex animate-marquee gap-6 whitespace-nowrap">
          {doubledClients.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="inline-flex flex-col items-center justify-between min-w-[150px] md:min-w-[180px] bg-slate-900 border border-slate-800 hover:border-[#ff69b4]/50 rounded-xl px-4 py-4 transition-all duration-300 transform hover:scale-105"
            >
              {/* Premium Light-Gray/White Glassmorphic badge so both dark and color logos stand out incredibly sharp */}
              <div className="w-28 h-12 rounded-lg bg-white/95 flex items-center justify-center border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] group overflow-hidden relative px-2.5 py-1.5 hover:bg-white transition-colors duration-300">
                <ClientLogo id={client.id} />
              </div>

              <div className="text-center mt-3 w-full">
                <span className="font-display font-semibold text-xs text-white block truncate px-1">{client.name}</span>
                <span className="font-mono text-[9px] text-[#ff69b4] block uppercase mt-0.5 tracking-wider font-extrabold">{client.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

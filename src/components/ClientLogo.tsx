import React from "react";

interface ClientLogoProps {
  id: string;
  className?: string;
}

export default function ClientLogo({ id, className = "w-full h-full animate-fade-in" }: ClientLogoProps) {
  switch (id) {
    case "bliss":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="8" y="24" fill="#1e3a8a" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">Bliss</text>
          <text x="56" y="24" fill="#22c55e" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">GVS</text>
          <text x="8" y="34" fill="#475569" fontSize="6.5" fontWeight="bold" letterSpacing="0.5" fontFamily="system-ui, sans-serif">PHARMA LIMITED</text>
        </svg>
      );

    case "gammon":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,10 24,10 30,16 30,28 24,34 12,34 6,28 6,16" fill="#ef4444" />
          <path d="M21,18 L15,18 L15,26 L21,26 L21,22 L18,22" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="36" y="22" fill="#ef4444" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">GAMMON</text>
          <text x="36" y="30" fill="#1e293b" fontSize="5.5" fontWeight="bold" letterSpacing="0.2" fontFamily="system-ui, sans-serif">Builders to the Nation</text>
        </svg>
      );

    case "uha":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="32" y="28" fill="#000000" fontSize="28" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="-1.5">uha</text>
        </svg>
      );

    case "svg":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="6" width="110" height="28" rx="14" fill="#dc2626" />
          <text x="60" y="23" fill="white" fontSize="14" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="1">SVG</text>
          <text x="60" y="30" fill="white" fontSize="4.5" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.3">SHREE VENKTESHWAR GROUP</text>
        </svg>
      );

    case "zimlog":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="12" y="28" fill="#1e3a8a" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif">ZIM</text>
          <text x="54" y="28" fill="#1e293b" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif">Log</text>
          <polygon points="86,10 98,15 91,22" fill="#f59e0b" />
        </svg>
      );

    case "hastakala":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="21" fill="#b45309" fontSize="14" fontWeight="900" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="0.5">hastakala</text>
          <text x="60" y="31" fill="#b45309" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="2">SAREES NX</text>
          <path d="M12,20 C12,16 15,14 17,17 C17,19 15,21 15,23 C15,25 18,24 15,26 C12,28 12,24 12,20 Z" fill="#b45309" opacity="0.6" />
          <path d="M108,20 C108,16 105,14 103,17 C103,19 105,21 105,23 C105,25 102,24 105,26 C108,28 108,24 108,20 Z" fill="#b45309" opacity="0.6" />
        </svg>
      );

    case "shinde":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,24 C10,18 13,14 15,14 C17,14 19,18 19,24 C19,30 17,34 15,34 C13,34 10,30 10,24 Z" fill="#78350f" opacity="0.4" />
          <text x="22" y="23" fill="#451a03" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">SHiNDE</text>
          <circle cx="41" cy="17" r="1.5" fill="#eab308" />
          <text x="22" y="31" fill="#78350f" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="2.5">SHOES</text>
        </svg>
      );

    case "kalakruti":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="27" fill="#854d0e" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle">kalakruti</text>
          <text x="60" y="27" fill="none" stroke="#eab308" strokeWidth="0.5" strokeDasharray="1 1" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle">kalakruti</text>
        </svg>
      );

    case "taq":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="8,18 18,7 20,18" fill="#0284c7" />
          <polygon points="20,18 18,7 29,20" fill="#06b6d4" />
          <polygon points="8,18 20,18 15,30" fill="#f97316" />
          <text x="34" y="19" fill="#1e3a8a" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">THE ARTS</text>
          <text x="34" y="27" fill="#1e3a8a" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">QUOTIENT</text>
          <text x="34" y="33" fill="#f97316" fontSize="3.5" fontWeight="bold" fontFamily="system-ui, sans-serif">PLAY THE LEAD. ACT FOR CHANGE</text>
        </svg>
      );

    case "talkee":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="8" width="90" height="24" rx="4" stroke="#db2777" strokeWidth="2.5" />
          <text x="60" y="24" fill="#111827" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="3">TALKEE</text>
        </svg>
      );

    case "nikhil":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="24" fill="#0f172a" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">Nikhil comforts</text>
        </svg>
      );

    case "swantraj":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="20" r="13" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
          <text x="18" y="26" fill="#db2777" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle">S</text>
          <circle cx="11" cy="13" r="1.5" fill="#fb7185" />
          <circle cx="25" cy="27" r="1.5" fill="#38bdf8" />
          <text x="36" y="21" fill="#db2777" fontSize="9" fontWeight="900" fontFamily="Georgia, serif">SAWANTRAJ</text>
          <text x="36" y="31" fill="#1e293b" fontSize="9" fontWeight="900" fontFamily="Georgia, serif">TEJRAJ</text>
        </svg>
      );

    case "omfurn":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="7" width="100" height="18" rx="9" fill="#f97316" />
          <text x="60" y="20" fill="white" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="1">OMFURN</text>
          <text x="60" y="31" fill="#ea580c" fontSize="4.5" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle">creation out of your dreams ®</text>
        </svg>
      );

    case "arch":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="18,8 32,28 4,28" fill="#f97316" stroke="black" strokeWidth="1.5" />
          <line x1="14" y1="24" x2="24" y2="14" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <polygon points="24,14 24,19 19,14" fill="black" />
          <text x="38" y="19" fill="black" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">ARCH</text>
          <text x="38" y="27" fill="#475569" fontSize="6" fontWeight="bold" fontFamily="system-ui, sans-serif">PHARMALABS LIMITED</text>
        </svg>
      );

    case "lionsclub":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="20" r="13" fill="#1e3a8a" />
          <circle cx="18" cy="20" r="105" stroke="#eab308" strokeWidth="1" fill="none" />
          <text x="18" y="25" fill="#eab308" fontSize="14" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle">L</text>
          <path d="M10,20 C8,18 8,14 10,12" stroke="#eab308" strokeWidth="1" fill="none" />
          <path d="M26,20 C28,18 28,14 26,12" stroke="#eab308" strokeWidth="1" fill="none" />
          <text x="36" y="20" fill="#1e3a8a" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif">LIONS</text>
          <text x="36" y="29" fill="#eab308" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.3">INTERNATIONAL</text>
        </svg>
      );

    case "lodha":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="12" x2="28" y2="12" stroke="#b45309" strokeWidth="1" />
          <line x1="10" y1="15" x2="28" y2="15" stroke="#b45309" strokeWidth="1" />
          <line x1="10" y1="18" x2="28" y2="18" stroke="#b45309" strokeWidth="1" />
          <line x1="10" y1="21" x2="28" y2="21" stroke="#b45309" strokeWidth="1" />
          <line x1="10" y1="24" x2="28" y2="24" stroke="#b45309" strokeWidth="1" />
          <line x1="10" y1="27" x2="28" y2="27" stroke="#b45309" strokeWidth="1" />
          <text x="34" y="21" fill="#78350f" fontSize="12" fontWeight="950" fontFamily="Georgia, serif" letterSpacing="0.5">LODHA</text>
          <text x="34" y="29" fill="#475569" fontSize="4.5" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.1">BUILDING A BETTER LIFE</text>
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-slate-400">
          {id.toUpperCase()}
        </div>
      );
  }
}

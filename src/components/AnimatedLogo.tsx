import { motion } from "motion/react";

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export default function AnimatedLogo({ className = "", size = 48 }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: size, height: size }}
    >
      {/* High Fidelity Vector SVG of the actual Prabhu Enterprises Logo */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(236,72,153,0.3)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Background Plate */}
        <rect x="5" y="5" width="90" height="90" rx="16" fill="#030712" stroke="#ff4500" strokeWidth="1.5" />
        
        {/* Pink Outer Card Frame */}
        <rect
          x="28"
          y="15"
          width="44"
          height="70"
          rx="6"
          stroke="#ff69b4"
          strokeWidth="3.5"
          fill="#faf6ee"
        />

        {/* Rotated Diamond Frame */}
        <polygon
          points="50,12 85,50 50,88 15,50"
          stroke="#ff69b4"
          strokeWidth="3.5"
          fill="#faf6ee"
        />

        {/* Secondary Inner Accent Line */}
        <polygon
          points="50,18 79,50 50,82 21,50"
          stroke="#ff69b4"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* PE High Contrast Typography */}
        <text
          x="50%"
          y="56%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#111827"
          fontSize="24"
          fontWeight="bold"
          fontFamily="Georgia, serif, var(--font-sans)"
        >
          PE
        </text>

        {/* Pulse Dot representing active HVAC state */}
        <circle cx="50" cy="12" r="3" fill="#ff4500">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );
}

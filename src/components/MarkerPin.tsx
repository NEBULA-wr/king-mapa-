import React, { useState } from 'react';
import { Entrepreneurship } from '../data/entrepreneurships';
import { Play, Sparkles } from 'lucide-react';

interface MarkerPinProps {
  entrepreneurship: Entrepreneurship;
  isSelected: boolean;
  isHovered: boolean;
  showLabel?: boolean;
  onSelect: (item: Entrepreneurship) => void;
  onHover: (id: number | null) => void;
  animationDelay?: number;
}

export const MarkerPin: React.FC<MarkerPinProps> = ({
  entrepreneurship,
  isSelected,
  isHovered,
  showLabel = true,
  onSelect,
  onHover,
  animationDelay = 0,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHovered || internalHover;

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group select-none"
      style={{
        transform: 'translate3d(0, 0, 0)',
        animationDelay: `${animationDelay}ms`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(entrepreneurship);
      }}
      onMouseEnter={() => {
        setInternalHover(true);
        onHover(entrepreneurship.id);
      }}
      onMouseLeave={() => {
        setInternalHover(false);
        onHover(null);
      }}
    >
      {/* Tooltip on hover / selected */}
      <div
        className={`absolute bottom-full mb-3 pointer-events-none transition-all duration-300 transform origin-bottom z-30 ${
          activeHover || isSelected
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-2xl border border-red-500/30 whitespace-nowrap flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-red-400">
            <span>#{entrepreneurship.id}</span>
            <span className="w-1 h-1 rounded-full bg-red-400" />
            <span>{entrepreneurship.sector}</span>
          </div>
          <p className="text-xs font-bold text-slate-100 mt-0.5">
            {entrepreneurship.nombre}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-amber-300 mt-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>Haz clic para ver video</span>
          </div>

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 bg-slate-900/95 border-r border-b border-red-500/30 transform rotate-45" />
        </div>
      </div>

      {/* Main 3D Pin Container */}
      <div
        className={`relative transition-all duration-300 ease-out transform ${
          isSelected
            ? 'scale-125 -translate-y-3'
            : activeHover
            ? 'scale-115 -translate-y-2'
            : 'scale-100 hover:-translate-y-1'
        }`}
      >
        {/* Pulsing Beacon Ring on the ground */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500/40 animate-pin-pulse pointer-events-none -z-10" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-red-400/20 animate-pin-pulse pointer-events-none -z-10 [animation-delay:600ms]" />

        {/* 3D Realistic Red Pin SVG (Based on the glossy reference image) */}
        <div className="relative filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.7)] drop-shadow-[0_4px_6px_rgba(180,0,0,0.4)]">
          <svg
            width="46"
            height="58"
            viewBox="0 0 46 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200"
          >
            <defs>
              {/* 3D Glossy Red Body Gradient */}
              <radialGradient
                id={`pinGrad-${entrepreneurship.id}`}
                cx="35%"
                cy="30%"
                r="65%"
                fx="30%"
                fy="25%"
              >
                <stop offset="0%" stopColor="#ff7070" />
                <stop offset="25%" stopColor="#ff2a34" />
                <stop offset="70%" stopColor="#cc0014" />
                <stop offset="100%" stopColor="#7a000a" />
              </radialGradient>

              {/* Specular highlight gradient for 3D realism */}
              <linearGradient
                id={`highlight-${entrepreneurship.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Bottom tip shadow */}
              <linearGradient
                id={`tipShadow-${entrepreneurship.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#99000d" />
                <stop offset="100%" stopColor="#3d0004" />
              </linearGradient>
            </defs>

            {/* Ground shadow beneath the tip */}
            <ellipse cx="23" cy="56" rx="8" ry="2" fill="rgba(0,0,0,0.5)" />

            {/* Pin Main 3D Silhouette */}
            <path
              d="M23 0C10.2975 0 0 10.2975 0 23C0 35.8 17.5 50.5 21.8 54.8C22.4 55.4 23.6 55.4 24.2 54.8C28.5 50.5 46 35.8 46 23C46 10.2975 35.7025 0 23 0Z"
              fill={`url(#pinGrad-${entrepreneurship.id})`}
            />

            {/* Dark right edge for cylindrical 3D depth */}
            <path
              d="M23 0C29.5 0 35.5 2.6 40 6.8C43.8 11.2 46 16.8 46 23C46 35.8 28.5 50.5 24.2 54.8C23.6 55.4 23 55.2 23 55.2V0Z"
              fill="rgba(0, 0, 0, 0.18)"
            />

            {/* Glossy top-left 3D curved highlight */}
            <ellipse
              cx="16"
              cy="14"
              rx="9"
              ry="5.5"
              transform="rotate(-25 16 14)"
              fill={`url(#highlight-${entrepreneurship.id})`}
            />

            {/* Secondary small rim highlight */}
            <circle cx="11" cy="24" r="3" fill="#ffffff" fillOpacity="0.4" />

            {/* Center numeric indicator disk */}
            <circle
              cx="23"
              cy="21"
              r="10.5"
              fill="#ffffff"
              className="transition-colors duration-200"
            />
            <circle
              cx="23"
              cy="21"
              r="8.5"
              fill={isSelected ? '#dc2626' : '#1e293b'}
            />

            {/* Number Text inside Pin */}
            <text
              x="23"
              y="25"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {entrepreneurship.id}
            </text>

            {/* Pointed bottom needle tip shadow */}
            <path
              d="M21.5 52L23 55.5L24.5 52H21.5Z"
              fill={`url(#tipShadow-${entrepreneurship.id})`}
            />
          </svg>

          {/* Active / selected badge glow */}
          {isSelected && (
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow-lg animate-bounce">
              <Sparkles className="w-3 h-3 fill-current" />
            </div>
          )}
        </div>

        {/* Shadow on terrain right under the pin point */}
        <div className="w-6 h-2 bg-black/60 rounded-full mx-auto -mt-1 blur-[1px] transform scale-y-75" />
      </div>

      {/* Discrete label pill under pin */}
      {showLabel && (
        <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/10 text-[10px] font-bold text-slate-200 shadow-md whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
          {entrepreneurship.sector}
        </div>
      )}
    </div>
  );
};

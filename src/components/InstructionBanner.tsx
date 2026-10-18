import React from 'react';
import { MousePointerClick, Play, Sparkles } from 'lucide-react';
import { Entrepreneurship } from '../data/entrepreneurships';

interface InstructionBannerProps {
  hoveredItem: Entrepreneurship | null;
  onExploreClick: () => void;
  hasInteracted: boolean;
}

export const InstructionBanner: React.FC<InstructionBannerProps> = ({
  hoveredItem,
  onExploreClick,
  hasInteracted,
}) => {
  return (
    <div className="absolute bottom-6 left-4 sm:left-6 z-20 pointer-events-auto max-w-xs sm:max-w-md">
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/15 shadow-2xl transition-all duration-300">
        {hoveredItem ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md font-mono">
              #{hoveredItem.id}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                {hoveredItem.sector} · {hoveredItem.categoria}
              </span>
              <p className="text-xs font-bold text-white truncate">
                {hoveredItem.nombre}
              </p>
            </div>
            <button
              onClick={() => onExploreClick()}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shrink-0 flex items-center gap-1 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Ver</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-xs text-slate-200">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
              <MousePointerClick className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <p className="font-semibold text-white leading-tight">
                10 Emprendimientos Activos
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Haz clic en cualquier pin rojo 3D para reproducir su video
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

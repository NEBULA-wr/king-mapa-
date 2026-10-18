import React from 'react';
import { 
  Compass, 
  ListFilter, 
  Sparkles, 
  MapPin, 
  Info,
  Volume2,
  VolumeX,
  PlaySquare
} from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onReplayTour: () => void;
  isTouring: boolean;
  totalCount: number;
  viewedCount: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onReplayTour,
  isTouring,
  totalCount,
  viewedCount,
  audioEnabled,
  onToggleAudio,
  onOpenInfo,
}) => {
  return (
    <header className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto pointer-events-auto">
      {/* 3D Acrylic Billboard container styled after reference image */}
      <div className="relative group transition-transform duration-500 ease-out hover:scale-[1.01]">
        
        {/* Decorative Top-Right Community Seal / Emblem inspired by image */}
        <div className="absolute -top-3 -right-3 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-700 via-blue-500 to-sky-400 p-0.5 shadow-xl border-2 border-white/80 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <div className="w-full h-full rounded-full bg-[#0d3b66] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
            </svg>
          </div>
        </div>

        {/* 3D Plaque Body with dimensional depth */}
        <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,10,30,0.7)] border-2 border-white/60 billboard-3d">
          
          {/* Top Royal Blue Block */}
          <div className="bg-gradient-to-r from-[#0c4076] via-[#10559e] to-[#0d4682] px-5 sm:px-6 pt-4 pb-3.5 text-white relative overflow-hidden">
            {/* Subtle gloss overlay reflection */}
            <div className="absolute -top-10 -left-10 w-40 h-24 bg-white/10 rounded-full blur-xl transform -rotate-12 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-200/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mapa Comunitario Interactivo
              </span>
              <span className="text-[11px] font-mono font-bold bg-white/15 px-2 py-0.5 rounded text-white tracking-wider border border-white/20 mr-6">
                RD 2026
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase font-display drop-shadow-sm text-balance">
              10 EMPRENDIMIENTOS<br />
              <span className="text-sky-200">DE MI COMUNIDAD</span>
            </h1>
          </div>

          {/* Bottom Clean White Block */}
          <div className="bg-slate-50 px-5 sm:px-6 py-3 border-t border-slate-200/70 text-slate-800">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">
                  Santo Domingo, República Dominicana
                </h2>
              </div>
            </div>

            {/* Metrics & Counter row */}
            <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600">
                  {totalCount} emprendimientos disponibles
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">Vistos:</span>
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono text-[11px] shadow-xs">
                  {viewedCount}/{totalCount}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Action Bar */}
          <div className="bg-slate-900/95 backdrop-blur-md px-4 sm:px-5 py-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2 text-xs">
            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
              title="Ver listado completo de los 10 emprendimientos"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Explorar Lista</span>
            </button>

            <button
              onClick={onReplayTour}
              disabled={isTouring}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border cursor-pointer ${
                isTouring
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-slate-100 border-white/15'
              }`}
              title="Vuelo cinemático desde el Caribe a Santo Domingo"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTouring ? 'Volando...' : 'Vuelo 3D'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggleAudio}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                title={audioEnabled ? "Silenciar brisa marina" : "Activar sonido ambiental marino"}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              <button
                onClick={onOpenInfo}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                title="Información del proyecto y cómo cambiar videos"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

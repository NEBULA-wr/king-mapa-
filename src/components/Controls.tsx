import React from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Navigation, 
  Eye, 
  EyeOff, 
  Layers, 
  Globe2, 
  MapPin
} from 'lucide-react';

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetSantoDomingo: () => void;
  onFullIslandView: () => void;
  onTogglePitch: () => void;
  is3D: boolean;
  onResetBearing: () => void;
  bearing: number;
  showLabels: boolean;
  onToggleLabels: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetSantoDomingo,
  onFullIslandView,
  onTogglePitch,
  is3D,
  onResetBearing,
  bearing,
  showLabels,
  onToggleLabels,
}) => {
  return (
    <div className="absolute bottom-6 right-4 sm:right-6 z-20 flex flex-col items-end gap-2.5 pointer-events-auto">
      
      {/* Quick Location presets panel */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 shadow-2xl flex flex-col gap-1">
        
        {/* Reset / Focus to Santo Domingo */}
        <button
          onClick={onResetSantoDomingo}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          title="Centrar y enfocar los 10 emprendimientos de Santo Domingo"
        >
          <MapPin className="w-3.5 h-3.5 text-red-300" />
          <span className="hidden sm:inline">Enfocar Santo Domingo</span>
          <span className="sm:hidden">Santo Domingo</span>
        </button>

        {/* Full Island Overview (República Dominicana & Caribbean) */}
        <button
          onClick={onFullIslandView}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
          title="Vista general satelital de toda la República Dominicana"
        >
          <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Vista Isla Completa</span>
          <span className="sm:hidden">Toda la Isla</span>
        </button>
      </div>

      {/* Camera & Navigation Controls Cluster */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 shadow-2xl flex flex-col items-center gap-1">
        
        {/* Compass / Bearing reset */}
        <button
          onClick={onResetBearing}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer group"
          title="Restablecer orientación al Norte"
        >
          <Navigation 
            className="w-4 h-4 text-red-500 transition-transform duration-300" 
            style={{ transform: `rotate(${-bearing}deg)` }}
          />
          <span className="sr-only">Norte</span>
        </button>

        <div className="w-5 h-px bg-white/10 my-0.5" />

        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-90"
          title="Acercar (Zoom In)"
          aria-label="Acercar mapa"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-90"
          title="Alejar (Zoom Out)"
          aria-label="Alejar mapa"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-5 h-px bg-white/10 my-0.5" />

        {/* 3D Perspective Pitch Toggle */}
        <button
          onClick={onTogglePitch}
          className={`p-2.5 rounded-xl transition-all cursor-pointer font-mono text-[11px] font-bold ${
            is3D 
              ? 'bg-blue-600/40 text-sky-300 border border-blue-400/40' 
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title={is3D ? "Cambiar a vista plana 2D" : "Cambiar a vista en perspectiva 3D"}
        >
          {is3D ? '3D' : '2D'}
        </button>

        {/* Toggle Pin Labels / Markers Info */}
        <button
          onClick={onToggleLabels}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={showLabels ? "Ocultar etiquetas de sectores" : "Mostrar etiquetas de sectores"}
        >
          {showLabels ? <Eye className="w-4 h-4 text-sky-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
        </button>
      </div>
    </div>
  );
};

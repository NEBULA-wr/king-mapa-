import React from 'react';
import { 
  X, 
  MapPin, 
  Video, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Play
} from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Acerca del Proyecto</span>
        </div>

        <h2 className="text-2xl font-black font-display text-white mt-1">
          10 Emprendimientos de Mi Comunidad
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Santo Domingo, República Dominicana · Mapa Satelital 3D Real & Showcase de Video
        </p>

        <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-white/10">
            <h3 className="font-bold text-white flex items-center gap-2 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ¿Cómo interactuar con la aplicación?
            </h3>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Haz <strong>clic o tap</strong> sobre cualquiera de los <strong>10 pines rojos 3D</strong> sobre Santo Domingo.</li>
              <li>La cámara se desplazará suavemente hacia el emprendimiento y abrirá el reproductor de video en pantalla casi completa.</li>
              <li>Puedes navegar entre emprendimientos con los botones anterior/siguiente o las flechas del teclado.</li>
              <li>Usa los controles laterales para alternar entre vista 3D inclinada y 2D, restablecer al norte, hacer zoom o activar el vuelo cinematográfico.</li>
            </ul>
          </div>

          <div className="bg-blue-950/40 rounded-2xl p-4 border border-blue-500/30">
            <h3 className="font-bold text-sky-200 flex items-center gap-2 text-sm mb-2">
              <Video className="w-4 h-4 text-sky-400" />
              ¿Cómo reemplazar los videos por los tuyos definitivos?
            </h3>
            <p className="mb-2 text-slate-300">
              Todos los datos de los 10 emprendimientos se encuentran centralizados en un único archivo editable:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl font-mono text-xs text-sky-300 border border-white/10 mb-2">
              /src/data/entrepreneurships.ts
            </div>
            <p className="text-slate-300 text-xs">
              Simplemente cambia la propiedad <code className="text-amber-300 bg-white/5 px-1 py-0.5 rounded">videoUrl</code> por tu video:
              admite tanto archivos directos en formato <strong>.mp4</strong> o <strong>.webm</strong>, como enlaces de <strong>YouTube</strong> (por ejemplo: <code className="text-sky-300">https://www.youtube.com/watch?v=...</code>). El reproductor lo detectará y renderizará automáticamente.
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Tecnología: MapLibre GL 3D · Tiles Satelitales de Alta Resolución · HTML5 Video</span>
            <span className="font-semibold text-slate-300">10 / 10 Pines Activos</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Entendido, explorar mapa
          </button>
        </div>
      </div>
    </div>
  );
};

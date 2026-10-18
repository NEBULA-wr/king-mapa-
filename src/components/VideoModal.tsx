import React, { useEffect, useRef, useState } from 'react';
import { Entrepreneurship } from '../data/entrepreneurships';
import { X, ChevronRight, ChevronLeft, Film, Play, FastForward, Image as ImageIcon } from 'lucide-react';

interface VideoModalProps {
  entrepreneurship: Entrepreneurship | null;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

// Fallback demo streams from Google Cloud Storage in case local 1.mp4..10.mp4 are not yet added
const DEMO_FALLBACK_VIDEOS: Record<number, string> = {
  1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
  5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  6: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  7: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  8: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  9: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  10: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
};

export const VideoModal: React.FC<VideoModalProps> = ({
  entrepreneurship,
  onClose,
  onSelectNext,
  onSelectPrev,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showImageIntro, setShowImageIntro] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(3);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [useFallbackVideo, setUseFallbackVideo] = useState<boolean>(false);

  // When a new entrepreneurship is loaded, show its image for 3 seconds, then start video
  useEffect(() => {
    if (!entrepreneurship) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    // Reset states for new entrepreneurship
    setShowImageIntro(true);
    setCountdown(3);
    setImageSrc(entrepreneurship.imageUrl || `/${entrepreneurship.id}.jpg`);
    setHasVideoError(false);
    setUseFallbackVideo(false);

    // 1-second countdown interval
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 3-second timer to automatically transition to video
    const timeoutId = setTimeout(() => {
      setShowImageIntro(false);
    }, 3000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectNext();
      } else if (e.key === 'ArrowLeft') {
        onSelectPrev();
      } else if (e.key === ' ' && showImageIntro) {
        // Spacebar during intro skips immediately to video
        setShowImageIntro(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [entrepreneurship, onClose, onSelectNext, onSelectPrev]);

  // When image intro ends, trigger video autoplay
  useEffect(() => {
    if (!showImageIntro && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [showImageIntro]);

  if (!entrepreneurship) return null;

  const currentVideoSrc = useFallbackVideo
    ? DEMO_FALLBACK_VIDEOS[entrepreneurship.id] || entrepreneurship.videoUrl
    : entrepreneurship.videoUrl;

  const isYouTube =
    currentVideoSrc.includes('youtube.com') ||
    currentVideoSrc.includes('youtu.be');

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || '';
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
  };

  const handleSkipIntro = () => {
    setShowImageIntro(false);
  };

  const handleImageError = () => {
    // If /1.jpg failed, try /1.png or fallback to thumbnailUrl
    if (imageSrc.endsWith('.jpg')) {
      setImageSrc(`/${entrepreneurship.id}.png`);
    } else if (imageSrc.endsWith('.png')) {
      setImageSrc(entrepreneurship.thumbnailUrl);
    } else {
      setImageSrc(entrepreneurship.thumbnailUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-black flex items-center justify-center overflow-hidden animate-fadeIn select-none">
      
      {/* 3-Second Top Progress Bar */}
      {showImageIntro && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-40 overflow-hidden">
          <div className="h-full bg-red-600 animate-[progress_3s_linear_forwards]" />
        </div>
      )}

      {/* Indicador de número de emprendimiento en pantalla (Ej: #1 de 10 · Polo Cell) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 text-white shadow-2xl pointer-events-none">
        <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center font-mono">
          {entrepreneurship.id}
        </span>
        <span className="text-xs font-mono font-bold text-slate-300">
          {entrepreneurship.id}/10
        </span>
        <span className="text-xs font-bold text-white truncate max-w-[170px] sm:max-w-xs">
          {entrepreneurship.nombre}
        </span>
      </div>

      {/* Botón X para cerrar - Esquina superior derecha */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all active:scale-95 cursor-pointer group"
        title="Cerrar (Esc)"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] transition-transform group-hover:rotate-90 duration-200" />
      </button>

      {/* Botón Siguiente y Anterior - Esquina inferior derecha */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 pointer-events-auto">
        {/* Botón Anterior */}
        <button
          onClick={onSelectPrev}
          className="p-3 sm:px-4 sm:py-3 rounded-full bg-black/60 hover:bg-white/20 text-white/90 hover:text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-sm font-semibold"
          title="Emprendimiento anterior"
          aria-label="Emprendimiento anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Botón Siguiente (Principal) */}
        <button
          onClick={onSelectNext}
          className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold backdrop-blur-md border border-red-400/40 shadow-2xl transition-all active:scale-95 cursor-pointer flex items-center gap-2 text-sm sm:text-base"
          title="Siguiente emprendimiento"
          aria-label="Siguiente emprendimiento"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL: Imagen durante 3 segundos o Video después */}
      {showImageIntro ? (
        /* PANTALLA DE IMAGEN INICIAL (3 SEGUNDOS) */
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden animate-fadeIn">
          <img
            src={imageSrc}
            alt={entrepreneurship.nombre}
            onError={handleImageError}
            className="w-full h-full object-contain sm:object-cover filter brightness-95 transition-all duration-700"
          />

          {/* Sutil overlay de degradado para resaltar información */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Pill central o inferior con indicador de cuenta regresiva (3s) */}
          <div className="absolute bottom-20 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Iniciando video en <strong>{countdown}s</strong>...</span>
            </div>

            <button
              onClick={handleSkipIntro}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Saltar directamente al video"
            >
              <span>Ver ya</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* PANTALLA DEL VIDEO (AUTOMÁTICO A LOS 3 SEGUNDOS) */
        <div className="w-full h-full flex items-center justify-center bg-black animate-fadeIn">
          {isYouTube ? (
            <iframe
              src={getYouTubeEmbedUrl(currentVideoSrc)}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={entrepreneurship.nombre}
            />
          ) : hasVideoError && !useFallbackVideo ? (
            /* Mensaje informativo si el archivo local {id}.mp4 aún no ha sido colocado en public/ */
            <div className="flex flex-col items-center justify-center text-center p-6 max-w-lg z-20">
              <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-xl">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                Esperando video: <span className="text-red-400 font-mono">{entrepreneurship.id}.mp4</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-2">
                Para reproducirlo aquí, coloca el archivo <strong className="text-white font-mono">{entrepreneurship.id}.mp4</strong> en la carpeta <strong className="text-white font-mono">public/</strong>.
              </p>
              <p className="text-xs text-slate-400 mb-6">
                Corresponde al Pin #{entrepreneurship.id}: <span className="text-slate-200 font-semibold">{entrepreneurship.nombre}</span>
              </p>

              <button
                onClick={() => setUseFallbackVideo(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Ver video de demostración temporal</span>
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={currentVideoSrc}
              poster={imageSrc}
              autoPlay
              controls
              playsInline
              onError={() => {
                if (!useFallbackVideo) {
                  setHasVideoError(true);
                }
              }}
              className="w-full h-full object-contain bg-black"
            />
          )}
        </div>
      )}
    </div>
  );
};

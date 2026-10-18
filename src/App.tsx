/**
 * 10 Emprendimientos de Mi Comunidad
 * Santo Domingo, República Dominicana
 * 
 * Mapa satelital 3D realista con 10 pines interactivos y reproductor a pantalla completa.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { EMPRENDIMIENTOS, Entrepreneurship } from './data/entrepreneurships';
import { Map } from './components/Map';
import { VideoModal } from './components/VideoModal';
import { Controls } from './components/Controls';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<Entrepreneurship | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Map controls container ref/callbacks
  const [controls, setControls] = useState<{
    zoomIn: () => void;
    zoomOut: () => void;
    resetSantoDomingo: () => void;
    fullIslandView: () => void;
    togglePitch: () => void;
    resetBearing: () => void;
    bearing: number;
    is3D: boolean;
  } | null>(null);

  const registerControls = useCallback((ctrls: typeof controls) => {
    setControls(ctrls);
  }, []);

  // Handle selection of an entrepreneurship from pin click
  const handleSelectItem = useCallback((item: Entrepreneurship) => {
    setSelectedItem(item);
  }, []);

  // Navigation inside the Video Modal
  const currentIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return EMPRENDIMIENTOS.findIndex((e) => e.id === selectedItem.id);
  }, [selectedItem]);

  const handleSelectNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % EMPRENDIMIENTOS.length;
    handleSelectItem(EMPRENDIMIENTOS[nextIdx]);
  }, [currentIndex, handleSelectItem]);

  const handleSelectPrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + EMPRENDIMIENTOS.length) % EMPRENDIMIENTOS.length;
    handleSelectItem(EMPRENDIMIENTOS[prevIdx]);
  }, [currentIndex, handleSelectItem]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030e1e] font-sans">
      {/* 3D Satellite Map Canvas with 10 interactive pins */}
      <Map
        onSelectEntrepreneurship={handleSelectItem}
        selectedId={selectedItem?.id ?? null}
        hoveredId={hoveredId}
        setHoveredId={setHoveredId}
        showLabels={showLabels}
        registerControls={registerControls}
      />

      {/* Discrete Navigation HUD Controls */}
      {controls && (
        <Controls
          onZoomIn={controls.zoomIn}
          onZoomOut={controls.zoomOut}
          onResetSantoDomingo={controls.resetSantoDomingo}
          onFullIslandView={controls.fullIslandView}
          onTogglePitch={controls.togglePitch}
          is3D={controls.is3D}
          onResetBearing={controls.resetBearing}
          bearing={controls.bearing}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
        />
      )}

      {/* Full-Screen Video Modal */}
      <VideoModal
        entrepreneurship={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </div>
  );
}

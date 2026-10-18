import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap, Marker as MapLibreMarker, StyleSpecification } from 'maplibre-gl';
import { createPortal } from 'react-dom';
import { Entrepreneurship, EMPRENDIMIENTOS } from '../data/entrepreneurships';
import { MarkerPin } from './MarkerPin';

interface MapProps {
  onSelectEntrepreneurship: (item: Entrepreneurship) => void;
  selectedId: number | null;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  showLabels: boolean;
  onMapReady?: (map: MapLibreMap) => void;
  registerControls?: (controls: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetSantoDomingo: () => void;
    fullIslandView: () => void;
    togglePitch: () => void;
    resetBearing: () => void;
    bearing: number;
    is3D: boolean;
  }) => void;
}

// Key geographical camera coordinates
const SANTO_DOMINGO_COORDS = {
  center: [-69.8885, 18.4835] as [number, number],
  zoom: 14.3,
  pitch: 48,
  bearing: -12,
};

const CARIBBEAN_WIDE_COORDS = {
  center: [-70.4, 18.6] as [number, number],
  zoom: 6.8,
  pitch: 35,
  bearing: -15,
};

export const Map: React.FC<MapProps> = ({
  onSelectEntrepreneurship,
  selectedId,
  hoveredId,
  setHoveredId,
  showLabels,
  onMapReady,
  registerControls,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<MapLibreMarker[]>([]);

  const [markerPortals, setMarkerPortals] = useState<{
    container: HTMLElement;
    item: Entrepreneurship;
    index: number;
  }[]>([]);

  const [currentBearing, setCurrentBearing] = useState<number>(-18);
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [pinsVisible, setPinsVisible] = useState<boolean>(false);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Photorealistic Satellite Style Configuration (ESRI World Imagery)
    const style: maplibregl.StyleSpecification = {
      version: 8,
      name: 'DominicanRepublicSatellite3D',
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 19,
          attribution: 'Esri, Maxar, Earthstar Geographics',
        },
      },
      layers: [
        {
          id: 'ocean-backdrop',
          type: 'background',
          paint: {
            'background-color': '#04142a',
          },
        },
        {
          id: 'satellite-tiles',
          type: 'raster',
          source: 'esri-satellite',
          paint: {
            'raster-saturation': 0.18,
            'raster-contrast': 0.12,
            'raster-fade-duration': 300,
          },
        },
      ],
      sky: {
        'sky-color': '#0a2342',
        'horizon-color': '#1d4ed8',
        'fog-color': '#091d36',
      },
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: CARIBBEAN_WIDE_COORDS.center,
      zoom: CARIBBEAN_WIDE_COORDS.zoom,
      pitch: CARIBBEAN_WIDE_COORDS.pitch,
      bearing: CARIBBEAN_WIDE_COORDS.bearing,
      maxPitch: 75,
      dragRotate: true,
      touchPitch: true,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Track rotation and pitch changes
    map.on('rotate', () => {
      setCurrentBearing(map.getBearing());
    });

    map.on('pitch', () => {
      setIs3DMode(map.getPitch() > 10);
    });

    map.on('load', () => {
      if (onMapReady) onMapReady(map);

      // Perform initial cinematic fly-in camera choreography
      // Caribbean wide -> Dominican Republic -> Santo Domingo perspective
      setTimeout(() => {
        map.flyTo({
          center: SANTO_DOMINGO_COORDS.center,
          zoom: SANTO_DOMINGO_COORDS.zoom,
          pitch: SANTO_DOMINGO_COORDS.pitch,
          bearing: SANTO_DOMINGO_COORDS.bearing,
          duration: 3800,
          essential: true,
        });

        // Stagger pin entrance right as the camera settles on Santo Domingo
        setTimeout(() => {
          setPinsVisible(true);
        }, 2200);
      }, 700);

      // Create DOM containers for the 10 markers
      const portals: {
        container: HTMLElement;
        item: Entrepreneurship;
        index: number;
      }[] = [];

      EMPRENDIMIENTOS.forEach((item, index) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'marker-pin-wrapper transition-all duration-700 transform';
        markerEl.style.opacity = '0';
        markerEl.style.transform = 'translateY(-20px) scale(0.6)';

        const marker = new maplibregl.Marker({
          element: markerEl,
          anchor: 'bottom',
        })
          .setLngLat([item.lng, item.lat])
          .addTo(map);

        markersRef.current.push(marker);
        portals.push({
          container: markerEl,
          item,
          index,
        });
      });

      setMarkerPortals(portals);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
    };
  }, []);

  // Progressive reveal of pins once camera arrives
  useEffect(() => {
    if (!pinsVisible) return;

    markerPortals.forEach(({ container, index }) => {
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0) scale(1)';
      }, index * 120);
    });
  }, [pinsVisible, markerPortals]);

  // Expose control actions to parent
  useEffect(() => {
    if (!registerControls || !mapInstanceRef.current) return;

    registerControls({
      zoomIn: () => {
        mapInstanceRef.current?.zoomIn({ duration: 400 });
      },
      zoomOut: () => {
        mapInstanceRef.current?.zoomOut({ duration: 400 });
      },
      resetSantoDomingo: () => {
        mapInstanceRef.current?.flyTo({
          center: SANTO_DOMINGO_COORDS.center,
          zoom: SANTO_DOMINGO_COORDS.zoom,
          pitch: SANTO_DOMINGO_COORDS.pitch,
          bearing: SANTO_DOMINGO_COORDS.bearing,
          duration: 2000,
          essential: true,
        });
      },
      fullIslandView: () => {
        mapInstanceRef.current?.flyTo({
          center: CARIBBEAN_WIDE_COORDS.center,
          zoom: CARIBBEAN_WIDE_COORDS.zoom,
          pitch: 35,
          bearing: -15,
          duration: 2200,
          essential: true,
        });
      },
      togglePitch: () => {
        const currentPitch = mapInstanceRef.current?.getPitch() || 0;
        const targetPitch = currentPitch > 25 ? 0 : 55;
        mapInstanceRef.current?.easeTo({
          pitch: targetPitch,
          duration: 800,
        });
        setIs3DMode(targetPitch > 10);
      },
      resetBearing: () => {
        mapInstanceRef.current?.resetNorth({ duration: 600 });
      },
      bearing: currentBearing,
      is3D: is3DMode,
    });
  }, [registerControls, currentBearing, is3DMode]);

  // Handle pin click with smooth camera transition to coordinates
  const handleMarkerClick = useCallback(
    (item: Entrepreneurship) => {
      const map = mapInstanceRef.current;
      if (map) {
        // Smooth cinematic glide toward selected pin
        map.flyTo({
          center: [item.lng, item.lat],
          zoom: Math.max(map.getZoom(), 14.2),
          pitch: 56,
          bearing: map.getBearing() - 5,
          duration: 1400,
          essential: true,
        });
      }

      onSelectEntrepreneurship(item);
    },
    [onSelectEntrepreneurship]
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030e1e]">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric depth vignette & ocean ambient lighting overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(2,12,28,0.7)]" />

      {/* Render React portals for each of the 10 markers */}
      {markerPortals.map(({ container, item, index }) =>
        createPortal(
          <MarkerPin
            key={item.id}
            entrepreneurship={item}
            isSelected={selectedId === item.id}
            isHovered={hoveredId === item.id}
            showLabel={showLabels}
            onSelect={handleMarkerClick}
            onHover={setHoveredId}
            animationDelay={index * 100}
          />,
          container
        )
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Entrepreneurship } from '../data/entrepreneurships';
import { 
  X, 
  Search, 
  Play, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface DrawerListProps {
  isOpen: boolean;
  onClose: () => void;
  entrepreneurships: Entrepreneurship[];
  selectedId: number | null;
  onSelect: (item: Entrepreneurship) => void;
  onHover: (id: number | null) => void;
}

export const DrawerList: React.FC<DrawerListProps> = ({
  isOpen,
  onClose,
  entrepreneurships,
  selectedId,
  onSelect,
  onHover,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  if (!isOpen) return null;

  const categories = ['todos', ...Array.from(new Set(entrepreneurships.map((e) => e.categoria)))];

  const filteredItems = entrepreneurships.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = categoryFilter === 'todos' || item.categoria === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-40 flex justify-start pointer-events-auto">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg h-full bg-slate-900 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col z-50 text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Directorio Comunitario
              </span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-0.5">
              10 Emprendimientos
            </h2>
            <p className="text-xs text-slate-400">
              Santo Domingo, República Dominicana
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, sector o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Quick Categories list */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'todos' ? 'Todos (10)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Entrepreneurships List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedId;

            return (
              <div
                key={item.id}
                onMouseEnter={() => onHover(item.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => {
                  onSelect(item);
                }}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-blue-900/30 border-blue-500/60 shadow-lg ring-1 ring-blue-500/40'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Numeric pin badge */}
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white font-black text-sm flex items-center justify-center shadow-md font-mono group-hover:scale-105 transition-transform">
                    {item.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 truncate">
                        {item.categoria}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {item.sector}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5 truncate">
                      {item.nombre}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.descripcion}
                    </p>

                    {/* Bottom CTA trigger */}
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {item.destacado}
                      </span>
                      <div className="flex items-center gap-1 text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Ver video</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">No se encontraron resultados para la búsqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('todos');
                }}
                className="mt-2 text-xs text-blue-400 hover:underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 text-xs text-slate-400 flex items-center justify-between">
          <span>Total: 10 emprendimientos</span>
          <span className="text-[11px] text-slate-500">República Dominicana</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ onFilterChange, currentGenre }) => {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await movieService.getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <button
            onClick={() => onFilterChange('genre', null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !currentGenre ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface/50 text-white/60 hover:bg-surface hover:text-white border border-white/5'
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onFilterChange('genre', genre.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                currentGenre === genre.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface/50 text-white/60 hover:bg-surface hover:text-white border border-white/5'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
             onClick={() => setIsOpen(!isOpen)}
             className="flex items-center gap-2 px-4 py-2 bg-surface/50 rounded-lg border border-white/5 text-sm hover:border-white/20 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort & Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mt-4 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold">Sort By</label>
              <select 
                onChange={(e) => onFilterChange('sort', e.target.value)}
                className="bg-background/50 border border-white/10 rounded-lg w-full px-3 py-2 text-sm outline-none focus:border-primary/50"
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="release_date.desc">Release Date</option>
                <option value="revenue.desc">Revenue</option>
              </select>
            </div>
            
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold">Release Year</label>
              <input 
                type="number" 
                placeholder="2024"
                onChange={(e) => onFilterChange('year', e.target.value)}
                className="bg-background/50 border border-white/10 rounded-lg w-full px-3 py-2 text-sm outline-none focus:border-primary/50"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold">Language</label>
              <select 
                onChange={(e) => onFilterChange('lang', e.target.value === 'all' ? '' : e.target.value)}
                className="bg-background/50 border border-white/10 rounded-lg w-full px-3 py-2 text-sm outline-none focus:border-primary/50"
              >
                <option value="all">All Languages</option>
                <option value="en">English</option>
                <option value="ta">Tamil</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
              </select>
            </div>

            <div className="flex items-end">
               <button 
                 onClick={() => setIsOpen(false)}
                 className="w-full btn-primary py-2 text-sm"
               >
                  Apply Filters
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;

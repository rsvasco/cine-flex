import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus, Check, Heart } from 'lucide-react';
import { getImageUrl } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { addToWatchlist, isInWatchlist, toggleFavorite, isInFavorites } = useMovieContext();
  
  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isInFavorites(movie.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-surface rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-primary/20"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(movie);
              }}
              className={`p-2 rounded-full backdrop-blur-xl border border-white/10 transition-colors ${
                inFavorites ? 'bg-primary text-white' : 'bg-black/40 text-white/70 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${inFavorites ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                   <Star className="w-3 h-3 text-secondary fill-current" />
                   <span className="text-xs font-bold text-white">{movie.vote_average?.toFixed(1)}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/60">
                   {movie.release_date?.split('-')[0]}
                </span>
             </div>
             
             <div className="flex gap-2">
               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   // Handled by Link parent but we want to stop propagation for nested buttons if they were separate
                 }}
                 className="flex-1 btn-primary py-1.5 text-xs rounded-lg flex items-center justify-center gap-1"
               >
                 <Play className="w-3 h-3 fill-current" /> Details
               </button>
               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   addToWatchlist(movie);
                 }}
                 className={`p-1.5 rounded-lg border border-white/20 transition-colors ${
                   inWatchlist ? 'bg-white text-black' : 'bg-black/40 text-white hover:bg-white/10'
                 }`}
               >
                 {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
               </button>
             </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-[11px] text-white/50 mt-1 uppercase tracking-widest">
           {movie.original_language} • Movie
        </p>
      </div>
      
      {/* Premium Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 rounded-2xl group-hover:from-primary/20 group-hover:via-accent/10 group-hover:to-secondary/10 transition-all duration-500 -z-10 blur-xl" />
    </motion.div>
  );
};

export default MovieCard;

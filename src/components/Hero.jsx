import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Star, Plus, Check } from 'lucide-react';
import { getImageUrl } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const Hero = ({ movie, isLoading }) => {
  const { addToWatchlist, isInWatchlist } = useMovieContext();

  if (isLoading || !movie) {
    return (
      <div className="relative h-[80vh] w-full bg-surface animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Poster */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="flex items-center gap-1 bg-secondary/20 text-secondary px-2 py-0.5 rounded text-sm font-bold border border-secondary/30">
                <Star className="w-3.5 h-3.5 fill-current" />
                {movie.vote_average?.toFixed(1)}
             </div>
             <span className="text-white/60 font-medium">
                {movie.release_date?.split('-')[0]} • Movie
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-cinematic mb-6 leading-tight">
            {movie.title}
          </h1>
          
          <p className="text-lg text-white/70 mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to={`/movie/${movie.id}`} className="btn-primary px-8 py-4 text-lg group">
              <Play className="fill-current group-hover:scale-110 transition-transform" />
              Watch Trailer
            </Link>
            <button 
              onClick={() => addToWatchlist(movie)}
              className="btn-outline px-8 py-4 text-lg border-white/10 hover:border-white/30"
            >
              {inWatchlist ? <Check className="w-5 h-5 text-green-500" /> : <Plus className="w-5 h-5" />}
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            <Link to={`/movie/${movie.id}`} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <Info className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Elements */}
      <div className="absolute bottom-12 left-0 right-0 z-10">
         <div className="container mx-auto px-8 flex items-center justify-between">
            <div className="flex gap-4">
               {/* Scroll indicator or social proofs can go here */}
            </div>
            <div className="flex gap-2">
               <div className="w-12 h-1 bg-primary rounded-full" />
               <div className="w-8 h-1 bg-white/20 rounded-full" />
               <div className="w-8 h-1 bg-white/20 rounded-full" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Hero;

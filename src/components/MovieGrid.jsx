import React from 'react';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

const MovieGrid = ({ movies, title, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-12">
        {title && <h2 className="text-2xl font-bold mb-8 font-cinematic uppercase tracking-widest">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-surface rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      {title && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-bold font-cinematic uppercase tracking-widest border-l-4 border-primary pl-4">
            {title}
          </h2>
          <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
          {/* Add 'View All' link if needed */}
        </motion.div>
      )}
      
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
      
      {movies?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/50 text-lg">No movies found</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;

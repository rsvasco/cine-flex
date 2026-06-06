import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import { motion } from 'framer-motion';
import { Bookmark, Heart } from 'lucide-react';

const WatchlistPage = () => {
  const { watchlist, favorites } = useMovieContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-12">
           <div className="p-4 bg-primary/20 text-primary rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
              <Bookmark className="w-8 h-8 fill-current" />
           </div>
           <div>
              <h1 className="text-4xl font-black font-cinematic uppercase tracking-tighter">Your Watchlist</h1>
              <p className="text-white/40 font-medium">Saved movies you want to watch later</p>
           </div>
        </div>

        {watchlist.length > 0 ? (
          <MovieGrid movies={watchlist} />
        ) : (
          <div className="text-center py-32 glass rounded-3xl border-dashed border-white/10">
             <div className="mb-6 opacity-20 flex justify-center">
                <Bookmark className="w-20 h-20" />
             </div>
             <p className="text-xl text-white/50 mb-8 font-medium">Your watchlist is currently empty</p>
             <button onClick={() => window.location.href = '/'} className="btn-primary">
                Explore Movies
             </button>
          </div>
        )}

        <div className="mt-32 flex items-center gap-4 mb-12">
           <div className="p-4 bg-secondary/20 text-secondary rounded-2xl border border-secondary/20 shadow-lg shadow-secondary/5">
              <Heart className="w-8 h-8 fill-current" />
           </div>
           <div>
              <h1 className="text-4xl font-black font-cinematic uppercase tracking-tighter">Your Favorites</h1>
              <p className="text-white/40 font-medium">Movies that stole your heart</p>
           </div>
        </div>

        {favorites.length > 0 ? (
          <MovieGrid movies={favorites} />
        ) : (
          <div className="text-center py-32 glass rounded-3xl border-dashed border-white/10">
             <div className="mb-6 opacity-20 flex justify-center">
                <Heart className="w-20 h-20" />
             </div>
             <p className="text-xl text-white/50 font-medium">No favorites added yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WatchlistPage;

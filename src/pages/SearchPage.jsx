import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const { data } = await movieService.searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-white/5 text-white rounded-2xl border border-white/10">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black font-cinematic uppercase tracking-tighter">
              Results for: <span className="text-primary">"{query}"</span>
            </h1>
            <p className="text-white/40 font-medium">Found {movies.length} movies matching your search</p>
          </div>
        </div>

        <MovieGrid movies={movies} isLoading={isLoading} />
        
        {!isLoading && movies.length === 0 && (
          <div className="text-center py-20 opacity-50">
             <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
             <p className="text-xl">No movies found for your search term</p>
             <p className="mt-2">Try different keywords or check for typos</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;

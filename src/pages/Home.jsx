import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/api';
import Hero from '../components/Hero';
import MovieGrid from '../components/MovieGrid';
import FilterBar from '../components/FilterBar';
import { motion } from 'framer-motion';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: null,
    sort: 'popularity.desc',
    year: null,
    lang: ''
  });

  const listType = searchParams.get('type') || 'popular';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        
        // If there are specific filters (genre, year etc), use discover
        if (filters.genre || filters.year) {
          response = await movieService.discoverMovies({
            with_genres: filters.genre,
            year: filters.year,
            sort_by: filters.sort,
            with_original_language: filters.lang,
            page: 1
          });
        } else {
          // Otherwise use standard categories
          switch (listType) {
            case 'top_rated': response = await movieService.getTopRated(); break;
            case 'upcoming': response = await movieService.getUpcoming(); break;
            case 'now_playing': response = await movieService.getNowPlaying(); break;
            default: response = await movieService.getPopular();
          }
        }

        setMovies(response.data.results);
        
        // Pick a random movie for the hero from the first page if not already set or if list changed
        if (!featuredMovie || listType !== 'popular') {
          setFeaturedMovie(response.data.results[Math.floor(Math.random() * Math.min(10, response.data.results.length))]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [listType, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getPageTitle = () => {
    if (filters.genre) return 'Filtered Results';
    switch (listType) {
      case 'top_rated': return 'Top Rated Classics';
      case 'upcoming': return 'Coming Soon';
      case 'now_playing': return 'Now Playing in Theaters';
      default: return 'Trending Movies';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <Hero movie={featuredMovie} isLoading={isLoading} />
      
      <div className="relative z-20 -mt-20">
         <FilterBar onFilterChange={handleFilterChange} currentGenre={filters.genre} />
      </div>

      <MovieGrid 
        movies={movies} 
        title={getPageTitle()} 
        isLoading={isLoading} 
      />
      
      <div className="container mx-auto px-8 py-10 flex justify-center">
         <button className="btn-outline group">
            Load More Movies
            <motion.span 
              animate={{ y: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
               ↓
            </motion.span>
         </button>
      </div>
    </motion.div>
  );
};

export default Home;

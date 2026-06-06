import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService, getImageUrl } from '../services/api';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Globe, Play, Plus, Check, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWatchlist, isInWatchlist, toggleFavorite, isInFavorites } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const { data } = await movieService.getDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!movie) return null;

  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isInFavorites(movie.id);
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer') || movie.videos?.results?.[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      {/* Immersive Header */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <Link to="/" className="absolute top-24 left-4 md:top-28 md:left-8 p-3 glass rounded-full hover:bg-white/10 transition-all z-20 group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 -mt-20 sm:-mt-32 lg:-mt-64 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Poster */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full lg:w-80 shrink-0 flex flex-col items-center lg:items-stretch"
          >
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-48 sm:w-64 lg:w-full rounded-2xl shadow-2xl shadow-black/50 border border-white/5"
            />
            
            <div className="mt-8 hidden lg:flex flex-col gap-3 w-full">
               <button 
                 onClick={() => addToWatchlist(movie)}
                 className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                   inWatchlist ? 'bg-white text-black' : 'glass hover:bg-white/10'
                 }`}
               >
                 {inWatchlist ? <Check /> : <Plus />}
                 {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
               </button>
               <button 
                 onClick={() => toggleFavorite(movie)}
                 className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                   inFavorites ? 'bg-primary text-white' : 'glass hover:bg-white/10'
                 }`}
               >
                 <Heart className={inFavorites ? 'fill-current' : ''} />
                 {inFavorites ? 'Favorited' : 'Add to Favorites'}
               </button>
            </div>
          </motion.div>

          {/* Right: Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
               {movie.genres?.map(g => (
                 <span key={g.id} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    {g.name}
                 </span>
               ))}
               <div className="h-1 w-1 bg-white/30 rounded-full" />
               <span className="text-white/60 text-sm font-medium uppercase tracking-widest">{movie.status}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-cinematic mb-6 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mb-8 text-white/70">
               <div className="flex items-center gap-2">
                  <Star className="text-secondary fill-current w-5 h-5" />
                  <span className="text-xl font-bold text-white">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-xs text-white/40">({movie.vote_count} votes)</span>
               </div>
               <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{movie.runtime} min</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium uppercase">{movie.original_language}</span>
               </div>
            </div>

            <div className="mb-12">
               <h3 className="text-xl font-bold mb-4 font-cinematic uppercase tracking-widest text-white/50">Overview</h3>
               <p className="text-lg text-white/80 leading-relaxed max-w-4xl">
                  {movie.overview}
               </p>
            </div>

            {/* Actions (Mobile Only) */}
            <div className="lg:hidden flex flex-wrap gap-4 mb-12">
               <button 
                 onClick={() => addToWatchlist(movie)}
                 className="flex-1 btn-primary py-4"
               >
                 {inWatchlist ? <Check /> : <Plus />} Watchlist
               </button>
               <button 
                 onClick={() => toggleFavorite(movie)}
                 className="p-4 glass rounded-xl"
               >
                 <Heart className={inFavorites ? 'fill-current text-primary' : ''} />
               </button>
            </div>

            {/* Cast Section */}
            <div className="mb-16">
               <h3 className="text-xl font-bold mb-6 font-cinematic uppercase tracking-widest text-white/50">Top Cast</h3>
               <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                  {movie.credits?.cast?.slice(0, 8).map(person => (
                    <div key={person.id} className="w-24 shrink-0">
                       <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white/5 shadow-lg">
                          <img 
                            src={getImageUrl(person.profile_path, 'w185')} 
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                       </div>
                       <p className="text-xs font-bold text-center line-clamp-1">{person.name}</p>
                       <p className="text-[10px] text-white/40 text-center line-clamp-1">{person.character}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Trailer Embed */}
            {trailer && (
              <div className="mb-16">
                 <h3 className="text-xl font-bold mb-6 font-cinematic uppercase tracking-widest text-white/50">Official Trailer</h3>
                 <div className="aspect-video w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        <div className="mt-20">
           <MovieGrid 
             movies={movie.recommendations?.results?.slice(0, 6)} 
             title="Recommended For You" 
           />
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetailsPage;

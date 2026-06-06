import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist((prev) => [movie, ...prev]);
      toast.success(`${movie.title} added to watchlist`, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #ffffff1a',
        },
      });
    } else {
      removeFromWatchlist(movie.id);
    }
  };

  const removeFromWatchlist = (movieId) => {
    const movie = watchlist.find(m => m.id === movieId);
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    if (movie) {
      toast.error(`${movie.title} removed from watchlist`, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #ffffff1a',
        },
      });
    }
  };

  const toggleFavorite = (movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      setFavorites((prev) => [movie, ...prev]);
      toast.success(`${movie.title} added to favorites`, {
        icon: '❤️',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #ffffff1a',
        },
      });
    } else {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      toast.error(`${movie.title} removed from favorites`, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #ffffff1a',
        },
      });
    }
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);
  const isInFavorites = (id) => favorites.some((m) => m.id === id);

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        favorites,
        addToWatchlist,
        removeFromWatchlist,
        toggleFavorite,
        isInWatchlist,
        isInFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

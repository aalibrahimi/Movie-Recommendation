import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieRecommendation = () => {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/movies/${activeGenre}`);
        if (Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeGenre]);

  if (loading) {
    return <p className="text-center my-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center my-8 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-8">Movie Recommendations</h1>
      <div className="flex justify-center mb-8 space-x-4">
        <button
          aria-label="View popular movies"
          className={`px-4 py-2 rounded ${activeGenre === 'popular' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveGenre('popular')}
        >
          Popular
        </button>
        <button
          aria-label="View top-rated movies"
          className={`px-4 py-2 rounded ${activeGenre === 'top_rated' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveGenre('top_rated')}
        >
          Top Rated
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full h-64 object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <p className="text-sm text-gray-600">{movie.overview.slice(0, 100)}...</p>
              </div>
              <div className="p-4 bg-gray-100 text-sm text-gray-500">
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendation;

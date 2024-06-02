import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCart from './MovieCart';

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
        setMovies(response.data.Search || []);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="p-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <h1 className='font-bold'>Search results for : {searchTerm}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCart key={movie.imdbID} movie={movie}/>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;

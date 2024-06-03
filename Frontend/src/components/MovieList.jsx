import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCartByList from './MovieCartByList';

const MovieList = () => {

  const data1=useParams();
  const listId=data1.listId
//   console.log(listId)
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://fascal-assignment-movie-website.onrender.com/api/lists/user/${listId}`);
        console.log(response.data.list.movies)
        // console.log(response)
        setMovies(response.data.list.movies);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [listId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
          {/* <MovieCartByList key={imdbId} imdbId={imdbId} /> */}
        
      </ul>
    </div>
  );
};

export default MovieList;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieInfo = () => {
  const { title } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/movie?title=${title}`);
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (title) {
      fetchMovieData();
    }
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>MovieInfo</div>
      <h1>{title}</h1>
      {movieData && (
        <div>
          <h2>{movieData.Title}</h2>
          <p>{movieData.Plot}</p>
          <p><strong>Director:</strong> {movieData.Director}</p>
          <p><strong>Actors:</strong> {movieData.Actors}</p>
          <p><strong>Year:</strong> {movieData.Year}</p>
          <img src={movieData.Poster} alt={movieData.Title} />
        </div>
      )}
    </>
  );
};

export default MovieInfo;
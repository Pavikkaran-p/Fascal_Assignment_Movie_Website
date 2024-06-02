import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCartByList = () => {
  const data1=useParams();
  const imdbId=data1.imdbId
  console.log(data1)
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=c6412e69`);
        console.log("Hiiiiii")
        console.log(response)
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Link to={`/movie/${imdbId}`}>
        <div key={imdbId} className="border border-gray-300 rounded-md p-2">
          <img src={movieData.Poster} alt={movieData.Title} className="w-full h-48 object-cover mb-2" />
          <h2 className="text-lg font-semibold">{movieData.Title}</h2>
          <p className="text-sm">{movieData.Year}</p>
        </div>
      </Link>
    </>
  );
};

export default MovieCartByList;

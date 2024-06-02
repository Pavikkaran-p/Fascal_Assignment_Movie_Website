import React from 'react'
import { Link } from 'react-router-dom'

const MovieCart = ({movie}) => {
  
  return (
    <>
      <Link to={`/movie/${movie.imdbID}`}>
      <div key={movie.imdbID} className="border border-gray-300 rounded-md p-2">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{movie.Title}</h2>
            <p className="text-sm">{movie.Year}</p>
      </div>
      </Link>
    </>
  )
}

export default MovieCart
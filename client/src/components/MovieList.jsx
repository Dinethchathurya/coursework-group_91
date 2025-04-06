import React, { useState, useEffect } from "react";
import "./style/MovieList.css";

function MovieList() {
  const BASE_URL = "http://localhost:9000";

  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/movie/movies`); 
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json(); 
        setMovies(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, []); 

  const handleBuyTicketClick = (movieId) => {
    window.location.href = `/buyticket/${movieId}`;
  };

  if (loading) {
    return <div className="text-center text-white">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="text-center p-5 bg-[#000025]">
      <h2 className="text-3xl font-semibold uppercase tracking-wide mb-7 mt-2">
        Now Showing
      </h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <div className="movie-image-container">
              <img
                src={movie.cover}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-buttons">
                <button
                  className="buy-ticket"
                  onClick={() => handleBuyTicketClick(movie._id)}
                >
                  Buy Tickets
                </button>
                <a href={movie.imdb} target="_blank" rel="noopener noreferrer">
                  <button className="more-info">More Info</button>
                </a>
              </div>
            </div>
            <h3 className="movie-title text-white">{movie.title}</h3>
            <p className="movie-status text-gray-400">{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
import React, { useState } from "react";
import "./style/Upcoming.css";
import movies from "../constant/movies";

function UpcomingMovies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const handleWatchTrailerClick = (trailerUrl) => {
        setTrailerUrl(trailerUrl);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setTrailerUrl(""); 
      };
    
      const handleMoreInfoClick = (movieId) => {
        window.location.href = `/movies/${movieId}`;
      };

      return (
        <div className="text-center p-5 bg-white">

<h2 className="text-3xl font-semibold uppercase tracking-wide mb-7 mt-2 text-black">
        Upcoming Movies
      </h2>

      <div className="movie-grid">
        {movies
          .filter((movie) => movie.status === "UPCOMING")
          .map((movie, index) => (
            <div className="movie-card" key={index}>
              <div className="movie-image-container">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-buttons">

                  <button
                    className="watch-trailer"
                    onClick={() => handleWatchTrailerClick(movie.trailerUrl)}
                  >
                    Trailer
                  </button>

                  <a href={movie.info} target="_blank">
                    <button className="more-info">More Info</button>
                  </a>
                </div>
              </div>
              <h3 className="movie-title text-black">{movie.title}</h3>
              <p className="movie-status">{movie.status}</p>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="ss" onClick={handleCloseModal}>
              X
            </button>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${
                trailerUrl.split("v=")[1]
              }?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

</div>
  );
}

export default UpcomingMovies;
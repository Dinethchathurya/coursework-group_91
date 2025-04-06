import React, { useEffect, useState } from "react";
import movies from "../constant/movies";
import { Link } from "react-router-dom";

function Slider() {
  const images = movies
    .filter((movie) => movie.cover)
    .map((movie) => movie.cover);
  const mobileImages = movies.map((movieMobile) => movieMobile.image);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentMovie = movies[currentImageIndex];

  return (
    <div className="relative w-full h-auto overflow-hidden">
      <Link className="block" to="/buytickets">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-30 bg-gradient-to-b from-[#020025] to-transparent z-10"></div>

          <h2 className="absolute inset-x-8 bottom-0 h-32 z-20 text-[#EC0D6E] text-2xl font-regular">
            {currentMovie.status}
            <br />
            <span className="text-white text-3xl">{currentMovie.title}</span>
            <br />
            <span className="text-white text-sm bg-[#EC0D6E] p-1">
              Book Now
            </span>
          </h2>

          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020025] to-transparent z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[#020025] bg-opacity-15"></div>
          <img
            src={images[currentImageIndex]}
            alt={`Movie Poster ${currentImageIndex + 1}`}
            className="w-full h-auto block hidden sm:block"
          />
          <img
            src={mobileImages[currentImageIndex]}
            alt={`Movie Poster ${currentImageIndex + 1}`}
            className="w-full h-auto block block sm:hidden"
          />
        </div>
      </Link>
    </div>
  );
}

export default Slider;

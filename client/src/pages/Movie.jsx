import React from "react";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import UpcomingMovies from "../components/UpcomingList";

const Movie = () => {
    return (
        <div>

            <MovieList/>
            <UpcomingMovies/>

        </div>
    );
}

export default Movie;
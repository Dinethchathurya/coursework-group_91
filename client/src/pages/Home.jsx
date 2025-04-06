import React from "react";

import MovieList from "../components/MovieList";

import Slider from "../components/Slider";
import Faq from "../components/Faq";

function Home(){
    return(
        <div>

            <Slider/>
            <MovieList />
            <Faq />

        </div>
    );
}

export default Home;
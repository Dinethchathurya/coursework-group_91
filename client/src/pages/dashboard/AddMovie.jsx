import React from "react";

import MovieForm from "../../components/MovieForm";

function AddMovie() {
  return (
    <div>
      <div className="text-xl pb-4 text-center text-black">Add Movie</div>
      <div className="">
        <MovieForm />
      </div>
    </div>
  );
}

export default AddMovie;

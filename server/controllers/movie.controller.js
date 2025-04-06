import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";


export const addMovie = async (req,res) => {

    const {title,genre,dates,time,price,cover,poster,imdb} = req.body;

    if (
        !title || !genre || !dates || !time || !price || !cover || !poster || !imdb
) {
        return res.status(422).json({ message: "Please provide all required fields." });
      }
 const adminId = req.user.id;

 if (!adminId) {
    return res.status(403).json({ message: "Unauthorized or invalid admin token" });
  }
    try {
        const movie = new Movie({
            title,
            genre,
            dates: dates.map((date) => new Date(date)),
            time,
            price,
            cover,
            poster,
            imdb,
            admin: adminId,
          });

          await movie.save();



    const adminUser = await User.findById(adminId);
    if (!adminUser) {
        await Movie.findByIdAndDelete(movie._id);
        return res.status(404).json({ message: "Admin not found. Movie creation rolled back." });
    }

    adminUser.moviesAdded.push(movie);
    await adminUser.save();

    return res.status(201).json({ message: "Movie added successfully", movie });
        
    } catch (error) {
        return res.status(500).json({ message: "Adding movie failed", error: error.message })
    }
}

export const getAllMovies = async (req, res) => {
    const adminId = req.user.id;
    try {
      const movies = await Movie.find({ admin: adminId });
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch movies", error });
    }
  };

  export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      await Movie.findByIdAndDelete(id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete movie", error });
    }
  };

  export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: "Failed to update movie", error });
    }
  };

  export const allMovies = async (req, res) => {
    try {
      const movies = await Movie.find(); 
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch movies", error });
    }
  };

  export const getMovie = async (req,res) => {
    const id = req.params.id;
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (err) {
      console.error('Error fetching movie:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAvailableDates = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).select("dates");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ dates: movie.dates });
  } catch (err) {
    console.error("Error fetching available dates:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
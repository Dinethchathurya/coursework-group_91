import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addMovie, allMovies, deleteMovie, getAllMovies, getAvailableDates, getMovie, updateMovie } from "../controllers/movie.controller.js";

const router = express.Router();


router.get("/movies", allMovies);
router.get("/allmovies", verifyToken, getAllMovies);
router.get("/:movieId/available-dates", getAvailableDates);
router.get("/:id", verifyToken, getMovie);
router.post("/addmovie", verifyToken, addMovie );
router.post('/update/:id', verifyToken, updateMovie);
router.delete('/delete/:id', verifyToken, deleteMovie);

export default router;
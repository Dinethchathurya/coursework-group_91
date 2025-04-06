import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    dates: [{
        type: Date,
        required: true
    }],
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    imdb: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Booking" 
    }]
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
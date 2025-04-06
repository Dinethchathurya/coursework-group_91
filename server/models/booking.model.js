import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatNumbers: [{
    type: String,
    required: true,
  }],
  tickets: {
    type: Number,

  },
  total: {
    type: Number,
 
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
import Booking from "../models/booking.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
import { io } from "../index.js";
import paypal from "@paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
  "Acg6e5yPBwhLoNPSodGeED-W8Zc1OnHAohnoMWGPELwRC2_KRsU-ANFJNlARz4bESiYh4Ljn7xj1_P33",
  "ECc7LP2wN5d0YoxLSgLkOhzkaVMHOGs-tC62cpBUWEZiSmgbSVG5uBznKz5_Xh0CH6kisbH8zzJSejFU"
);
const client = new paypal.core.PayPalHttpClient(environment);

const validatePayment = async (orderID) => {
  const request = new paypal.orders.OrdersGetRequest(orderID);
  try {
    const response = await client.execute(request);
    return response.result;
  } catch (error) {
    console.error("Error validating payment:", error);
    return null;
  }
};

export const addBooking = async (req, res) => {
  const { movie, date, seatNumbers, tickets, total, price, user, orderID } = req.body;

  try {
    const paymentDetails = await validatePayment(orderID);

    if (!paymentDetails || paymentDetails.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment verification failed." });
    }

    const givenMovie = await Movie.findById(movie);
    const givenUser = await User.findById(user);

    if (!givenMovie) {
      return res
        .status(404)
        .json({ message: "Movie not found with the given ID." });
    }

    if (!givenUser) {
      return res
        .status(404)
        .json({ message: "User not found with the given ID." });
    }

    const booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumbers,
      tickets,
      total,
      price,
      user,
    });

    await booking.save();

    io.to(`${movie}-${date}`).emit("updateSeats", { seatNumbers });

    givenUser.bookings.push(booking);
    await givenUser.save();

    givenMovie.bookings.push(booking);
    await givenMovie.save();

    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the booking." });
  }
};

  export const getBookedSeats = async (req, res) => {
    const { movie, date } = req.query;
  
    try {
      const bookings = await Booking.find({
        movie,
        date: new Date(date),
      });
  
      const bookedSeats = bookings.flatMap((booking) => booking.seatNumbers);
      return res.status(200).json({ bookedSeats });
    } catch (err) {
      console.error("Error fetching booked seats:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching booked seats." });
    }
  };

  export const getBookings = async (req, res) => {
    try {
  
      const bookings = await Booking.find()
        .populate("movie", "title time price") 
        .populate("user", "firstName lastName email mobile"); 
  
  
      const formattedBookings = bookings.map((booking, index) => ({
        id: booking._id,
        cusName: `${booking.user.firstName} ${booking.user.lastName || ""}`.trim(),
        cusEmail: booking.user.email,
        cusPhone: booking.user.mobile ? `+${booking.user.mobile}` : "N/A",
        movie: booking.movie.title,
        bookingDate: booking.date.toISOString().split("T")[0], 
        showTime: `${booking.date.toISOString().split("T")[0]} ${booking.movie.time}`,
        paymentStatus: "Paid", 
        tickets: booking.tickets,
        totalAmount: `$${booking.total}`, 
        seatNumbers: booking.seatNumbers,
      }));
  
      res.status(200).json({ bookings: formattedBookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "An error occurred while fetching bookings." });
    }
  };

  export const getUserBookings = async (req, res) => {
    try {
      const userId = req.user.id; 
      
      const bookings = await Booking.find({ user: userId })
        .populate("movie", "title time price") 
        .populate("user", "firstName lastName"); 
  
      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found for this user." });
      }
  
      const formattedBookings = bookings.map((booking) => ({
        id: booking._id,
        movie: booking.movie.title,
        cusName: `${booking.user.firstName} ${booking.user.lastName || ""}`.trim(), 
        bookingDate: booking.date.toISOString().split("T")[0],
        showTime: booking.movie.time,
        tickets: booking.tickets,
        seatNumbers: booking.seatNumbers,
        totalAmount: `$${booking.total}`,
      }));
  
      return res.status(200).json({ bookings: formattedBookings });
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ message: "Error fetching bookings" });
    }
  };
  
  export const deleteBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
      const booking = await Booking.findById(id);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      await Movie.findByIdAndUpdate(booking.movie, {
        $pull: { bookings: id },
      });
  
      await User.findByIdAndUpdate(booking.user, {
        $pull: { bookings: id },
      });
  
      await Booking.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      return res.status(500).json({ message: "Failed to delete booking", error });
    }
  };
  
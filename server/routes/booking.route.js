import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addBooking, deleteBooking, getBookedSeats, getBookings, getUserBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/addbooking",verifyToken,addBooking);
router.get("/bookings", verifyToken, getBookings);
router.get("/user/bookings", verifyToken, getUserBookings);
router.delete("/deletebooking/:id",verifyToken, deleteBooking);
router.get("/booked-seats",verifyToken, getBookedSeats); 

export default router;

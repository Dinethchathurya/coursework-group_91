import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    moviesAdded : [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }],
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

const User = mongoose.model('User',userSchema);

export default User;
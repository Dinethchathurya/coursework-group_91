import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import BuyTickets from "./pages/BuyTickets";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/dashboard/AddMovie";
import Bookings from "./pages/dashboard/Bookings";
import EditEvents from "./pages/dashboard/EditMovie";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Profile from "./pages/dashboard/Profile";
import MyBookings from "./pages/dashboard/MyBookings";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/location" element={<Location />} />
            <Route element={<PrivateRoute />}>
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="mybookings" element={<MyBookings />} />
                <Route path="addevent" element={<AddEvent />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="editevents" element={<EditEvents />} />
              </Route>
            </Route>
            <Route path="/buytickets" element={<BuyTickets />} />
            <Route path="/buyticket/:movieId" element={<BuyTickets />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

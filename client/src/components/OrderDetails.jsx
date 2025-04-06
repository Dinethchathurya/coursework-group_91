import { useState, useEffect } from "react";

function UserBookings() {
  const BASE_URL = "http://localhost:9000";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/booking/user/bookings`, {
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user bookings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!bookings.length) {
    return <div className="text-center">No bookings found.</div>;
  }

  return (
    <div className="overflow-x-auto text-black">
      <div className="text-xl pb-4 text-center text-black">My Bookings</div>

      <table className="table table-xs sm:table-md text-black">
        <thead>
          <tr>
            <th>Name</th>
            <th>Movie</th>
            <th>Booking Date</th>
            <th>Show Time</th>
            <th>Tickets</th>
            <th>Seat Numbers</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <th>{booking.cusName}</th>
              <td>{booking.movie}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.showTime}</td>
              <td>{booking.tickets}</td>
              <td>{booking.seatNumbers.join(", ")}</td>
              <td>{booking.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserBookings;

import { useState, useEffect } from "react";

function Bookings() {
  const BASE_URL = "http://localhost:9000";

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/booking/bookings`,
      {
        credentials: "include",
      })
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/booking/deletebooking/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
        alert("Booking deleted successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed to delete booking: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("An error occurred while deleting the booking.");
    }
  };

const filteredBookings = bookings.filter(
    (booking) =>
      booking.cusName.toLowerCase().includes(filter.toLowerCase()) ||
      booking.movie.toLowerCase().includes(filter.toLowerCase()) ||
      booking.paymentStatus.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="overflow-x-auto text-black">
      <div className="text-xl pb-4 text-center text-black">Movie Bookings</div>

      <div className="pb-4">
        <input
          type="text"
          placeholder="Search by Name, Movie or Status"
          className="input input-bordered border-gray-400 m-2 w-full max-w-xs text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="table table-xs sm:table-md text-black">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Movie</th>
            <th>Booking Date</th>
            <th>Show Time</th>
            <th>Tickets</th>
            <th>Seat Numbers</th>
            <th>Total Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <th>{booking.id}</th>
              <td>{booking.cusName}</td>
              <td>{booking.cusEmail}</td>
              <td>{booking.cusPhone}</td>
              <td>{booking.movie}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.showTime}</td>
              <td>{booking.tickets}</td>
              <td>{booking.seatNumbers.join(", ")}</td>
              <td>{booking.totalAmount}</td>
              <td>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
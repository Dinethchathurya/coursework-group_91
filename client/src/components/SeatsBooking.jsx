import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const SeatLayout = () => {
  const BASE_URL = "http://localhost:9000";

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const { movieId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [availableDates, setAvailableDates] = useState([]);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   console.log("Selected Seats:", selectedSeats);
  //   console.log("Selected Date:", selectedDate);
  //   const cost = selectedSeats.length * pricePerSeat;
  //   console.log("Calculated Total Cost:", cost);
  //   setTotalCost(cost);
  // }, [selectedSeats, selectedDate]);

  useEffect(() => {
    const newSocket = io(BASE_URL, { withCredentials: true });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket && selectedDate) {
      const roomName = `${movieId}-${selectedDate}`;
      socket.emit("joinRoom", { movieId, date: selectedDate });

      socket.on("updateSeats", ({ seatNumbers }) => {
        setBookedSeats((prev) => [...new Set([...prev, ...seatNumbers])]);
      });

      return () => {
        socket.off("updateSeats");
      };
    }
  }, [socket, movieId, selectedDate]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/movie/${movieId}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setPricePerSeat(data.price);
          setSelectedTime(data.time);
        } else {
          console.error(`Error fetching movie details: ${data.message}`, {});
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    const generateDateRange = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dateArray = [];

      while (startDate <= endDate) {
        dateArray.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }

      return dateArray;
    };

    const fetchAvailableDates = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/movie/${movieId}/available-dates`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          const allDates = generateDateRange(
            data.dates[0],
            data.dates[data.dates.length - 1]
          );
          setAvailableDates(allDates);
        } else {
          console.error(`Error fetching available dates: ${data.message}`);
        }
      } catch (err) {
        console.error("Error fetching available dates:", err);
      }
    };

    fetchMovieDetails();
    fetchAvailableDates();
  }, [movieId]);

  useEffect(() => {
    setTotalCost(selectedSeats.length * pricePerSeat);
  }, [selectedSeats, pricePerSeat]);

  useEffect(() => {
    if (selectedDate) {
      const fetchBookedSeats = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/booking/booked-seats?movie=${movieId}&date=${selectedDate}`,
            {
              credentials: "include",
            }
          );
          const data = await response.json();
          setBookedSeats(data.bookedSeats || []);
        } catch (err) {
          console.error("Error fetching booked seats:", err);
        }
      };

      fetchBookedSeats();
    }
  }, [movieId, selectedDate]);

  const getStartAndEndDates = () => {
    if (availableDates.length > 0) {
      const sortedDates = [...availableDates].sort((a, b) => a - b);
      return {
        startDate: sortedDates[0].toLocaleDateString(),
        endDate: sortedDates[sortedDates.length - 1].toLocaleDateString(),
      };
    }
    return { startDate: "N/A", endDate: "N/A" };
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const columns = [{ range: [1, 6] }, { range: [7, 16] }, { range: [17, 22] }];

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeats((prev) =>
        prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      );
    }
  };

  const handleBooking = async (orderID) => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please select date, time, and seats before booking.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/booking/addbooking`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: movieId,
          date: selectedDate,
          seatNumbers: selectedSeats,
          tickets: selectedSeats.length,
          total: totalCost,
          user: currentUser._id,
          orderID,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Booking successful!");
        setSelectedSeats([]);
        setSelectedDate("");
        setSelectedTime("");
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        navigate("/");
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Error booking seats:", err);
    }
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  const { startDate, endDate } = getStartAndEndDates();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row text-white mt-14 mb-14 gap-2">
        <div className="flex flex-col gap-3 overflow-x-auto whitespace-nowrap m-5">
          <div className="mb-4">
            <p className="text-white font-bold">
              Booking available from:{" "}
              <span className="text-blue-600">{startDate}</span> to{" "}
              <span className="text-blue-600">{endDate}</span>
            </p>
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-black font-bold mb-2">
                Select Date:
              </label>
              <select
                className="p-2 border rounded text-black w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={!availableDates.length}
              >
                <option value="">Select Date</option>
                {availableDates.map((date) => (
                  <option
                    key={date.toISOString()}
                    value={date.toISOString().split("T")[0]}
                  >
                    {date.toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-black font-bold mb-2 ">
                Select Time:
              </label>
              {selectedTime || "Time not available"}
            </div>
          </div>

          {rows.map((row) => (
            <div key={row} className="flex gap-8">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex gap-2">
                  {Array.from(
                    { length: col.range[1] - col.range[0] + 1 },
                    (_, i) => {
                      const seat = `${row}${col.range[0] + i}`;
                      const isBooked = bookedSeats.includes(seat);

                      return (
                        <div
                          key={seat}
                          onClick={() => !isBooked && handleSeatClick(seat)}
                          className={`w-6 h-6 lg flex items-center justify-center border rounded-md cursor-pointer ${
                            isBooked
                              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                              : selectedSeats.includes(seat)
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                          style={{ fontSize: "0.7rem" }}
                        >
                          {seat}
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          ))}

          <div
            className="bg-gray-400 text-center text-black font-bold py-2 mb-8 rounded ml-5 mt-10"
            style={{
              width: `${
                columns.reduce(
                  (acc, col) => acc + (col.range[1] - col.range[0] + 1),
                  0
                ) * 2
              }rem`,
            }}
          >
            SCREEN
          </div>
        </div>

        <PayPalScriptProvider
          options={{
            "client-id":
              "Acg6e5yPBwhLoNPSodGeED-W8Zc1OnHAohnoMWGPELwRC2_KRsU-ANFJNlARz4bESiYh4Ljn7xj1_P33",
          }}
        >
          <div className="w-full lg:w-1/4 bg-white p-8 rounded shadow mr-8 md:ml-auto h-auto">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">
              Seat Booking
            </h2>

            <div className="mb-7">
              <div className="flex justify-between mb-3">
                <p className="font-semibold text-black">Selected Date:</p>
                <p className="font-semibold text-black">
                  {selectedDate || "None"}
                </p>
              </div>
              <div className="flex justify-between mb-3">
                <p className="font-semibold text-black">Selected Time:</p>
                <p className="font-semibold text-black">
                  {selectedTime || "None"}
                </p>
              </div>
              <div className="flex justify-between mb-3">
                <p className="font-semibold text-black">Selected Seats:</p>
                <p className="font-semibold text-black">
                  {selectedSeats.join(", ") || "None"}
                </p>
              </div>
              <div className="flex justify-between mt-2 mb-3">
                <p className="font-semibold text-black">Price per Seat:</p>
                <p className="font-semibold text-black">${pricePerSeat}</p>
              </div>
              <div className="flex justify-between mt-2 mb-3">
                <p className="font-semibold text-black">Total Cost:</p>
                <p className="font-semibold text-black">${totalCost}</p>
              </div>
            </div>

            {selectedSeats.length > 0 &&
            totalCost > 0 &&
            selectedDate &&
            JSON.stringify(selectedSeats) ===
              JSON.stringify([...selectedSeats]) &&
            selectedSeats.length === [...selectedSeats].length &&
            totalCost === selectedSeats.length * pricePerSeat ? (
              <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={
                  !selectedSeats.length ||
                  totalCost <= 0 ||
                  !selectedDate ||
                  JSON.stringify(selectedSeats) !==
                    JSON.stringify([...selectedSeats]) ||
                  selectedSeats.length !== [...selectedSeats].length ||
                  totalCost !== selectedSeats.length * pricePerSeat
                }
                createOrder={(data, actions) => {
                  console.log("Order Total Cost:", totalCost);
                  console.log("Seats Length:", selectedSeats.length);
                  console.log("Seats :", selectedSeats);
                  console.log("Date :", selectedDate);

                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalCost.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleBooking(data.orderID);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  alert("Something went wrong with the payment.");
                }}
              />
            ) : (
              <p>
                Please ensure all data is selected, valid, and consistent (e.g.,
                seats, total cost, and selections match).
              </p>
            )}

            <button
              onClick={clearSelection}
              className={`w-full py-2 rounded ${
                selectedSeats.length
                  ? "bg-red-500 text-white cursor-pointer"
                  : "bg-red-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedSeats.length}
            >
              Clear Selection
            </button>
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default SeatLayout;

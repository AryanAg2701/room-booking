import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // state variables for inputs
  const [num, setnum] = useState(""); // Room number
  const [purp, setpurp] = useState(""); // Purpose
  const [club, setclubname] = useState(""); // Club 
  const [bookings, setbookings] = useState([]); // List of bookings
  const [reply, setreply] = useState(""); // Response reply

  // Function to fetch all bookings from the server
  const fetch = () => {
    axios
      .get("http://localhost:5000/api/bookings") // GET request to fetch bookings
      .then((response) => {
        setbookings(response.data); // Update state with fetched bookings
      })
      .catch((error) => {
        setreply("Error fetching bookings"); // Error handling
      });
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetch();
  }, []);

  // Function to book a room
  const book = () => {
    const bookingDetails = { num, purp, club }; // Create booking details object
    axios
      .post("http://localhost:5000/api/room", bookingDetails) // POST request to book a room
      .then((response) => {
        setreply(response.data.message); // Display response message
        setnum(""); // Clear room number input
        setpurp(""); // Clear purpose input
        setclubname(""); // Clear club name input
        fetch(); // Refresh bookings list
      })
      .catch((error) => {
        setreply("Error booking room"); // Error handling
      });
  };

  // Function to delete a booking
  const delroom = (id) => {
    axios
      .delete(`http://localhost:5000/api/room/${id}`) // del request to delete a booking
      .then((response) => {
        setreply(response.data.message); // Display response message
        fetch(); //  bookings list
      })
      .catch((error) => {
        setreply("Error in deleting"); // Error handling
      });
  };

  return (
    <div className="App">
      <h1>Room Booking App</h1>
      <div>
        {/* Input for room number */}
        <input
          type="text"
          placeholder="Room Number"
          value={num}
          onChange={(e) => setnum(e.target.value)}
        />
        {/* Input for purpose */}
        <input
          type="text"
          placeholder="Purpose of Booking"
          value={purp}
          onChange={(e) => setpurp(e.target.value)}
        />
        {/* Input for club */}
        <input
          type="text"
          placeholder="Club Name"
          value={club}
          onChange={(e) => setclubname(e.target.value)}
        />
        {/* Button to book room */}
        <button onClick={book}>Book Room</button>
      </div>

      <p>{reply}</p>
      {/* List of bookings */}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Room : {booking.num} - {booking.purp} - {booking.club}{" "}
            <button onClick={() => delroom(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

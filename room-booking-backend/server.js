const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let bookings = [];

app.post("/api/room", (req, res) => {
  const { num, purp, club } = req.body;

  if (!num || !purp || !club) {
    return res
      .status(400)
      .json({ message: "All fields (num, purp, club) are required" });
  }

  const newroom = { id: uuidv4(), num, purp, club };
  bookings.push(newroom);
  res
    .status(201)
    .json({ message: "Room booked successfully", booking: newroom });
});

app.get("/api/bookings", (req, res) => {
  res.status(200).json(bookings);
});

app.delete('/api/room/:id', (req, res) => {
  const { id } = req.params
  bookings = bookings.filter(booking => booking.id !== id)
  res.status(200).json({ message: 'Booking deleted successfully' })
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

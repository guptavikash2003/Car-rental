const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const connection = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { ownerRouter } = require("./routes/owner.routes");
const { bookingRouter } = require("./routes/booking.router");
const app = express();
env.config();

app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter);
app.get("/", (req, res) => {
  res.send("Hello from Home page");
});
 
app.listen(3000, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
  console.log("Server is running on port 3000 live link:- http://localhost:3000");
});

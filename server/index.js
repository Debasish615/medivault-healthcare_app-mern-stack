const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("MediVault API ✅"));

// Routes (we will create these next)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running http://localhost:${PORT} ✅`));
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection ❌", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception ❌", err);
});
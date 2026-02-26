const mongoose = require("mongoose");

let isConnecting = false;

async function connectWithRetry() {
  if (isConnecting) return;
  isConnecting = true;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connect failed ❌", err.message);
    console.log("Retrying MongoDB in 5 seconds...");
    setTimeout(() => {
      isConnecting = false;
      connectWithRetry();
    }, 5000);
    return;
  }

  isConnecting = false;
}

module.exports = function connectDB() {
  mongoose.connection.on("connected", () => console.log("MongoDB event: connected ✅"));
  mongoose.connection.on("disconnected", () => console.log("MongoDB event: disconnected ⚠️"));
  mongoose.connection.on("error", (e) => console.log("MongoDB event: error ❌", e.message));

  connectWithRetry();
};
require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

(async () => {
  await connectDB();
  const email = "admin@medivault.com";
  const exists = await User.findOne({ email });
  if (exists) return console.log("Admin already exists ✅"), process.exit(0);

  const passwordHash = await bcrypt.hash("Admin@123", 10);
  await User.create({ name: "Admin", email, passwordHash, role: "admin" });

  console.log("Admin created ✅");
  console.log("Login: admin@medivault.com / Admin@123");
  process.exit(0);
})();
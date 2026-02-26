const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authRequired, requireRole } = require("../middleware/auth");

router.post("/create-doctor", authRequired, requireRole("admin"), async (req, res) => {
  const { name, email, password, specialization } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const doctor = await User.create({
    name,
    email,
    passwordHash,
    role: "doctor",
    specialization: specialization || ""
  });

  res.status(201).json({ id: doctor._id, name: doctor.name, email: doctor.email, specialization: doctor.specialization });
});

router.get("/doctors", authRequired, async (req, res) => {
  const doctors = await User.find({ role: "doctor", active: true }).select("_id name email specialization");
  res.json(doctors);
});

module.exports = router;
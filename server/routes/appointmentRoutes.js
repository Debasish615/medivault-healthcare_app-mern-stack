const router = require("express").Router();
const Appointment = require("../models/Appointment");
const { authRequired, requireRole } = require("../middleware/auth");

router.post("/", authRequired, requireRole("patient"), async (req, res) => {
  const { doctorId, datetime, reason } = req.body;
  if (!doctorId || !datetime) return res.status(400).json({ message: "Missing fields" });

  const appt = await Appointment.create({
    patientId: req.user.id,
    doctorId,
    datetime: new Date(datetime),
    reason: reason || ""
  });

  res.status(201).json(appt);
});

router.get("/my", authRequired, async (req, res) => {
  const query = req.user.role === "doctor"
    ? { doctorId: req.user.id }
    : { patientId: req.user.id };

  const appts = await Appointment.find(query)
    .populate("patientId", "name email")
    .populate("doctorId", "name email specialization")
    .sort({ datetime: -1 });

  res.json(appts);
});

module.exports = router;
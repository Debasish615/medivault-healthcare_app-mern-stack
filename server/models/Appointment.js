const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    datetime: { type: Date, required: true },
    reason: { type: String, default: "" },
    status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
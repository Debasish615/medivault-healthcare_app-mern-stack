const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
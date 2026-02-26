const router = require("express").Router();
const multer = require("multer");
const Report = require("../models/Report");
const { authRequired, requireRole } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", authRequired, requireRole("patient"), upload.single("file"), async (req, res) => {
  const { reportName } = req.body;
  if (!req.file || !reportName) return res.status(400).json({ message: "Missing file/reportName" });

  const fileUrl = `/uploads/${req.file.filename}`;
  const report = await Report.create({
    patientId: req.user.id,
    reportName,
    fileUrl,
    fileType: req.file.mimetype,
  });

  res.status(201).json(report);
});

router.get("/my", authRequired, requireRole("patient"), async (req, res) => {
  const reports = await Report.find({ patientId: req.user.id }).sort({ createdAt: -1 });
  res.json(reports);
});

module.exports = router;
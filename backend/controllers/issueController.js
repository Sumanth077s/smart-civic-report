import Issue from "../models/Issue.js";
import multer from "multer";
import path from "path";

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Only images allowed");
    }
  }
});

/* ================= CONTROLLERS ================= */

export const createIssue = async (req, res) => {
  try {
    const { title, type, location } = req.body;

    if (!title || !type || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const issue = await Issue.create({
      title,
      type,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      status: "open",
      reportedBy: req.user.role
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Failed to create issue" });
  }
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json(issues);
};

export const updateStatus = async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(issue);
};

export const deleteIssue = async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ message: "Issue deleted successfully" });
};

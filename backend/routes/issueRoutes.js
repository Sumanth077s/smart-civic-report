import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createIssue,
  getIssues,
  updateStatus,
  deleteIssue,
  upload
} from "../controllers/issueController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createIssue);
router.get("/", protect, getIssues);
router.put("/:id", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, deleteIssue);

export default router;

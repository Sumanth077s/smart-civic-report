import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createIssue,
  getIssues,
  updateStatus,
  deleteIssue
} from "../controllers/issueController.js";

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, getIssues);
router.put("/:id", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, deleteIssue);

export default router;

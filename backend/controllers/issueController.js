import Issue from "../models/Issue.js";

/**
 * CREATE ISSUE (User)
 */
export const createIssue = async (req, res) => {
  try {
    const { title, type, location, image } = req.body;

    if (!title || !type || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const issue = await Issue.create({
      title,
      type,
      location,
      image: image || "",
      status: "open",
      reportedBy: req.user.role
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Failed to create issue" });
  }
};

/**
 * GET ALL ISSUES (User & Admin)
 */
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

/**
 * UPDATE STATUS (Admin)
 */
export const updateStatus = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/**
 * DELETE ISSUE (Admin)
 */
export const deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete issue" });
  }
};

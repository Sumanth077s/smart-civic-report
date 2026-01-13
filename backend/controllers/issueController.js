import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  const issue = await Issue.create({
    title: req.body.title,
    status: "open",
    reportedBy: req.user.role
  });
  res.json(issue);
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find();
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

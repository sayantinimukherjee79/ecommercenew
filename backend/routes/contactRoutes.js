import express from "express";
const router = express.Router();

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, contactNo, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill all required fields!" });
  }

  // For now, just log the data
  console.log("New Contact Form Submission:", req.body);

  // You can later save to MongoDB or send an email here

  res.status(200).json({ message: "Message received successfully!" });
});

export default router;

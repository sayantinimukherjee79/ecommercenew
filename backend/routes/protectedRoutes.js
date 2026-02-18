// purpose of this file is To PROVE that the request is coming from a legitimately logged-in user.

// Allows only logged-in users to access /dashboard

import express from "express";
import authMiddleware from "../middlewire/authMiddleware.js";

const router = express.Router();

router.get("/dashboard",authMiddleware,(req,res) => {
    res.status(200).json({
        message: "access granted",
        userId: req.user
    });
})
export default router;
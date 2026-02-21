import db from "../models/index.js";
import jwt from "jsonwebtoken";

const User = db.User;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user.id, organizationId: user.organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created!", userId: user.id, email: user.email, organizationId: user.organizationId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
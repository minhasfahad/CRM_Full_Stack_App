import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use." });

    // Allow optional role if valid invite secret provided
    const { role, inviteCode } = req.body;

    let finalRole = "Team Member";

    // Bootstrap: if no users exist yet, allow creating the first Admin/Manager without a secret
    const totalUsers = await User.countDocuments();
    const isBootstrap = totalUsers === 0;

    if (role && role !== "Team Member") {
      const secret = process.env.REGISTER_SECRET;
      if (!isBootstrap) {
        if (secret) {
          // Only allow setting Admin/Manager if inviteCode matches REGISTER_SECRET
          if (!inviteCode || inviteCode !== secret) {
            return res.status(403).json({ message: "Invalid or missing registration secret for requested role. To create Admin/Manager, set REGISTER_SECRET and provide 'inviteCode' in the form, or create the first admin when the database is empty." });
          }
        } else {
          // No secret configured - allow elevated role (development convenience)
          console.warn("REGISTER_SECRET is not set. Elevated role registration is permitted (development mode). Consider setting REGISTER_SECRET to secure this in production.");
        }
      }
      if (["Admin", "Manager", "Team Member"].includes(role)) finalRole = role;
    }

    const user = new User({ name, email, password, role: finalRole });
    await user.save();

    // Log when bootstrap user is created
    if (isBootstrap && finalRole === "Admin") console.log("Bootstrap Admin created: ", email);

    const token = signToken(user);

    res.status(201).json({ message: "User created.", user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = signToken(user);

    res.status(200).json({ message: "Login successful.", user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

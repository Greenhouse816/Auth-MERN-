//For Hashing Password
import bcrypt from "bcryptjs";
//For Token Authentication
import jwt from "jsonwebtoken";
//Import User Model
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User Does Not Exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exist" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password Does Not Match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      {
        _id: result._id,
        name: result.name,
        email: result.email,
        password: result.hashedPassword,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleLogin = async (req, res) => {
  try {
    console.log(req.body?.profileObj?.email);
    const email = req.body?.profileObj?.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          password: existingUser.password,
        },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      const result = await User.create({
        email: req.body?.profileObj?.email,
        password: "NONE" + Math.random().toString(36).slice(-8),
        name: req.body?.profileObj?.name,
      });
      const token = jwt.sign(
        {
          _id: result._id,
          name: result.name,
          email: result.email,
          password: result.password,
        },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const setPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User Does Not Exist" });
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(updatePassword);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User Does Not Exist" });
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(updatePassword);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { firstName,lastName, email,nic,mobile, password } = req.body;
  if (!firstName || !email || !password) {
    return res.status(422).json({ message: "Fields are required." });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ firstName, lastName, email, nic, mobile, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json("User created Successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "All fields are required." });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json("User not found!");
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json("Wrong Pasword!");
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT);
    return res
      .cookie("new_token", token, {
        httpOnly: true,
        maxAge: 604800000,
      })
      .status(200)
      .json(validUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("new_token");
    return res.status(200).json("User has been logged out!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("Unauthorized: Cannot update user details.");
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res
      .status(403)
      .json({ message: "Forbidden: Cannot delete this user." });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("new_token");
    return res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
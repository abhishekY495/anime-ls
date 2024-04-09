import { User } from "../models/userModel.js";
import { options } from "../utils/cookieOptions.js";
import { destroyCookieOptions } from "../utils/destroyCookieOptions.js";
import { generateToken } from "../utils/generateToken.js";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";

export const registerUser = tryCatchAsyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const usernameExists = await User.findOne({ username: username.trim() });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const emailExists = await User.findOne({ email: email.trim() });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const registeredUser = await User.create({
    fullname: fullname.trim(),
    email: email.trim(),
    username: username.trim(),
    password,
    privateLists: [],
    publicLists: [],
  });
  if (!registeredUser) {
    res.status(400);
    throw new Error("Something went wrong");
  }

  const token = generateToken(registeredUser._id);
  res.cookie("token", token, options);
  res.json({
    message: "Registration Successful",
    user: {
      fullname: registeredUser.fullname,
      email: registeredUser.email,
      username: registeredUser.username,
      animeLists: registeredUser.animeLists,
    },
  });
});

export const loginUser = tryCatchAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("No such Username found");
  }

  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    res.status(400);
    throw new Error("Wrong password");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, options);
  res.json({
    message: "Login Successful",
    user: {
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      animeLists: user.animeLists,
    },
  });
});

export const logoutUser = tryCatchAsyncHandler(async (req, res) => {
  res.cookie("token", "", destroyCookieOptions);
  res.json({
    message: "Logged Out",
  });
});

export const updateUser = tryCatchAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = req.user;

  if (email) user.email = email;
  if (fullname) user.fullname = fullname;
  if (password) user.password = password;

  const updatedUser = await user.save();
  res.json({
    message: "Details Updated",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      animeLists: updatedUser.animeLists,
    },
  });
});

export const userProfile = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  res.json({ user });
});

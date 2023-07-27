import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/CreateError.js";
export const register = async (req, res, next) => {
  try {
    const isUser = User.findOne({ username: req.body.username });
    const password = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password });
    await newUser.save();
    res.status(200).send("user created");
  } catch (err) {
    next(err);
  }
};
 export const login = async (req, res, next) => {
  try {
    const isUser = await User.findOne({ username: req.body.username });
    if (!isUser) next(createError(404, "user not found"));
    const isPassword =
      (await bcrypt.compare(req.body.password, isUser.password)) ||
      isUser.password === req.body.password;
    if (!isPassword) next(createError(404, "wrong password"));

    const token = jwt.sign(
      { id: isUser._id, isSeller: isUser.isSeller },
      process.env.JWT_SECRET
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(isUser);
  } catch (err) {
    next(createError(500, "something went wrong"));
  }
};
export const logout = (req, res) => {
  res.clearCookie("accessToken" , {
    sameSite: "none",
    secure: true,
  }).status(200).send("user has been logged out");
};

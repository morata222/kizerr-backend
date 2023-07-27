import User from "../models/user.model.js";
import createError from "../utils/CreateError.js";
export const DeleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(createError(404, "User not found"));
  }
  if (req.userId !== req.params.id) {
    return next(createError(403, "You are not allowed to delete this user"))
  }
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).send("User deleted successfully");
};
export const getUser = async (req, res , next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return next(createError(500, error.message)) 
  }
   
};

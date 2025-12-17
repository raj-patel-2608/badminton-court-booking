import User from "../models/User.model.js";

export const mockAuth = async (req, res, next) => {
  const user = await User.findOne({
    email: "raj@gmail.com",
  });

  if (!user) {
    return res.status(401).json({
      message: "Mock user not found",
    });
  }

  req.user = user;
  next();
};

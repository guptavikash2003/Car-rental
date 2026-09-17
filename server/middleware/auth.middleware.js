const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ success: false, message: "token not authorized" });
  }
  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET ).id;
    if (!userId) return res.json({ success: false, message: "not authorized" });
    req.user = await User.findById(userId).select("-password");
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "not a authorized",
      error: error.message,
    });
  }
};
module.exports = { protect };

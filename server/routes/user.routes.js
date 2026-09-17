const express = require("express");
const userRouter = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {loginUser, registerUser,getUserData,getCars} = require("../controller/user.controller");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data",protect, getUserData);
userRouter.get("/cars",getCars);

module.exports = {userRouter};
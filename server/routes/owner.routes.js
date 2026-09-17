const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { addCar, changeRoleToOwner } = require("../controller/owner.controller");
const { upload } = require("../middleware/multer.middleware"); // Fix: destructure 'upload'
const { toggleCarAvailability, deleteCar, getOwnerCars ,getDashboardData,updateUserImage } = require("../controller/owner.controller");
const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCar); // Fix: protect before upload
ownerRouter.get("/cars", protect, getOwnerCars); // Add this line to get owner's cars
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData)
ownerRouter.post("/update-image", upload.single("image"), protect, updateUserImage); // Add this line to update user image
module.exports = { ownerRouter };

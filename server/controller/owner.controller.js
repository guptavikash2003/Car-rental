const { User } = require("../model/user.model");
const { imagekit } = require("../config/imagekit");
const fs = require("fs");
const { Car } = require("../model/car.model");
const { Booking } = require("../model/Booking.model");
const express = require("express");
//Api to change user role to owner
const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list cars
const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });
    // optimization through imagekit URL transformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    const image = optimizedImageUrl;

    const { Car } = require("../model/car.model");
    await Car.create({ ...car, image, owner: _id });
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
      errortype: "try_catch",
    });
  }
};

// API to get all cars of the owner
const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle car availability
const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body; // true or false
    const car = await Car.findById(carId);
    if (car.owner.toString() !==  _id.toString()) {
      return res.json({ success: false, message: "Car not found" });
    }

    car.isAvaliable = !car.isAvaliable; // Toggle availability
    await car.save();

    res.json({ success: true, message: "Availabity Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a car
const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body; // true or false
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Car not found" });
    }

    // car.owner = null;
    // car.isAvaliable = false;
    // await car.save();

    
    await Car.findByIdAndDelete(carId);

    res.json({ success: true, message: "Car removed from your list" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard data
const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner")
      return res.json({ success: false, message: "Unauthorized" });
    const cars = await Car.find({ owner: _id });


    const bookings = await Booking.find({ owner: _id }).populate('car').
      sort({ createdAt: -1 });
    const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
    const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })
    // Calculate monthlyRevenue from bookings where status is confirmed
    const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').
      reduce((acc, booking) => acc + booking.price, 0)
    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };
    res.json({ success: true, dashboardData });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    // Upload Image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/users'
    });
    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: '400' }, // Width resizing
        { quality: 'auto' }, // Auto compression
        { format: 'webp' } // Convert to modern format
      ]
    });

    const image = optimizedImageUrl;
    const updatedUser = await User.findByIdAndUpdate(_id, { image }, { new: true }).select("-password");

    res.json({
      success: true,
      message: "Image Updated",
      user: updatedUser
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  changeRoleToOwner, addCar, getOwnerCars,
  toggleCarAvailability, deleteCar, getDashboardData, updateUserImage
};

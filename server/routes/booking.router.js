const express = require('express');
const {changeBookingStatus, checkAvailabilityOfCar, createBooking,
getOwnerBookings, getUserBookings} = require('../controller/booking.controller.js');
const {protect} = require('../middleware/auth.middleware');
 
const bookingRouter = express.Router();


bookingRouter.post ('/check-availability', checkAvailabilityOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get ('/user', protect, getUserBookings)
bookingRouter.get ('/owner', protect, getOwnerBookings)
bookingRouter.post ('/change-status', protect, changeBookingStatus)

module.exports = {bookingRouter};
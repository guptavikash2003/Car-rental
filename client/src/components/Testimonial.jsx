import React from 'react'
import { assets } from '../assets/assets';
import Title from './Tittle';
import { motion } from 'motion/react'
const Testimonial = () => {

    const testimonials = [
        {
            name: "Shobha Oberoi",
            location: "Barwani,MP",
            image: assets.testimonial_image_1,
            testimonial: "I've rented cars from various companies, but CarRental stands out for its exceptional service and quality. The booking process was seamless, and the car was in pristine condition. Highly recommend!"
        },
        {
            name: "Aarav Sharma",
            location: "Indore,MP",
            image: assets.testimonial_image_2,
            testimonial: "CarRental made my trip unforgettable. The car was perfect for my needs, and the customer support was top-notch. I will definitely use their services again!"
        },
        {
            name: "Saanvi Patel",
            location: "Mumbai, Maharashtra",
            image: assets.testimonial_image_1,
            testimonial: "I had a fantastic experience with CarRental. The car was clean, well-maintained, and the rental process was hassle-free. Kudos to the team for their excellent service!"
        }
    ];


    return (
        <div className="ру-28 px-6 my-30 md:px-16 lg:px-24 xl:px-44">
            <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world." />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2, ease:'easeOut' }}
                        viewport={{ once: true, amount:0.3}}

                        key={index} className="bg-white р-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt="name" />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star-icon" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">{testimonial.testimonial}</p>
                    </motion.div>
                ))}
            </div>
        </div>)
}

export default Testimonial;
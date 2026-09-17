import React from 'react'
import Tittle from './Tittle';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
const FeaturedSection = () => {
    const { cars } = useAppContext();
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}

            className="flex flex-col items-center py-26 px-6 md:px-16 lg:px-24 xl:px-32 ">

            <motion.div initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}>
                <Tittle title="Featured Cars" subTitle="Explore our exclusive collection of luxury cars available for rent." align="left" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {cars.slice(0, 6).map((car, index) => (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        key={car._id}>
                        <CarCard car={car} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.button initial={{ opacity: 0, y:20}}
                whileInView={{ opacity: 1, y:0 }}
                transition={{ delay: 0.6, duration:0.4 }}
                onClick={() => { navigate('/cars'); scrollTo(0, 0) }} className="flex items-center border border-borderColor justify-center gap-2 px-8 py-3 mt-8 cursor-pointer rounded-md  hover:bg-blue-700 ">
                Explore All Cars <img src={assets.arrow_icon} alt="arrow" />
            </motion.button>
        </motion.div>
    )                       
}

export default FeaturedSection;
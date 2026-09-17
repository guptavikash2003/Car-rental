import React from 'react'
import Heros from '../components/Heros';
import FeaturedSection from '../components/FeaturedSection';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Newslater from '../components/Newslater';
 

const Home = () => {
  return (
    <div>
      <Heros/>
      <FeaturedSection />
      <Banner/>
      <Testimonial />
      <Newslater />
    
    </div>
  )
}

export default Home
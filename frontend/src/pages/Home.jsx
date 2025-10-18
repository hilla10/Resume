import React from 'react';
import Banner from '../components/home/Banner';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Cta from '../components/home/Cta';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;

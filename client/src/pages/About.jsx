/* eslint-disable no-unused-vars */
import React from 'react';
import Container from '../components/Container/Container';
import Hero from '../components/Hero';
import AboutTask from '../components/AboutTask';

const About = () => {
  return (
    <Container>
      <div className='mt-16'>
          <Hero/>
          </div>
          <AboutTask/>
    </Container>
  );
};

export default About;
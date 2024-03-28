import React, { useEffect } from 'react';
import Nav from '../Components/Nav'
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';
import animation1 from '../assets/animation1.json';
import './Home.css'
import './Home.scss';
import Footer from '../Components/Footer';
import anime from '../assets/animation.gif';

const Home = () => {
  useEffect(() => {
    const body = document.body;

    body.addEventListener('mousemove', (e) => {
      document.body.style.setProperty('--x', e.clientX + 'px');
      document.body.style.setProperty('--y', e.clientY + 'px');
    });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <Nav />
      <div className='main'>
        <div className='hero-text'>
          <h1 className='title-1'>Unlock Your Skills, </h1>
          <h2 className='title-2'>Empower Your Future</h2>
        </div>
        <div className='cta'>
        <button class="button-56" role="button">Get Started Now !!</button>
          </div>
        {/* <Lottie 
            options={defaultOptions}
            height={400}
            width={400}
          /> */}
        <div className='animation-1'>
          <Lottie
            options={defaultOptions}
            height={600}
            width={600}
          />
        </div>
        <div className='cursor' />
      </div>
      <Footer />
    </>
  )
}

export default Home;

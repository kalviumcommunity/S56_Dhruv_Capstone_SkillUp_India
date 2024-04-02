import React, { useEffect } from 'react';
import Nav from '../Components/Nav';
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';
import animation1 from '../assets/animation1.json';
import './Home.css';
import './Home.scss';
import Footer from '../Components/Footer';
import anime from '../assets/animation.gif';
import { useTranslation } from "react-i18next";

const Home = () => {
  useEffect(() => {
    const body = document.body;

    body.addEventListener('mousemove', (e) => {
      document.body.style.setProperty('--x', e.clientX + 'px');
      document.body.style.setProperty('--y', e.clientY + 'px');
    });
  }, []);

  const { t } = useTranslation();

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
          <h1 className='title-1'>{t('title-1')}</h1>
          <h2 className='title-2'>{t('title-2')}</h2>
        </div>
        <div className='cta'>
          <button className="button-56" role="button">{t('button-56')}</button>
        </div>
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

import React, { useState, useEffect,useRef } from 'react';
import Nav from '../Components/Nav';
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';
import './Home.css';
import './Home.scss';
import Footer from '../Components/Footer';
import anime from '../assets/animation.gif';
import { useTranslation } from "react-i18next";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const Home = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
      tawkMessengerRef.current.minimize();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % 4); // Change 4 to the number of words you have
    }, 7000); // Change 7000 to the duration of each word animation

    return () => clearInterval(interval);
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
          <h1 className='title-1'>{t('title-1')}
            <div className="string">
              <div className='roller'>
            <span className="rolltext">
              <p className='t-1' style={{display:"inline"}}>{t('Skills')}</p> <br/>
              <p className='t-2' style={{display:"inline"}}>{t('Powers')}</p><br/>
              <p className='t-3' style={{display:"inline"}}>{t('Passion')}</p><br/>
              <p className='t-4' style={{display:"inline"}}>{t('Potential')}</p><br/>
              <p className='t-5' style={{display:"inline"}}>{t('Vision')}</p></span>
            </div></div>
            <h1 className="closure"></h1>
          </h1>
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
            <TawkMessengerReact 
                propertyId="662f3b801ec1082f04e88ab0"
                widgetId="1hsk80rqb"
                ref={tawkMessengerRef}/>
      <Footer />
    </>
  )
}

export default Home;

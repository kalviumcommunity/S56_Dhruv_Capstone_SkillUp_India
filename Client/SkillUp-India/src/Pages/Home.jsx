import React from 'react'
import Nav from '../Components/Nav'
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';
import animation1 from'../assets/animation1.json';
import "./Home.css"


const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const Options = {
    loop: true,
    autoplay: true,
    animationData: animation1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>

      
    <Nav/>
    <div hero-text>
      <h1 >Unlock Your Skills, </h1>
      <h2>Empower Your Future</h2>
    </div>
    {/* <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      /> */}
      <div className='animation-1'>
         <Lottie 
	    options={defaultOptions}
        height={650}
        width={650}
      />
      </div>
    </>
  )
}

export default Home
import React from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import Lottie from 'react-lottie';
import animation2 from '../assets/animation2.json'
import animation3 from '../assets/animation3.json'
import animation4 from '../assets/animation4.json'
import "./Skills.css"



const Skills = () => {
  const Options = {
    loop: true,
    autoplay: true,
    animationData: animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (

<>
<Nav/>
<div className='hero'>


  <div className='hero-text'>
    <h2 className='skills'>Skills</h2>
    <p className='h-2'>Skills create opportunities and connect societies. They are the foundation of economic progress.</p>



  </div>
<div className='animation-2'>
          <Lottie
            options={Options}
            height={600}
            width={600}
          />
        </div>
        </div>
        <p className='s-t-1'> 🎓  What kind of skills are you interested in?</p>


{/* <Footer/> */}
</>
  )
}

export default Skills

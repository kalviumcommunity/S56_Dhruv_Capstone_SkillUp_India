import React from 'react';
import logo from "../assets/LogoProfile.png";
import { GrLanguage } from "react-icons/gr";
import "./Nav.css";

const Nav = () => {
  return (
    <div className='Nav-bar'>
      <div className='logo-img'>
        <p  className='logo'>Logo</p>
        {/* <img src={logo} alt="Logo" className='logo' /> */}
      </div>
      <nav>
        <ul>
          <li><a href="#" className='nav-link'>Skills</a></li>
          <li><a href="#" className='nav-link'>Community</a></li>
          <li><a href="#" className='nav-link'>About Us</a></li>
        </ul>
      </nav>
      <div className='signin-signup'>
        <GrLanguage size={40} className='ln-logo' />
        <p className='Signin'>Sign In</p>  
        <button className="button-54" role="button">Sign Up</button>
      </div>
    </div>
  );
}

export default Nav;

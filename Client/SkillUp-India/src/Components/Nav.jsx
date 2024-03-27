import React, { useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import './Nav.css';
import SignupForm from '../Pages/SignUp'; 
import SigninForm from '../Pages/Signin'; 
const Nav = () => {
  const [showModal, setModal] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };

  const SignIn = () => {
    setSignIn(!isSignIn);
  };

  return (
    <div className='Nav-bar'>
      <div className='logo-img'>
        <p className='logo'>Logo</p>
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
        <p className='Signin' onClick={SignIn}>Sign In</p>  
        <button onClick={toggleModal} className="button-54" role="button">Sign Up</button>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SignupForm /> 
            <button onClick={toggleModal} className="close-button">X</button>
          </div>
        </div>
      )}

      {isSignIn && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SigninForm /> 
            <button onClick={SignIn} className="close-button">X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;

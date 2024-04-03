import React, { useState, useEffect } from 'react';
import { GrLanguage } from "react-icons/gr";
import Select from 'react-select';
import './Nav.css';
import SignupForm from '../Pages/SignUp'; 
import SigninForm from '../Pages/Signin'; 
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [showSelect, setShowSelect] = useState(false);
  const [showModal, setModal] = useState(false);
  const [isSignIn, setSignIn] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Skills") {
      setActiveLink(1);
    } else {
      setActiveLink(null);
    }
  }, [location.pathname]);

  const toggleModal = () => {
    setModal(!showModal);
  };

  const SignIn = () => {
    setSignIn(!isSignIn);
  };

  const changeLanguage = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
    setShowSelect(false);
  };
  const options = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'mr', label: 'Marathi' },
    { value: 'tl', label: 'Tamil' },
    { value: 'te', label: 'Telugu' },
    { value: 'ml', label: 'Malayalam' },
  ];

  const DropdownIndicator = () => {
    return (
      <div onClick={() => setShowSelect(!showSelect)}>
        <GrLanguage size={40} className='ln-logo' />
      </div>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      display: showSelect ? 'block' : '',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className='Nav-bar'>
      <div className='logo-img'>
        <p className='logo'>Logo</p>
      </div>
      <nav>
        <ul>
          <NavLink to="/Skills" onClick={() => setActiveLink(1)} style={{ textDecoration: "none" }}>
            <li className='f'>
              <span className={activeLink === 1 ? 'active' : 'nav-link'}>{t('Skills')}</span>
            </li>
          </NavLink>
          <NavLink to="/Community" style={{ textDecoration: "none" }}>
            <li className='s'><span className='nav-link'>{t('Community')}</span></li>
          </NavLink>
          <NavLink to="/About" style={{ textDecoration: "none" }}>
            <li className='t'><span className='nav-link'>{t('About')}</span></li>
          </NavLink>
        </ul>
      </nav>
      <div className='language-selector'>
        <Select
          onChange={changeLanguage}
          defaultValue={options.find(option => option.value === i18n.language)}
          options={options}
          styles={customStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      </div>
      <div className='signin-signup'>
        <p className='Signin' onClick={SignIn}>{t('Sign')}</p>  
        <button onClick={toggleModal} className="button-54" role="button">{t('SignUp')}</button>
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

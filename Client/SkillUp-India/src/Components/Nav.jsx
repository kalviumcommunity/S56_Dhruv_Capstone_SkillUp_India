import React, { useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import Select from 'react-select';
import { components } from 'react-select';
import './Nav.css';
import SignupForm from '../Pages/SignUp'; 
import SigninForm from '../Pages/Signin'; 
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Skills from '../Pages/Skills';

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [showSelect, setShowSelect] = useState(false);
  const [showModal, setModal] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

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

  const DropdownIndicator = (props) => {
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
          <Link style={{textDecoration:"none",}} to="./Skills" ><li><a href="#" className='nav-link'>{t('Skills')}</a></li></Link>
          <li><a href="#" className='nav-link'>{t('Community')}</a></li>
          <li><a href="#" className='nav-link'>{t('About')}</a></li>
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

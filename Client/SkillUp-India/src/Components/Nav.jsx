import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import Select from 'react-select';
import './Nav.css';
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from "react-router-dom";
import SignIn from "../Pages/Signin.jsx"
import SignUp from "../Pages/SignUp"
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
        <p className='Signin' onClick={() => setSignIn(true)}>{t('Sign')}</p>  
        <button onClick={toggleModal} className="button" role="button">{t('SignUp')}</button>
      </div>

      <AnimatePresence>
        {(showModal || isSignIn) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => {
              setModal(false);
              setSignIn(false);
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                </div>
                <div className="flex gap-2">
                  {isSignIn ? <SignIn /> : <SignUp />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;

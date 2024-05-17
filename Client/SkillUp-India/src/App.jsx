import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Skills from './Pages/Skills';
import Skills_Page from './Pages/Skills_Page';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { ClerkProvider } from '@clerk/clerk-react';
import UserProfilePage from './Pages/UserProfile';
import Contact from '../src/Pages/Contact';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
function AppContent() {
  const [isUserProfilePage, setIsUserProfilePage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('Location changed:', location.pathname);
    setIsUserProfilePage(location.pathname === '/user-profile');
  }, [location]);
  
  useEffect(() => {
    if (isUserProfilePage) {
      document.documentElement.style.fontSize = 'initial';
    } else {
      document.documentElement.style.fontSize = 'calc(100vmax / 1600 * 100)';
      document.documentElement.style.setProperty('--base-font-size', '60px');
    }
  }, [isUserProfilePage]);
  
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <TawkMessengerReact propertyId="property_id" widgetId="default" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/skill/page" element={<Skills_Page />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </ClerkProvider>
    </>
  );
}

export default App;

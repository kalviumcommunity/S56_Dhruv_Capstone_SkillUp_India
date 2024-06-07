import React, { useState } from 'react';
import Nav from '../Components/Nav';
import "./Contact.css";
import Footer from '../Components/Footer';
import logo from '../assets/contact.gif';

export default function Base64FileUpload() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [certainFile, setCertainFile] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function resetStates() {
    setSubmitted(false);
    setError('');
  }

  function resetForm() {
    setName('');
    setEmail('');
    setMessage('');
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    resetStates();

    let multipleFiles = [];

    for (const [index, file] of Object.entries(files)) {
      multipleFiles[`files-${index}`] = (await convertBase64(file));
    }

    const formData = {
      name,
      email,
      message,
      file: file ? await convertBase64(file) : null,
      ...multipleFiles,
      certainFile: certainFile ? await convertBase64(certainFile) : null,
    };

    // Send data to your server
    fetch("http://localhost:3000/submit", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {
      if (response.message === 'Form submitted successfully!') {
        setSubmitted(true);
        resetForm();
      } else {
        setError(response.message);
      }
    })
    .catch(error => {
      setError(error.message ? error.message : error);
    });

    // Send data to Formcarry
    fetch("https://formcarry.com/s/1k4jnmN6mqq", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {
      if (response.message !== 'Form submitted successfully!') {
        setError(response.message);
      }
    })
    .catch(error => {
      setError(error.message ? error.message : error);
    });
  }

  const showNotification = submitted || error;

  function renderStatus() {
    let message = error ? error : `Thanks for reaching out!, we'll get back to you soon.`;
    let icon = error ? 'error' : 'success';

    return (
      <>
        <div className="formcarry-block">
          <div className={`formcarry-message-block fc-${icon} active`}>
            <div className="fc-message-icon"></div>
            <div className="fc-message-content">{message}</div>
            <div className="fc-message-close" onClick={() => resetStates()}></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className='main-1'>
        <h1 className='head'>Let's talk about everything!-</h1>
        <p className='text'>
          At SkillUp India, we're passionate about empowering individuals to navigate their career paths and personal learning journeys. If you have any questions, feedback, or suggestions, we'd love to hear from you.
        </p>
        <img className='gif' src={logo} alt="g" />

        <div className="formcarry-container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="formcarry-block">
              <label htmlFor="name">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your first and last name" />
            </div>

            <div className="formcarry-block">
              <label htmlFor="email">Your Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="john@doe.com" />
            </div>

            <div className="formcarry-block">
              <label htmlFor="message">Your message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Enter your message..."></textarea>
            </div>

            {/* Upload a single file */}
            <div className="formcarry-block">
              <label htmlFor="single-file">Upload a file</label>
              <input id="single-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="formcarry-block">
              <button type="submit">Send</button>
            </div>

            {showNotification && renderStatus()}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

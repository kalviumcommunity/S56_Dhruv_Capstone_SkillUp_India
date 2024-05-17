import React, { useState } from 'react';
import Nav from '../Components/Nav';
import "./Contact.css"
import Footer from '../Components/Footer';
import logo from '../assets/contact.gif'

export default function Base64FileUpload() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [certainFile, setCertainFile] = useState(null)

  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

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

  async function onSubmit(e){
    e.preventDefault();
    e.stopPropagation();

    resetStates();

    let multipleFiles = [];

    for (const [index, file] of Object.entries(files)) {
      multipleFiles[`files-${index}`] = (await convertBase64(file));
    }

    fetch("https://formcarry.com/s/1k4jnmN6mqq", {
      method: 'POST',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message,
        // Formcarry supports base64 file uploads.
        // Please use these for very small files.
        // For larger files, please use the FormData API.
        // Base64 encoded files are large in size for big files, due to the overhead of base64 encoding.
        file: file ? await convertBase64(file) : null,
        // Don't send array of files because it wont work,
        // however you can send files with different names.
        // code below yields something like this:
        // files-0: "base64string"
        // files-1: "base64string"
        // files-2: "base64string"
        ...{...multipleFiles},
        certainFile: certainFile ? await convertBase64(certainFile) : null,
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.code === 200) {
        setSubmitted(true);
        resetForm();
      }
      else if(response.code === 422){
        // Field validation failed
        setError(response.message)
      }
      else {
        // other error from formcarry
        setError(response.message)
      }
    })
    .catch(error => {
      // request related error.
      setError(error.message ? error.message : error);
    });
  }

  const showNotification = submitted || error;

  function renderStatus () {
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
    )
  }

  return (
    <>
    <Nav/>
    <div className='main-1'>
    <h1 className='head'>Let's talk about everything!-</h1>
    <p className='text'>At SkillUp India, we're passionate about empowering individuals to navigate their career paths and personal learning journeys. If you have any questions, feedback, or suggestions, we'd love to hear from you.
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
        <div class="formcarry-block">
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
    <Footer/>
    </>
  )
}
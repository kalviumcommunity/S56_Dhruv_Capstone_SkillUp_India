import React, { useState } from 'react';
import './SignUp.css'; 

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signup form submitted:', formData);
  };

  return (
    <div className="sign-in-container">
      <div className="sign-column s1">
        <div className="sign-column-face s2">
          <div className="s3">
            <div className="sign-header-section">
              <div className="sign-in-title">SignUp Page</div>
              <div className="sign-in-title-alt">Welcome to SkillUp India</div>
            </div>
            <div className="sign-buttons">
              <a href="#" className="login-w-button">
                <img width="18" height="18" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                <span>Sign up with Google</span>
              </a>
              <a href="#" className="login-w-button">
                <img width="18" height="18" src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="mac-os" />
                <span>Sign up with Apple</span>
              </a>
              <a href="#" className="login-w-button">
                <img width="25" height="25" src="https://img.icons8.com/?size=256&id=uLWV5A9vXIPu&format=png" alt="facebook-logo" />
                <span>Sign up with Facebook</span>
              </a>
            </div>
            <div className="slice-container">
              <div className="slice-text-c">
                <div className="slicer"></div>
                <div className="slice-text">Or with email</div>
              </div>
            </div>
            <form className="input-container" onSubmit={handleSubmit}>
              <input type="email" required placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
              <input type="password" required placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
              <a href="#" className="alt-f">Forgot Password ?</a>
              <button type="submit">Sign Up</button>
              <div className="alt-f-full">
                Already a Member ?
                <a href="sign-up.html" className="alt-f">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
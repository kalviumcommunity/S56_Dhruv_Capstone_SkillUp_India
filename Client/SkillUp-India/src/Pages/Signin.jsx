import React, { useState } from 'react';
import './SignUp.css'; 

function SignIn() {
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

    console.log('SignIn form submitted:', formData);
  };

  return (
    <div className="sign-in-container">
      <div className="sign-column s1">
        <div className="sign-column-face s2">
          <div className="s3">
            <div className="sign-header-section">
              <div className="sign-in-title">Sign In Page</div>
              <div className="sign-in-title-alt">Welcome back to SkillUp India !!</div>
            </div>
            <div className="sign-buttons">
              <a href="#" className="login-w-button">
                <img width="18" height="18" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                <span>Sign in with Google</span>
              </a>
              <a href="#" className="login-w-button">
                <img width="18" height="18" src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="mac-os" />
                <span>Sign in with Apple</span>
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
              <button type="submit">Sign In</button>
              <div className="alt-f-full">
                Not a Member yet ?
                <a href="sign-up.html" className="alt-f">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

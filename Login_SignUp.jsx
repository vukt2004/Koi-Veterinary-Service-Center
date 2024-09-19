import { useState } from 'react';
import './css/Login_SignUp.css';  // Assuming the styles are similar, CSS file is reused.

function LoginSignUp() {
  // Hook to manage form state - signup or signin
  const [isSignUp, setIsSignUp] = useState(false);

  // Toggle the signup/signin state
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
      {/* Sign In Form */}
      <div className="form sign-in">
        <h2>Welcome</h2>
        <label>
          <span>User ID</span>
          <input type="text" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <button type="button" className="submit">Sign In</button>
      </div>

      {/* Image and Toggle Text */}
      <div className="sub-cont">
        <div className="img">
          <div className={`img__text ${isSignUp ? '' : 'm--in'}`}>
            <h3>{"If you already have an account, just sign in."}</h3>
          </div>
          <div className={`img__text ${isSignUp ? 'm--up' : ''}`}>
            <h3>{"Don't have an account? Please Sign up!"}</h3>
          </div>
          <div className="img__btn" onClick={toggleSignUp}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="form sign-up">
          <h2>Create your Account</h2>
          <label>
            <span>User ID</span>
            <input type="text" />
          </label>
          <label>
            <span>Full Name</span>
            <input type="text" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <label>
            <span>Confirm Password</span>
            <input type="password" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Phone Number</span>
            <input type="number" />
          </label>
          <label>
            <span>Address</span>
            <input type="text" />
          </label>
          <label>
            <input type="hidden" value={"user"} />
          </label>
          <button type="button" className="submit">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;

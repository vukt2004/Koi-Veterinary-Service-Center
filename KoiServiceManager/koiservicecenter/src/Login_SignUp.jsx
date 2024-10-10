import { useState } from 'react';
import api from './config/axios'
import './Login_SignUp.css';  // Assuming the styles are similar, CSS file is reused.

function LoginSignUp() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await api.post('/login', {
        userID,
        password,
      });

      const token = response.data.token; // Assuming the token is returned in the response
      localStorage.setItem('authToken', token); // Save token in local storage
      console.log('Login successful:', response.data);
      
      // Handle successful login (e.g., save token, redirect, etc.)
    } catch (error) {
      console.log(error.response ? error.response.data.message : 'Sign In failed!');
      setMessage('Fail to log in!')
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async(e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if(password !== confirmPass){
      setMessage('Passwords do not match!');
      return;
    }
    try{
      const user = {ID: {userID}, name: {fullName}, pass: {password}, phoneNumber: {phone}}
      localStorage.setItem('userSignUp', JSON.stringify(user));
      
    } catch(error){
      setMessage(error.response ? error.response.data.message : 'Sign Up failed!');
    } finally {
      setLoading(false);
    }

  }

  // Hook to manage form state - signup or signin
  const [isSignUp, setIsSignUp] = useState(false);

  // Toggle the signup/signin state
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
        {/* Sign In Form */}
        <div className="form sign-in">
          <h2>Welcome</h2>
          <label>
            <span>User ID</span>
            <input type="text" value={userID}
            onChange={(e) => setUserID(e.target.value)} required/>
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <button type="button" className="submit" onClick={handleSubmitLogin} disabled={loading}>{loading ? 'Processing...' : 'Sign In'}</button>
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
              <input type="text" value={userID}
            onChange={(e) => setUserID(e.target.value)} required/>
            </label>
            <label>
              <span>Full Name</span>
              <input type="text" value={fullName}
            onChange={(e) => setFullName(e.target.value)} required/>
            </label>
            <label>
              <span>Password</span>
              <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)} required/>
              
            </label>
            <label>
              <span>Phone Number</span>
              <input type="text" value={phone}
            onChange={(e) => setPhone(e.target.value)} required/>
            </label>
            <button type="button" className="submit" onClick={handleSubmitRegister} disabled={loading}>{loading ? 'Processing...' : 'Sign Up'}</button>
          </div>
        </div>
      </div>
      {message && <h3>{message}</h3>}
    </>
    
  );
}

export default LoginSignUp;

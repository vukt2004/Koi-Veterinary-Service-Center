import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginSignUp from './Login_SignUp.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header className="main-header">
        <div className="container">
            <div className="logo">
                <h1>Koi Services Center</h1>
            </div>

            <nav className="navbar">
                <ul>
                    <li><a href="index.html">Back To Home</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <LoginSignUp />
  </StrictMode>,
)
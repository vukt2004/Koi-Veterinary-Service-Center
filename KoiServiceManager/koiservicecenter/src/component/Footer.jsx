import './css/Footer.css';

function Footer() {
    return (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-social">
              <a href="https://www.facebook.com/FPTU.HCM" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Koi Service Center
            </div>
          </div>
        </footer>
      );
}

export default Footer;
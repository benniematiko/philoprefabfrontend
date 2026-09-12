import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="global-footer">
      <div className="footer-container">
        
        {/* Brand & Corporate Statement Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="logo-main-text">
              Philorenda Metal Works<span className="accent-dot">.</span>
            </div>
            <span className="logo-subtext">FABRICATION</span>
          </div>
          <p className="corporate-statement">
            Delivering precision-engineered metal fabrication, processing, and assembly solutions to infrastructure, manufacturing, and commercial projects across East Africa.
          </p>
          <div className="compliance-badges">
            <span className="compliance-tag">AWS D1.1</span>
            <span className="compliance-tag">ISO 9001</span>
            
            {/* FIXED: Changed <link> to capitalized <Link> and updated path to '/login' */}
            <Link to="/login" className="compliance-tag footer-link">
              MANAGE WEB / LOGIN 
            </Link>
          </div>
        </div>

        {/* Engineering Capabilities Links Column */}
        <div className="footer-links-col">
          <h4>Capabilities</h4>
          <ul>
            <li><a href="#capabilities">CNC Laser Processing</a></li>
            <li><a href="#capabilities">High-Tolerance Bending</a></li>
            <li><a href="#capabilities">Certified Structural Welding</a></li>
            <li><a href="#capabilities">Turnkey OEM Assembly</a></li>
          </ul>
        </div>

        {/* Corporate Resources Column */}
        <div className="footer-links-col">
          <h4>Corporate</h4>
          <ul>
            <li><a href="#about">About Our Facility</a></li>
            <li><Link to="/projects">Project Registry</Link></li>
            <li><a href="#contact">HSE Safety Policy</a></li>
            <li><a href="#contact">Request Estimate</a></li>
          </ul>
        </div>

        {/* Facility Logistics Location Column */}
        <div className="footer-contact-col">
          <h4>Facility Logistics</h4>
          <p className="logistics-detail">
            <strong>Headquarters:</strong> <br />
            Kariobangi Light Industry, Nairobi, Kenya
          </p>
          <p className="logistics-detail">
            <strong>Inquiries:</strong> <br />
            +254 (0) 726 471 291 <br />
            +254 (0) 723 878 464 <br />
            info@pmwfab.co.ke
          </p>
        </div>

      </div>

      {/* Deep Footer / Copyright & Legal Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} PMW Fabrication. All Engineering Rights Reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Protocol</a>
            <span className="divider">|</span>
            <a href="#terms">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
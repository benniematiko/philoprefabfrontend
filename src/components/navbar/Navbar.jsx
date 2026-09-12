import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Dynamically calculate actual rendered navbar height and set CSS variable
  const updateNavbarHeight = () => {
    if (navRef.current) {
      const height = navRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--navbar-height', `${height}px`);
    }
  };

  useLayoutEffect(() => {
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recalculate height whenever scroll state changes (e.g., top-bar hide/show)
  useEffect(() => {
    updateNavbarHeight();
  }, [isScrolled]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header 
      ref={navRef} 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
    >
      {/* ROW 1: TOP INFO BAR */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span>📞 +254 726 471 291 | +254 723 878 464</span>
            <span>📍 Light Industries, Off Outering Road - Nairobi, Kenya</span>
            <span>✉️ info@philorenda.co.ke</span>
          </div>
          <div className="top-bar-right">
            <div className="social-links">
              <a
                href="https://web.facebook.com/profile.php?id=61591667656595"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: MAIN NAVIGATION CONTAINER */}
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="logo-main-line">
              Philorenda Metal Works<span className="accent-dot">.</span>
            </div>
            <span className="logo-subtext">FABRICATION</span>
          </Link>
        </div>

        {/* Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div className="menu-backdrop" onClick={closeMobileMenu}></div>
        )}

        {/* Navigation Drawer */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/products" className="nav-item" onClick={closeMobileMenu}>
            Our Products
          </Link>
          <Link to="/login" className="nav-item" onClick={closeMobileMenu}>
            Admin Login
          </Link>
          <Link to="/contact" className="nav-cta-mobile" onClick={closeMobileMenu}>
            Get a Quote
          </Link>
        </div>

        {/* Desktop Action CTA */}
        <div className="navbar-actions">
          <Link to="/contact" className="nav-cta-btn">
            Get a Quote
          </Link>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          className={`hamburger ${isMobileMenuOpen ? 'toggle' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
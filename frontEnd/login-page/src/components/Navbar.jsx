import { useState, useEffect, useRef } from 'react';
import ThemeSwitch from "./ThemeSwitch";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/signup' },
    { label: 'Profile', href: '/profile' }
  ];

  const styles = {
    nav: {
      backgroundColor: '#0f9cafff',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #000000ff, #000000ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textDecoration: 'none'
    },
    desktopNav: {
      display: isMobile ? 'none' : 'flex',
      gap: '2rem'
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.2s'
    },
    ctaButton: {
      backgroundColor: '#c30000ff',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    desktopCtaContainer: {
      display: isMobile ? 'none' : 'block'
    },
    mobileButtonContainer: {
      display: isMobile ? 'block' : 'none'
    },
    mobileButton: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      backgroundColor: 'transparent',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileMenu: {
      display: isMobile ? 'block' : 'none',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
      maxHeight: isOpen ? '400px' : '0',
      opacity: isOpen ? '1' : '0',
      backgroundColor: '#1e293b'
    },
    mobileMenuInner: {
      padding: '0.5rem 1rem 1rem'
    },
    mobileLink: {
      display: 'block',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      color: 'white',
      textDecoration: 'none',
      marginBottom: '0.5rem',
      transition: 'background-color 0.2s'
    },
    mobileCta: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '0.5rem',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          {/* Logo */}
          <div>
            <a href="#home" style={styles.logo}>
              Myapp
            </a>
          </div>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={styles.navLink}
                onMouseEnter={(e) =>
                    e.target.style.color = '#60a5fa'
                }

                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                {item.label}
              </a>
            ))}

          </div>

          {/* CTA Button - Desktop */}
          <div style={styles.desktopCtaContainer}>
            <ThemeSwitch></ThemeSwitch>
          </div>

          {/* Mobile menu button */}
          <div style={styles.mobileButtonContainer}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={styles.mobileButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}

      <div style={styles.mobileMenu}>

        <div style={styles.mobileMenuInner}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={styles.mobileLink}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#334155'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {item.label}
            </a>

          ))}
        <ThemeSwitch></ThemeSwitch>
        </div>
      </div>
    </nav>
  );
}
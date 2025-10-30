// src/components/Navbar.jsx

import React from 'react';
import useTheme  from '../hooks/useTheme.js';
import { LightMode, DarkMode } from '@mui/icons-material'; // Assuming you install Mui icons later

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h2 style={styles.logo}>
          STUDENT PORTFOLIO MANAGER
        </h2>
        
        {/* Dark Mode Toggle (Custom Feature #1) */}
        <button 
          onClick={toggleTheme} 
          style={styles.themeToggle}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </nav>
  );
};

// --- Basic Styling for Navbar (using JS for simplicity, but CSS is better) ---
const styles = {
    navbar: {
        backgroundColor: 'var(--color-bg-card)', 
        color: 'var(--color-text-primary)',
        padding: '15px 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid var(--color-accent)'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
        fontSize: '1.5rem',
        color: 'var(--color-accent)',
    },
    themeToggle: {
        padding: '8px 15px',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-accent)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.2s',
    }
};

export default Navbar;
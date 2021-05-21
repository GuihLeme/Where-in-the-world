import React, { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../hooks/ThemeContext';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={isDarkMode ? styles.darkHeader : styles.lightHeader}>
      <div className={styles.content}>
        <h1>Where in the world?</h1>
        <div className={styles.toggleTheme} onClick={toggleTheme}>
          {isDarkMode
            ? (
              <>
              <FiSun size={20} />
              <p>Light Mode</p>
              </>
            )
            : (
              <>
              <FiMoon size={20} />
              <p>Dark Mode</p>
              </>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;
function useSate(): any[] {
  throw new Error('Function not implemented.');
}


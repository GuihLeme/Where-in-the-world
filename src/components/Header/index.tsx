import React, { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleMode = () => {
    setIsLightMode(!isLightMode);
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Where in the world?</h1>
        <div className={styles.toggleTheme} onClick={toggleMode}>
          {isLightMode
            ? (
              <>
              <FiMoon size={20} />
              <p>Dark Mode</p>
              </>
            )
            : (
              <>
              <FiSun size={20} />
              <p>Light Mode</p>
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


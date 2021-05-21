import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSearchAndFilter } from '../../hooks/SearchAndFilterContext';
import { useTheme } from '../../hooks/ThemeContext';

import styles from './styles.module.scss';

const Select: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { toggleIsMenuOpen, selectedRegion, isMenuOpen, handleSelectedRegion } = useSearchAndFilter()

  return (
    <div className={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <div className={styles.select} onClick={toggleIsMenuOpen}>
        {selectedRegion === null
          ? (
            <>
              Filter by Region <span>
                {isMenuOpen
                  ? <FiChevronUp size={20} />
                  : <FiChevronDown size={20} />
                }
                </span>
            </>
          )
          : (
            <>
              {selectedRegion} <span>
                {isMenuOpen
                  ? <FiChevronUp size={20} />
                  : <FiChevronDown size={20} />
                }
              </span>
            </>
          )
        }

        <div className={styles.dropMenu}>
        {isMenuOpen && (
          <>
            <div className={styles.option} onClick={() => handleSelectedRegion('Africa')}>Africa</div>
            <div className={styles.option} onClick={() => handleSelectedRegion('Americas')}>Americas</div>
            <div className={styles.option} onClick={() => handleSelectedRegion('Asia')}>Asia</div>
            <div className={styles.option} onClick={() => handleSelectedRegion('Europe')}>Europe</div>
            <div className={styles.option} onClick={() => handleSelectedRegion('Oceania')}>Oceania</div>
          </>
        )}
      </div>
      </div>

    </div>
  )
}

export default Select;

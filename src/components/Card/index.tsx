import Link from 'next/link';
import React from 'react';
import { useTheme } from '../../hooks/ThemeContext';

import styles from './styles.module.scss';

interface CardDetailsProps {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
  alpha3Code: string;
}

const Card: React.FC<CardDetailsProps> = ({ flag, name, population, region, capital, alpha3Code }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? styles.darkCard : styles.lightCard}>
      <Link href={`countries/${alpha3Code}`}>
        <a>
          <img src={flag} alt={`flag of ${name}`} />
        </a>
      </Link>
      <div className={styles.details}>
        <Link href={`countries/${alpha3Code}`}>
          <a><h2>{name}</h2></a>
        </Link>
        <p><span>Population:</span> {population}</p>
        <p><span>Region:</span> {region}</p>
        <p><span>Capital:</span> {capital}</p>
      </div>
    </div>
  )
}

export default Card;

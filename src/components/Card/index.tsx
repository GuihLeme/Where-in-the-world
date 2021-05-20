import React from 'react';

import styles from './styles.module.scss';

interface CardDetailsProps {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
}

const Card: React.FC<CardDetailsProps> = ({ flag, name, population, region, capital }) => {
  return (
    <div className={styles.card}>
      <img src={flag} alt={`flag of ${name}`} />
      <div className={styles.details}>
        <h2>{name}</h2>
        <p><span>Population:</span> {population}</p>
        <p><span>Region:</span> {region}</p>
        <p><span>Capital:</span> {capital}</p>
      </div>
    </div>
  )
}

export default Card;

import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../services/api';

import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';

import { useSearchAndFilter } from '../hooks/SearchAndFilterContext';
import { parsePopulation } from '../utils/parsePopulation';

import styles from '../styles/scss/Home.module.scss';
import { useTheme } from '../hooks/ThemeContext';

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isDarkMode } = useTheme();

  const { countries, setCountries } = useSearchAndFilter();

  const handleSubmit = useCallback(async () => {
    const country = formRef.current.getFieldValue('search')
    const response = await api.get(`/name/${country}`)
    setCountries(response.data)
  },[]);

  const parsedCountries = countries.map(country => {
    const parsedPopulation = parsePopulation(country.population);

    return {
      flag: country.flag,
      name: country.name,
      population: parsedPopulation,
      region: country.region,
      capital: country.capital,
      alpha3Code: country.alpha3Code
    }
  })

  return (
    <section className={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <div className={styles.content}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.searchAndFilter}>
            <Input name="search" type="text" placeholder="Search for a country..." />
            <Select />
          </div>
        </Form>

        <div className={styles.cards}>
          {parsedCountries.map((country, index)=> {
            return(
              <Card
                key={index}
                flag={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                alpha3Code={country.alpha3Code}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Home;

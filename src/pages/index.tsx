import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../services/api';
import { useSearchAndFilter } from '../hooks/SearchAndFilterContext';

import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';

import styles from '../styles/scss/Home.module.scss';

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { parsedCountries, setCountriesByRegion } = useSearchAndFilter();

  const handleSubmit = useCallback(async () => {
    const country = formRef.current.getFieldValue('search')
    const response = await api.get(`/name/${country}`)
    setCountriesByRegion(response.data)

    console.log(response.data)
  },[]);

  return (
    <section className={styles.container}>
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
              />
            )
          })}
        </div>

      </div>

    </section>
  )
}

export default Home;

import React from 'react';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { parsePopulation } from '../../utils/parsePopulation';

import api from '../../services/api';

import styles from './styles.module.scss';
import { useTheme } from '../../hooks/ThemeContext';

interface Currency {
  code: string,
  name: string,
  simbol: string,
}

interface Language {
  iso639_1: string,
  iso639_2: string,
  name: string,
  nativeName: string,
}

interface BorderCountry {
  name: string;
  alpha3Code: string;
}

interface Country {
  name: string,
  nativeName: string,
  population: string,
  region: string,
  subregion: string,
  capital: string,
  topLevelDomain: string[],
  currencies: Currency[],
  languages: Language[],
  flag: string,
  borders: BorderCountry[],
}

interface CountryProps {
  country: Country;
}

const Country = ({ country }: CountryProps) => {
  const { isDarkMode } = useTheme();

  return (
    <section className={isDarkMode? styles.darkContainer : styles.lightContainer}>
      <div className={styles.allContent}>
        <div className={styles.goBack}>
          <Link href="/">
            <a>
              <BsArrowLeft size={20} />
              <span>
                Back
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.content}>
          <img src={country.flag} alt={`flag of ${country.name}`} />
          <div className={styles.data}>
            <h1>{country.name}</h1>
            <div className={styles.details}>
              <div><h3>Native name:</h3><p>{country.nativeName}</p></div>
              <div><h3>Population:</h3><p>{country.population}</p></div>
              <div><h3>Region:</h3><p>{country.region}</p></div>
              <div><h3>Sub Region:</h3><p>{country.subregion}</p></div>
              <div><h3>Capital:</h3><p>{country.capital}</p></div>
              <div><h3>Top level domain:</h3><p>{country.topLevelDomain}</p></div>
              <div><h3>Currencies:</h3>
                {country.currencies.map(currency => {
                  return(
                    <p key={currency.code} className={styles.currency}>
                      {currency.name}
                    </p>
                  )
                })}
              </div>

              <div><h3>Languages:</h3>
                {country.languages.map(language => {
                  return(
                    <p key={language.iso639_1} className={styles.language}>
                      {language.name}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className={styles.borders}>
              <h3>Border Countries:</h3>
              <div className={styles.countries}>
                {country.borders.map(border => {
                  return(
                    <div key={border.alpha3Code}>
                      <Link href={`/countries/${border.alpha3Code}`}>
                        {border.name}
                      </Link>
                    </div>
                  )
                })}
              </div>



            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Country;

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths:[],
    fallback: 'blocking',
  }
}

export const getStaticProps:GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/alpha/${slug}`);

  const allCountries = await api.get('?fields=alpha3Code;name');

  const borderCountries = []

  data.borders.map(border => {
    allCountries.data.find(country => {
      if(country.alpha3Code === border) {
        borderCountries.push(country);
      }
    })
  })

  const parsedPopulation = parsePopulation(data.population);

  const country = {
    name: data.name,
    nativeName: data.nativeName,
    population: parsedPopulation,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital,
    topLevelDomain: data.topLevelDomain,
    currencies: data.currencies,
    languages: data.languages,
    flag: data.flag,
    borders: borderCountries,
  }

  return {
    props: {
      country,
    },
    revalidate: 60 * 60 * 24 * 7 // once a week
  }
}


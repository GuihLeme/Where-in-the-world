import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';

import api from '../services/api';

interface Country {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
}

interface SearchAndFilterContextData {
  isMenuOpen: boolean;
  selectedRegion: string;
  countriesByRegion: Country[];
  parsedCountries: Country[];
  toggleIsMenuOpen: () => void;
  handleSelectedRegion: (region: string) => void;
  setCountriesByRegion: (country) => void;
}

export const SearchAndFilterContext = createContext<SearchAndFilterContextData>({} as SearchAndFilterContextData);

export const SearchAndFilterProvider: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [countriesByRegion, setCountriesByRegion] = useState([] as Country[]);

  useEffect(() => {
    api.get('/all').then((response) => {
      setCountriesByRegion(response.data)
      console.log(response.data)
    })
  }, []);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleSelectedRegion = async (region: string) => {
    setSelectedRegion(region);

    const response = await api.get(`/region/${region}`);
    setCountriesByRegion(response.data)

    setIsMenuOpen(false);
  }

  const parsedCountries = countriesByRegion.map(country => {
    const parsedPopulation = country.population.toLocaleString();

    return {
      flag: country.flag,
      name: country.name,
      population: parsedPopulation,
      region: country.region,
      capital: country.capital,
    }
  })


  return(
    <SearchAndFilterContext.Provider value={{
      isMenuOpen,
      selectedRegion,
      countriesByRegion,
      parsedCountries,
      toggleIsMenuOpen,
      handleSelectedRegion,
      setCountriesByRegion
    }}>
      {children}
    </SearchAndFilterContext.Provider>
  )
}

export function useSearchAndFilter(): SearchAndFilterContextData {
  const context = useContext(SearchAndFilterContext);

  return context;
}



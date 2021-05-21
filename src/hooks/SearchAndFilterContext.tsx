import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import api from '../services/api';

interface Country {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
  alpha3Code: string;
  currencies: string[];
  borders: string[];
}

interface BorderCountry {
  name: string;
}

interface SearchAndFilterContextData {
  isMenuOpen: boolean;
  selectedRegion: string;
  countries: Country[];
  borderCountries: BorderCountry[];
  toggleIsMenuOpen: () => void;
  handleSelectedRegion: (region: string) => void;
  setCountries: (countries: Country[]) => void;
  setBorderCountries: (borderCountries: BorderCountry[]) => void;
}

export const SearchAndFilterContext = createContext<SearchAndFilterContextData>({} as SearchAndFilterContextData);

export const SearchAndFilterProvider: React.FC =  ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [countries, setCountries] = useState([] as Country[]);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    api.get('/all').then((response) => {
      setCountries(response.data)
    })
  }, []);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleSelectedRegion = async (region: string) => {
    setSelectedRegion(region);

    const response = await api.get(`/region/${region}`);
    setCountries(response.data)

    setIsMenuOpen(false);
  }

  return(
    <SearchAndFilterContext.Provider value={{
      isMenuOpen,
      selectedRegion,
      countries,
      borderCountries,
      toggleIsMenuOpen,
      handleSelectedRegion,
      setCountries,
      setBorderCountries,
    }}>
      {children}
    </SearchAndFilterContext.Provider>
  )
}

export function useSearchAndFilter(): SearchAndFilterContextData {
  const context = useContext(SearchAndFilterContext);

  return context;
}



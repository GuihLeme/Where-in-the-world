import '../styles/scss/Main.scss';

import { SearchAndFilterProvider } from '../hooks/SearchAndFilterContext';
import { ThemeProvider } from '../hooks/ThemeContext';
import Header from '../components/Header';

const App = ({ Component, pageProps }) => {
  return(
    <SearchAndFilterProvider>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </SearchAndFilterProvider>
  )

}

export default App;

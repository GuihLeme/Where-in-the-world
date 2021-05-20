import '../styles/scss/Main.scss';

import { SearchAndFilterProvider } from '../hooks/SearchAndFilterContext';
import Header from '../components/Header';

const App = ({ Component, pageProps }) => {
  return(
    <SearchAndFilterProvider>
      <Header />
      <Component {...pageProps} />
    </SearchAndFilterProvider>
  )

}

export default App;

import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Search from './components/Search';
import DisplayCountries from './components/DisplayCountries';

function App () {
  const [filterCountries, setFilterCountries] = useState(null);
  const [allCountries, setAllCountries] = useState(null);

  const hook = () => {
    countryService.getAll().then(countries =>
      setAllCountries(countries)
    );
  };
  useEffect(hook, []);
  if (!allCountries) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = e.target.value.toLowerCase();
    let filteredCountries = null;
    if (searchVal) {
      filteredCountries = allCountries.filter((country) => (
        country.name.common.toLowerCase().includes(searchVal) ||
        country.name.official.toLowerCase().includes(searchVal)
      ));
    }
    setFilterCountries(filteredCountries);
  };

  const showClick = (country) => setFilterCountries([country]);

  return (
    <>
      <Search handleSearchChange={handleSearch} />
      <DisplayCountries countries={filterCountries} handleCountryClick={showClick} />
    </>
  );
}

export default App;

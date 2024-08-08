import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const CountryName = ({ country, handleCountryClick }) => (
  <>
    <p>
      {country.name.common}
      <button onClick={() => handleCountryClick(country)}>show</button>
    </p>
  </>
);

const FullCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const weatherHook = () => {
    setLoading(true);
    weatherService.getWeather(country.latlng)
      .then(weather => {
        setWeather(weather);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(weatherHook, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {
          Object.values(country.languages).map((lang, index) => (
            <li key={index}>{lang}</li>
          ))
        }
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {
        loading
          ? (<p>Loading weather data....</p>)
          : (
            <>
              <h2>Weather in {country.capital[0]}</h2>
              <p>temperature {weather.main.temp} Celsius</p>
              <img src={weatherService.getIcon(weather.weather[0].icon)} alt='' />
              <p>wind {weather.wind.speed} m/s</p>
            </>
            )
      }
    </>
  );
};

const DisplayCountries = ({ countries, handleCountryClick }) => {
  let display;

  if (!countries) display = <></>;
  else if (countries.length > 10) display = <p>Too many matches, specify another filter</p>;
  else if (countries.length === 1) display = <FullCountry country={countries[0]} />;
  else {
    display = countries.map((country) => (
      <CountryName key={country.ccn3} country={country} handleCountryClick={handleCountryClick} />
    ));
  }

  return (
    <div>
      {display}
    </div>
  );
};

export default DisplayCountries;

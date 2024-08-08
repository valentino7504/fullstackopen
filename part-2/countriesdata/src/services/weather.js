import axios from 'axios';

const apiKey = import.meta.env.VITE_OWAPI_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const iconUrl = 'https://openweathermap.org/img/wn/';

const getWeather = ([latitude, longitude]) => (
  axios.get(baseUrl, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: apiKey,
      units: 'metric'
    }
  })
    .then(response => response.data)
);

const getIcon = (iconStr) => (`${iconUrl}/${iconStr}@2x.png`);

export default { getWeather, getIcon };

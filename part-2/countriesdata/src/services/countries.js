import axios from 'axios';

const constructUrl = (country) => {
  const base = 'https://studies.cs.helsinki.fi/restcountries/api';
  if (country) return `${base}/name/${country}`;
  return `${base}/all`;
};

const getAll = () => axios.get(constructUrl(null)).then(response => response.data);

const getCountry = (country) => axios.get(constructUrl(country)).then(response => response.data);

export default { getAll, getCountry };

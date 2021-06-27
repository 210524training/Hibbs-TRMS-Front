import axios from 'axios';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests

console.log(process.env.REACT_APP_ENVIRONMENT);
console.log(process.env.TRMS_URL);

const trmsClient = axios.create({
  baseURL: 'http://localhost:3050',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Origin':'http://localhost:3050'
  },
  withCredentials: true,
});

export default trmsClient;

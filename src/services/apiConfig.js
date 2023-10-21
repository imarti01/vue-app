import axios from 'axios';

export const instance = axios.create({
  baseURL:
    'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets',
  timeout: 5000,
});

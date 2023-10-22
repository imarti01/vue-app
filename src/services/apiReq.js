import { instance } from './apiConfig';

export const getAllData = async (offset) => {
  return instance.get(
    `/incendios-forestales/records?where=fecha_inicio%20>%20"2021-10-20"&order_by=fecha_inicio%20desc&limit=20&offset=${offset}`
  );
};

export const getEachFilterData = async (groupBy) => {
  return instance.get(
    `/incendios-forestales/records?select=${groupBy}&group_by=${groupBy}&limit=100`
  );
};

export const getFilteredData = async (query, offset) => {
  return instance.get(
    `/incendios-forestales/records?where=${query}&order_by=fecha_inicio%20desc&limit=20&offset=${offset}`
  );
};

export const getAllMapData = async () => {
  return instance.get(
    `/incendios-forestales/records?select=fecha_inicio%2C%20situacion_actual%2C%20posicion&where=posicion%20IS%20NOT%20NULL%20and%20fecha_inicio%20%3E%20%272021-10-20%27&order_by=fecha_inicio%20desc&limit=100`
  );
};

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

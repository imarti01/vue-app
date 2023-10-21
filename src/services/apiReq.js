import { instance } from './apiConfig';

export const getAllData = async (offset) => {
  return instance.get(
    `/incendios-forestales-copiar/records?where=fecha_inicio%20>%20"2021-10-20"&order_by=fecha_inicio%20desc&limit=10&offset=${offset}`
  );
};

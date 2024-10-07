import { API_URL_GET_DECLARATION } from "../contants/configUrl";
import { IDeclarations } from "../contants/delaration";
import axiosClient from "./http-common";

export const getDeclarations = async (): Promise<IDeclarations[]> => {
  return axiosClient.get(API_URL_GET_DECLARATION);
};

export const getDeclarationById = (id: string): Promise<IDeclarations> => {
  return axiosClient.get(`${API_URL_GET_DECLARATION}/${id}`);
};

export const createDeclaration = (body: IDeclarations): Promise<IDeclarations> => {
  return axiosClient.post(API_URL_GET_DECLARATION, body);
};

export const editDeclaration = (body: IDeclarations, id: string): Promise<IDeclarations> => {
  return axiosClient.post(`${API_URL_GET_DECLARATION}/${id}`, body);
};

export const APII = {
  getDeclarations,
};

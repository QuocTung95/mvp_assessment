import {
  API_URL_GET_UESR,
  API_URL_LOGIN,
  API_URL_REGISTER,
} from "../contants/configUrl";
import { IUser } from "../contants/user";
import axiosClient from "./http-common";

export const login = async (body: any): Promise<{ accessToken: string }> => {
  return await axiosClient.post(API_URL_LOGIN, body);
};
export const register = (body: any) => {
  return axiosClient.post(API_URL_REGISTER, body);
};
export const getUser = (): Promise<IUser> => {
  return axiosClient.get(API_URL_GET_UESR);
};

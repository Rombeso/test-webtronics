import {AxiosResponse} from "axios";
import {instance} from "./instance-api";

export const authAPI = {
  preLogin(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/user/pre-login/', data)
  },
  login(email: string, code: string) {
    return instance.post<{email: string, code: string}, AxiosResponse<ResponseType>>('/user/login/', {
      email,
      code
    })
  },
  logOut() {
    return instance.post<{},AxiosResponse<LogOutResponseType>>(`/user/logout/`, {})
  },
}

export type LoginParamsType = {
  login: string
  password: string
}

export type LogOutResponseType = {
  info: string
  error: string
}

export type ResponseType = {
  access: string
  refresh: string
  statusText: string
  error?: string;
}
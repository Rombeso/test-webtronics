import {AxiosResponse} from "axios";
import {instance} from "./instance-api";

export const registrationAPI = {
    addUser(username: string, email: string, password1: string, password2: string, keyword: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<addUserResponse>>(`/user/register/`, {
            username,
            email,
            password1,
            password2,
            keyword
        });
    },
    verifyUser(key: string) {
        return instance.post<{ key: string}, AxiosResponse<addUserResponse>>(`/user/register/verify`, {
            key
        });
    }
}

export type addUserResponse = {
    addedUser: any
    error: string
}


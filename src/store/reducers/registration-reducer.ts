
import { Dispatch} from "redux";
import { registrationAPI } from "../../api/registration-api";
import {setAppStatusAC} from "./app-reducer";
import {AppRootActionsType} from "../store";


const initialState: StateRegistrationReducerType = {
    emailConfirmationKey: null,
    key: null
}

const registrationReducer = (state: StateRegistrationReducerType = initialState, action: RegistrationActionType): StateRegistrationReducerType => {
  switch (action.type) {
      case 'EMAIL-CONFIRMATION-KEY':
      case 'REGISTER-VERIFY-USER':
          return  {
              ...state,
              ...action.payload,
          }
    default: {
      return state
    }
  }
};

export const emailConfirmationKey = (emailConfirmationKey: string) => {
    return {
        type: 'EMAIL-CONFIRMATION-KEY',
        payload: {emailConfirmationKey}
    } as const
}

export const registerVerifyUser = (key: string) => {
    return {
        type: 'REGISTER-VERIFY-USER',
        payload: {key}
    } as const
}



export const addUser = (username: string, email: string, password1: string, password2: string, keyword: string) => async (dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
       const res = await registrationAPI.addUser(username, email, password1, password2, keyword)
        dispatch(setAppStatusAC("succeeded"))
        console.log(res)
        // dispatch(setAppSuccessAC(res.statusText))
        // dispatch(setAppErrorAC(null))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        console.log(e)
        // dispatch(setAppErrorAC(error.response.data.error))
    }
}
export const verifyUser = (key: string) => async (dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await registrationAPI.verifyUser(key)
        dispatch(setAppStatusAC("succeeded"))
        console.log(res)
        // dispatch(setAppSuccessAC(res.statusText))
        // dispatch(setAppErrorAC(null))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        console.log(e)
        // dispatch(setAppErrorAC(error.response.data.error))
    }
}
export type StateRegistrationReducerType = {
    emailConfirmationKey: string | null,
    key: string | null
}

type EmailConfirmationKeActionType = ReturnType<typeof emailConfirmationKey>
type RegisterVerifyUserActionType = ReturnType<typeof registerVerifyUser>
export type RegistrationActionType = EmailConfirmationKeActionType | RegisterVerifyUserActionType

export default registrationReducer
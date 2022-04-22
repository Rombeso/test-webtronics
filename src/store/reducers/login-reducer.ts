

import {Dispatch} from "redux";
import {AppActionType, setAppStatusAC, SetAppStatusActionType, setMassage} from "./app-reducer";
import {authAPI, LoginParamsType} from "../../api/login-api";

type InitialStateType = {
    access: null | string
    refresh: null | string
}

export const initialState: InitialStateType = {
    access: null,
    refresh: null
}

const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType):InitialStateType => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {...state,
          ...action.payload}
    default:
      return state
  }
}

//action
export const setToken = (access: string, refresh: string) => {
  return {
    type: 'SET_TOKEN',
      payload: {access, refresh}
  } as const
}

//thunk
export const setUserDataForPreLogin = (data: LoginParamsType) => async (dispatch: Dispatch<LoginActionsType>) => {
  dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.preLogin(data)
        console.log(res)
        dispatch(setMassage(res.statusText))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e:any) {
        dispatch(setAppStatusAC('failed'))
        console.log(e.response)
        dispatch(setMassage(e))
    }
}

export const setLogin = (email: string, code: string) => async (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(email, code)
        console.log(res)
        dispatch(setToken(res.data.access, res.data.refresh))
        dispatch(setMassage(res.statusText))
        // dispatch(setAppSuccessAC(res.statusText))
        // dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e:any) {
        dispatch(setAppStatusAC('failed'))
        console.log(e)
        dispatch(setMassage(e))
    }
}

export const setLogout = () => async (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.logOut()
        console.log(res)
        dispatch(setMassage(res.statusText))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e:any) {
        dispatch(setAppStatusAC('failed'))
        console.log(e)
        dispatch(setMassage(e))    }
}

export type LoginActionsType =
    | setTokenActionType
    | AppActionType
type setTokenActionType = ReturnType<typeof setToken>

export default loginReducer;
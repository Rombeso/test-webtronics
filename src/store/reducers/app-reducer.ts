

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type initialStateType = {
  status: RequestStatusType,
  massage: string | null,
}

const initialState = {
  status: 'idle' as RequestStatusType,
  massage: null
}

export const appReducer = (state: initialStateType = initialState, action: AppActionType): initialStateType => {
  switch (action.type) {
    case "APP/SET_STATUS":
      case "SET-MASSAGE":
      return {...state,
        ...action.payload}
    default: {
      return state
    }
  }
};

export type AppActionType = SetAppStatusActionType | SetMassageType

export const setAppStatusAC = (status:RequestStatusType) => {
  return {
    type: 'APP/SET_STATUS',
    payload: {status}
  } as const
}
export const setMassage = (massage: string | null) => {
  return {
    type: 'SET-MASSAGE',
    payload: {massage}
  } as const
}

export type SetMassageType = ReturnType<typeof setMassage>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


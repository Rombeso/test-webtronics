import {AnyAction, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { legacy_createStore as createStore} from 'redux'
import registrationReducer, {RegistrationActionType} from "./reducers/registration-reducer";
import {AppActionType, appReducer} from "./reducers/app-reducer";
import loginReducer, {LoginActionsType} from "./reducers/login-reducer";


let rootReducer = combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    app: appReducer,
    // error: errorReducer
})


export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

// AppActionsType
export type AppRootActionsType = RegistrationActionType
    | AppActionType
    | LoginActionsType
// | ErrorActionType

export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

//thunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
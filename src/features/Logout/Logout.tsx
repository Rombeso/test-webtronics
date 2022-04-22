import React, {useEffect} from 'react'
import s from './Logout.module.css'
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from 'react-router-dom';
import {Preloader} from "../../components/Preloader/Preloader";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {setLogout} from "../../store/reducers/login-reducer";
import {path} from "../../routes/Routes";
import {setAppStatusAC} from "../../store/reducers/app-reducer";

const Logout = () => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const access = useSelector<AppRootStateType>(state => state.login.access)
    const refresh = useSelector<AppRootStateType>(state => state.login.refresh)
    const navigate = useNavigate()

    const toLogout = () => {
        dispatch(setLogout())
    }
    useEffect(() => {
        if (status === "succeeded") {
            navigate(path.login)
            dispatch(setAppStatusAC('idle'))
        }
    }, [status])

    return (
        <>
            <div className={s.wrapp}>
                {status === "loading" && <Preloader/>}
                <div className={s.titleContainer}>
                    <span className={s.titleText}>Welcome to log out</span>
                </div>
                <div className={s.buttonContainer}>
                    <button className={s.button} onClick={toLogout}>Log out</button>
                </div>
            </div>
            <p className={s.secondTitleText}><b>Your access: </b>{`${access}`}</p>
            <p className={s.secondTitleText}><b>Your refresh: </b>{`${refresh}`}</p>
        </>
    )
}

export default Logout;





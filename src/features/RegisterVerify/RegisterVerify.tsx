import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../../components/Preloader/Preloader";
import {path} from "../../routes/Routes";
import {verifyUser} from "../../store/reducers/registration-reducer";

const RegisterVerify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyParam = searchParams.get('key')
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const navigate = useNavigate()

    const toLogin = () => {
        navigate(path.login)
    }
    console.log('Страница отрисовалась')

    useEffect(() => {
        if (keyParam){
            dispatch(verifyUser(keyParam))
        }
    }, [])

    useEffect(() => {
        if (status === "succeeded") {
            toLogin()
        }
    }, [status])

    return     <>
<Preloader/>
    </>
}

export default RegisterVerify;
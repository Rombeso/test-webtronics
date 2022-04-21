import React, {useEffect, useState} from 'react'
import s from './LoginVerify.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {NavLink, useNavigate} from 'react-router-dom';
import {LoginParamsType} from "../../api/login-api";
import {Preloader} from "../../components/Preloader/Preloader";
import { yupResolver } from '@hookform/resolvers/yup';
import {AppDispatch, AppRootStateType} from "../../store/store";
import {setLogin, setUserDataForPreLogin} from "../../store/reducers/login-reducer";
import ReactInputVerificationCode from 'react-input-verification-code';
import './LoginAddStyles.css'
import {path} from "../../routes/Routes";
import {setAppStatusAC} from "../../store/reducers/app-reducer";

const schema = yup.object({
  login: yup.string().required('Email is required'),
}).required();

const LoginVerify = () => {
  const [verifyCode, setVerifyCode] = useState<null | string>(null)

  const getVerifyCode = (data: string) => {
    setVerifyCode(data)
  }
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginParamsType>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: LoginParamsType) => {
    console.log(data.login, verifyCode)
    verifyCode && dispatch(setLogin(data.login, verifyCode))
  }
  const dispatch: AppDispatch = useDispatch()
  const status = useSelector<AppRootStateType>(state => state.app.status)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "succeeded") {
      navigate(path.logout)
      dispatch(setAppStatusAC('idle'))
    }
  }, [status])

  return (
    <div className={s.wrapp}>
      {status === "loading" && <Preloader/>}
      <div className={s.titleContainer}>
        <span className={s.titleText}>Login to the system</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputContainer}>
          <div className={s.passwordAndLoginImput}>
            <input className={s.input} {...register("login")} placeholder='Email'/>
          </div>
          <div className={s.error}>{errors.login?.message}</div>
        </div>
        <div>
          <span className={s.secondTitleText}>Enter the confirmation code from your email</span>
        </div>
        <div className='custom-styles'>
          <ReactInputVerificationCode placeholder="" onChange={getVerifyCode} />
        </div>
        <div className={s.buttonContainer}>
          <button className={s.button} type={'submit'} disabled={!isValid}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginVerify;





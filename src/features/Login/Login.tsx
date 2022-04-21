import React, {useEffect, useState} from 'react'
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import eye from '../../asset/images/eye.png'
import hidden from '../../asset/images/hidden.png'
import {LoginParamsType} from "../../api/login-api";
import {Preloader} from "../../components/Preloader/Preloader";
import { yupResolver } from '@hookform/resolvers/yup';
import {AppDispatch, AppRootStateType} from "../../store/store";
import {setUserDataForPreLogin} from "../../store/reducers/login-reducer";
import {path} from "../../routes/Routes";
import {setAppStatusAC} from "../../store/reducers/app-reducer";

const schema = yup.object({
  login: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const Login = () => {
  const [show, setShow] = useState(false)
  const status = useSelector<AppRootStateType>(state => state.app.status)

  const onclickShowHandle = () => {
    setShow(!show)
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "succeeded") {
      navigate(path.loginVerify)
      dispatch(setAppStatusAC('idle'))
    }
  }, [status])

  const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginParamsType>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: LoginParamsType) => {dispatch(setUserDataForPreLogin(data))}
  const dispatch: AppDispatch = useDispatch()

  return (
    <div className={s.wrapp}>
      {status === "loading" && <Preloader/>}
      <div className={s.titleContainer}>
        <span className={s.titleText}>Authorisation</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputContainer}>
          <div className={s.passwordAndLoginImput}>
            <input className={s.input} {...register("login")} placeholder='LoginVerify'/>
          </div>
          <div className={s.error}>{errors.login?.message}</div>
          <div className={s.passwordAndLoginImput}>
            <input className={s.input} {...register("password")} placeholder='Password'
                   type={!show ? "password" : "text"}/>
            <div className={s.passwordBtn} onClick={onclickShowHandle}><img className={s.passwordImg}
                                                                            src={show ? eye : hidden} alt="eye"/></div>
          </div>
          <div className={s.error}>{errors.password?.message}</div>
        </div>
        <div className={s.buttonContainer}>
          <button className={s.button} type={'submit'} disabled={!isValid}>LoginVerify</button>
        </div>
      </form>
      <div className={s.footerContainer}>
        <span className={s.footerText}>Don't have an account?</span>
        <NavLink to={'/registration'} className={s.footerButton}>Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;





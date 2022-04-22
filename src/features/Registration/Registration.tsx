import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {path} from "../../routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import style from './Registration.module.css'
import eye from "../../asset/images/eye.png";
import hidden from "../../asset/images/hidden.png";
import {addUser} from "../../store/reducers/registration-reducer";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Preloader} from "../../components/Preloader/Preloader";


const Registration = () => {
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const dispatch: AppDispatch = useDispatch()
    let [isType, setIsType] = useState(true)
    const navigate = useNavigate()

    const toCheckEmail = () => {
        navigate(path.checkEmail)
    }

    const toLogin = () => {
        navigate(path.login)
    }

    const schema = yup.object({
        userName: yup.string().min(2).required(),
        email: yup.string().email().required(),
        password1: yup.string().min(8).required(),
        keyword: yup.string().min(4).required(),
        password2: yup.string().test('confirm password', 'Passwords is different!', function (value): any {
            return this.parent.password1 === value
        }).required(),
    }).required()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<StateForm> = (data) => {
        dispatch(addUser(data.userName, data.email, data.password1, data.password2, data.keyword))
    }

    const toggleTypeInput = () => {
        setIsType(isType = !isType)
    }

    useEffect(() => {
        if (status === "succeeded") {
            toCheckEmail()
        }
    }, [status])

    return (
            <div className={style.containerForm}>
                {status === "loading" && <Preloader/>}
                <div className={style.headerForm}>
                    <h2>Registration</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.inputForm}>
                        <input {...register('userName')}
                               type='text'
                               required
                               placeholder='User name*'

                        />
                        <div className={style.inputFormError}>{errors.userName?.message}</div>
                        <input {...register('email')}
                               type='text'
                               required
                               placeholder='Email*'

                        />
                        <div className={style.inputFormError}>{errors.email?.message}</div>
                        <input {...register('password1')}
                               type={isType ? "password" : "text"}
                               required
                               placeholder='Password*'

                        />
                        <img className={style.eyeOne} src={!isType ? eye : hidden} alt="eye" onClick={toggleTypeInput}/>
                        <div className={style.inputFormError}>{errors.password1?.message}</div>
                        <input {...register('password2')}
                               type={isType ? "password" : "text"}
                               required
                               placeholder='Confirm Password*'
                        />
                        <img className={style.eyeTwo} src={!isType ? eye : hidden} alt="eye" onClick={toggleTypeInput}/>
                        <div className={style.inputFormError}>{errors.password2?.message}</div>
                        <input {...register('keyword')}
                               type='text'
                               required
                               placeholder='Keyword*'

                        />
                        <div className={style.inputFormError}>{errors.keyword?.message}</div>
                    </div>
                    <div className={style.buttonForm}>
                        <button onClick={toLogin}>Cancel</button>
                        <button disabled={!isValid}>Register</button>
                    </div>
                </form>
            </div>
    );
};

type StateForm = {
    userName: string
    email: string
    password1: string
    password2: string
    keyword: string
}

export default Registration;

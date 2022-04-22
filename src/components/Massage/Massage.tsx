import style from './Massage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SvgSelector} from "../SvgSelector/SvgSelector";
import {useEffect} from "react";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {setMassage} from "../../store/reducers/app-reducer";

export const Massage = () => {

    const massage = useSelector<AppRootStateType>(state => state.app.massage)
    const dispatch: AppDispatch = useDispatch()

    const hideMessage = () => {
        dispatch(setMassage(null))
    }
    useEffect(()=> {
        if (massage) {
            setTimeout(()=> {
                dispatch(setMassage(null))
            }, 10000)}
    }, [massage])

    if (!massage) {
        return <></>
    }

    return (
        <div className={style.container}>
            <div className={style.xIcon} onClick={hideMessage}>
                <SvgSelector id={'XIcon'}/>
            </div>
            <span>{`System massage: ${massage}`}</span>
        </div>
    )
}
import React from 'react';
import s from "./Preloader.module.css";
import {SvgSelector} from "../SvgSelector/SvgSelector";

export const Preloader = () => {
    return (
        <div className={s.preloader}>
            <SvgSelector id={'ballLoader'} />
        </div>
    );
};
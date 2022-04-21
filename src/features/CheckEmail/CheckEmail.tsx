import React from 'react';
import s from "./CheckEmail.module.css";
import checkEmail from "./../../asset/images/checkEmail.png";

export const CheckEmail = () => {
  const checkEmailText = `We’ve sent an Email with instructions to your email`;

  return (
      <div className={s.checkEmail}>
        <span className={s.title}>Registration</span>
        <img className={s.checkEmail__img} src={checkEmail} alt="checkEmail"/>
        <span className={s.checkEmail__text}>Check Email</span>
        <span className={s.checkEmail__subtext}>{checkEmailText}</span>
      </div>
  );
};
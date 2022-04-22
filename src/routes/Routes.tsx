import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Logout from "../features/Logout/Logout";
import RegisterVerify from "../features/RegisterVerify/RegisterVerify";
import Login from "../features/Login/Login";
import Registration from "../features/Registration/Registration";
import ErrorPage from "../features/ErrorPage/ErrorPage";
import { CheckEmail } from '../features/CheckEmail/CheckEmail';
import LoginVerify from "../features/LoginVerify/LoginVerify";

export const path = {
  login: '/login',
  logout: '/logout',
  registration: '/registration',
  errorPage: '/404',
  checkEmail: '/check-email',
  registerVerify: '/register-verify',
  loginVerify: '/login-verify'
}

const RoutesComponent = () => {
  return (<>
      <Routes>
        <Route path={'/'} element={<Navigate to={path.login}/>}/>
        <Route path={path.login} element={<Login/>}/>
        <Route path={path.registration} element={<Registration/>}/>
        <Route path={path.logout} element={<Logout/>}/>
        <Route path={path.registerVerify} element={<RegisterVerify/>}/>
        <Route path={path.errorPage} element={<ErrorPage/>}/>
        <Route path={path.checkEmail} element={<CheckEmail/>}/>
        <Route path={path.loginVerify} element={<LoginVerify/>}/>
        <Route path={'/*'} element={<Navigate to={path.errorPage}/>}/>
      </Routes>
    </>
  );
};

export default RoutesComponent;
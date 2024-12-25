import { createAction } from '@reduxjs/toolkit';

export const signin = createAction('isLogIn/signin');
export const signotp = createAction('isLogIn/signotp');
export const signout = createAction('isLogIn/signout');
export const conformCode = createAction('isLogIn/conformCode');
export const newuser = createAction('isLogin/newuser');
export const clearallinit = createAction('isLogIn/clearallinit');  
export const haveOrder = createAction('isLogIn/haveOrder');

export const addGlobalData = createAction('checkout/addGlobalData');
export const addOrRemoveCoupons = createAction('checkout/addOrRemoveCoupons');
export const clearAllTheData = createAction('checkout/clearAllTheData');
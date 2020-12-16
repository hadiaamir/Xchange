import http from '../utils/http';
import environment from '../utils/environment';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const checkLogin = () => async (dispatch) => {
  try {
    const { data } = await http.get(`${environment.resolveApi().rest}/user/isLoggedIn`);

    if (data.isLoggedIn) {
      dispatch({
        type: SET_CURRENT_USER,
        payload: true,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/user/register`, userData);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Login - Get User Token
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/user/login`, userData);

    dispatch({
      type: SET_CURRENT_USER,
      payload: true,
    });

    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/user/logout`);

    dispatch({
      type: SET_CURRENT_USER,
      payload: false,
    });

    window.history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

import { AUTH, LOGOUT, SAGA_LOGIN, SAGA_REGISTER } from '../types/types';

export const sagaRegisterAC = (formData) => {
  return {
    type: SAGA_REGISTER,
    payload: formData,
  };
};

export const sagaLoginAC = (formData) => {
  return {
    type: SAGA_LOGIN,
    payload: formData,
  };
};

export const registerAC = (name = '') => {
  return {
    type: AUTH,
    payload: {
      name,
      isAuth: true,
    },
  };
};

export const logoutAC = (name = '') => {
  return {
    type: LOGOUT,
    payload: {
      name,
      isAuth: false,
    },
  };
};

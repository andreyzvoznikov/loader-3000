import {
  CLOSE_EDIT_MODAL,
  OPEN_EDIT_MODAL,
  CHANGE_EDIT_INPUT,
} from '../types/types';

export const openEditModalAC = (id, name) => {
  return {
    type: OPEN_EDIT_MODAL,
    payload: {
      id,
      name,
    },
  };
};

export const closeEditModalAC = () => {
  return {
    type: CLOSE_EDIT_MODAL,
    payload: {
      fileId: '',
      name: '',
      open: false,
    },
  };
};

export const changeInputEditAC = (e) => {
  return {
    type: CHANGE_EDIT_INPUT,
    payload: e,
  };
};

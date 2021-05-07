import { CLOSE_DELETE_MODAL, OPEN_DELETE_MODAL } from '../types/types';

export const openDeleteModalAC = (id) => {
  return {
    type: OPEN_DELETE_MODAL,
    payload: id,
  };
};

export const closeDeleteModalAC = () => {
  return {
    type: CLOSE_DELETE_MODAL,
    payload: {
      fileId: '',
      open: false,
    },
  };
};

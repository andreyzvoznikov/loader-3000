import { CLOSE_DELETE_MODAL, OPEN_DELETE_MODAL } from '../types/types';

const deleteModalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_DELETE_MODAL:
      return {
        fileId: action.payload,
        open: true,
      };
    case CLOSE_DELETE_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default deleteModalReducer;

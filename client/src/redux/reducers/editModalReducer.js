import {
  CLOSE_EDIT_MODAL,
  OPEN_EDIT_MODAL,
  CHANGE_EDIT_INPUT,
} from '../types/types';

const editModalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return {
        fileId: action.payload.id,
        name: action.payload.name,
        open: true,
      };
    case CLOSE_EDIT_MODAL:
      return action.payload;
    case CHANGE_EDIT_INPUT:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default editModalReducer;

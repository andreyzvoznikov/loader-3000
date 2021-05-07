const {
  ALL_FILES,
  ADD_FILE,
  DELETE_FILE,
  EDIT_FILE,
} = require('../types/types');

const fileReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_FILES:
      return action.payload;
    case ADD_FILE:
      return [...state, action.payload];
    case DELETE_FILE:
      return state.filter((file) => file._id !== action.payload);
    case EDIT_FILE:
      return state.map((file) => {
        if (file._id === action.payload.id) {
          return { ...file, name: action.payload.name };
        }
        return file;
      });
    default:
      return state;
  }
};

export default fileReducer;

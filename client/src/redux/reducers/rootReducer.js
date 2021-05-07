import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import deleteModalReducer from './deleteModalReducer';
import editModalReducer from './editModalReducer';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  deleteModal: deleteModalReducer,
  editModal: editModalReducer,
});

export default rootReducer;

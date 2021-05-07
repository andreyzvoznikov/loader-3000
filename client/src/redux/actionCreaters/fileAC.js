import { ADD_FILE, ALL_FILES, DELETE_FILE, EDIT_FILE } from '../types/types';

export const allFilesAC = (files) => {
  return {
    type: ALL_FILES,
    payload: files,
  };
};

export const addFileAC = (file) => {
  return {
    type: ADD_FILE,
    payload: file,
  };
};

export const deleteFileAC = (id) => {
  return {
    type: DELETE_FILE,
    payload: id,
  };
};

export const editFileAC = (id, name) => {
  return {
    type: EDIT_FILE,
    payload: {
      id,
      name,
    },
  };
};

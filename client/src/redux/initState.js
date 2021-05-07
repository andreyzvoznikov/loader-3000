const initState = {
  user: {
    name: '',
    isAuth: false,
  },
  files: [],
  deleteModal: {
    fileId: '',
    open: false,
  },
  editModal: {
    fileId: '',
    name: '',
    open: false,
  },
};

export default initState;

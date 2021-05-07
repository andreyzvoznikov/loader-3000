const { AUTH, LOGOUT } = require('../types/types');

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    case LOGOUT:
      return {
        name: '',
        isAuth: false,
      };

    default:
      return state;
  }
};

export default userReducer;

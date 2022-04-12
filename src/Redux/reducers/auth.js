import {
  LOGIN_SUCCESS,
  AUTH_POST_REFRESH
} from "../actions/types/types";

const initialState = {
  user: {
    username: "",
    name: "",
  },
  token: null,
  isAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case AUTH_POST_REFRESH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
      };
    default:
      return state;
  }
}

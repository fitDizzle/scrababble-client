import { UPDATE_THEME_SUCCESS } from "../actions/types/types";

const initialState = {
  theme: "light",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_THEME_SUCCESS:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}

import { logOut } from "../services/authService";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };

    case "LOGOUT":
      return logOut();

    case "THEME_CHANGE":
      return switchTheme(state);

    default:
      return state;
  }
};

function switchTheme(state) {
  const darkMode = !state.darkMode;
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  return { state, darkMode };
}

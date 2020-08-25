const getUser = () => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      role: user.role,
      jwt: user.jwt,
      name: user.name,
      isLoggedIn: true
    };
  } else {
    return { role: null, jwt: null, name: null, isLoggedIn: false };
  }
};

const commonState = {
  user: getUser(),
  isLoading: false
};

const commonReducer = (state = commonState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return {
        ...state,
        user: { role: null, jwt: null, name: null, isLoggedIn: false }
      };
    case "IS_LOADING":
      console.log("hitting state isloading");
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export { commonReducer };

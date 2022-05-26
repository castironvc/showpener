export const initialState = {
  userProfile: {
    session: {},
    mobilePhone: "",
    state: "",
  },
  loading: false,
  error: {},
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setRegion":
      return {
        ...state,
        userProfile: { ...state.userProfile, state: action.payload },
      };
    case "setPhone":
      return {
        ...state,
        userProfile: { ...state.userProfile, mobilePhone: action.payload },
      };
    case "setSession":
      return {
        ...state,
        userProfile: { ...state.userProfile, session: action.payload },
      };
    case "setLoader":
      return {
        ...state,
        loading: action.payload,
      };
    case "setError":
      return {
        ...state,
        error: { ...state.errors, message: action.payload },
      };

    default:
      return state;
  }
};

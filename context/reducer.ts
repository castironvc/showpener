export const initialState = {
  userProfile: {
    session: {},
    mobilePhone: "",
    state: "",
    adminName: "",
    adminEmail: "",
  },
  phoneAuth: {
    authCode: "",
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
    case "SET_ADMIN_NAME":
      return {
        ...state,
        userProfile: { ...state.userProfile, adminName: action.payload },
      };
    case "SET_ADMIN_EMAIL":
      return {
        ...state,
        userProfile: { ...state.userProfile, adminEmail: action.payload },
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
    case "setCode":
      return {
        ...state,
        phoneAuth: { ...state.phoneAuth, authCode: action.payload },
      };
    case "setError":
      return {
        ...state,
        error: { ...state.errors, message: action.payload },
      };
    case "resetState":
      return {
        state: {
          userProfile: {
            session: {},
            mobilePhone: "",
            state: "",
            tree: "",
          },
          phoneAuth: {
            authCode: "",
          },
          loading: false,
          error: {},
        },
        error: { ...state.errors, message: action.payload },
      };
    default:
      return state;
  }
};

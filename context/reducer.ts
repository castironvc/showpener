export const initialState = {
  userProfile: {
    session: {},
    mobilePhone: "",
    state: "",
  },
  admin: {
    adminBroadcastMessage: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminMessage: "",
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
        admin: { ...state.admin, adminName: action.payload },
      };
    case "SET_ADMIN_EMAIL":
      return {
        ...state,
        admin: { ...state.admin, adminEmail: action.payload },
      };
    case "SET_ADMIN_PHONE":
      return {
        ...state,
        admin: { ...state.admin, adminPhone: action.payload },
      };
    case "SET_ADMIN_MESSAGE":
      return {
        ...state,
        admin: { ...state.admin, adminMessage: action.payload },
      };
    case "SET_ADMIN_BROADCASTMESSAGE":
      return {
        ...state,
        admin: { ...state.admin, adminBroadcastMessage: action.payload },
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
        state: initialState,
        error: { ...state.errors, message: action.payload },
      };
    default:
      return state;
  }
};

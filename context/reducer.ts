export const initialState = {
  userProfile: {
    session: {},
    mobilePhone: "",
    state: "",
  },
  errors: {},
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
    default:
      return state;
  }
};

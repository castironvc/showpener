let states = require("../utils/states");
const getStateCode = (a: any) => {
  return Object.keys(states.states[a.selectedIndex])[0];
};

export default getStateCode;

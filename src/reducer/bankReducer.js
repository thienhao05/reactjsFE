const initialState = { money: 0 };
export default function bankReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case "deposit":
      newState = { money: state.money + action.payload };
      return newState;
    case "withdraw":
      newState = { money: state.money - action.payload };
      return newState;
    default:
      return state;
  }
}
//21:21

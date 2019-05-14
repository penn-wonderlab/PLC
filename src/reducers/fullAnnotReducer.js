export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_FULL_ANNOT":
      return action.payload;
    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_SEARCHED_ANNOTS":
      return action.payload;
    default:
      return state;
  }
};

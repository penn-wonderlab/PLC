export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PAGE_ANNOTS":
      return action.payload;
    default:
      return state;
  }
};

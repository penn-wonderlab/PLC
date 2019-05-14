export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ANNOTS":
      return action.payload;
    default:
      return state;
  }
  // if (action.type === 'FETCH_ANNOTS') {
  //     return action.payload;
  // }

  // return state;
};

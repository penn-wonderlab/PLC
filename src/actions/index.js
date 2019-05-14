import hypothesis from "../apis/hypothesis";

export const fetchAnnots = username => {
  return async function(dispatch, getState) {
    const response = await hypothesis.get("/search", {
      params: {
        user: "acct:" + username + "@hypothes.is",
        limit: 50
      }
    });

    dispatch({ type: "FETCH_ANNOTS", payload: response.data.rows });
  };
};

export const fetchSearchedAnnots = (tag, limit) => {
  return async function(dispatch) {
    const response = await hypothesis.get("/search", {
      params: {
        tag: tag,
        limit: limit
      }
    });

    dispatch({
      type: "FETCH_SEARCHED_ANNOTS",
      payload: response.data.rows
    });
  };
};

export const fetchFullAnnot = id => {
  // console.log("search id:", id);
  return async function(dispatch) {
    const response = await hypothesis.get("/annotations/" + id);
    dispatch({ type: "FETCH_FULL_ANNOT", payload: response.data });
  };
};

export const fetchPageAnnots = uri => {
  return async function(dispatch) {
    const response = await hypothesis.get("/search", {
      params: {
        uri: uri,
        limit: 50
      }
    });
    dispatch({ type: "FETCH_PAGE_ANNOTS", payload: response.data.rows });
  };
};

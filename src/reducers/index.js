import { combineReducers } from "redux";
import annotReducer from "./annotReducer";
import searchReducer from "./searchReducer";
import fullAnnotReducer from "./fullAnnotReducer";
import pageAnnotReducer from "./pageAnnotReducer";

export default combineReducers({
  annots: annotReducer,
  searchedAnnots: searchReducer,
  fullAnnot: fullAnnotReducer,
  pageAnnots: pageAnnotReducer
});

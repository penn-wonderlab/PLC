import axios from "axios";

export default axios.create({
  baseURL: "https://hypothes.is/api"
  // params: {
  //   limit: 50
  // }
});

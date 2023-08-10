import axios from "axios";
import { GET_PLATFORMS } from "./actionTypes";

export function getPlatforms() {
  return async function (dispatch) {
    try {
     
      const {data} = await axios("http://localhost:3001/platforms/");
dispatch({
  type: GET_PLATFORMS,
  payload: data
})
    } catch (error) {
      console.log(error)
    }
  };
}
import axios from "axios";
import { GET_GENRES } from "./actionTypes";

export function getGenres() {
  return async function (dispatch) {
    try {
     
      const {data} = await axios("http://localhost:3001/genres/");
dispatch({
  type: GET_GENRES,
  payload: data
})
    } catch (error) {
      console.log(error)
    }
  };
}

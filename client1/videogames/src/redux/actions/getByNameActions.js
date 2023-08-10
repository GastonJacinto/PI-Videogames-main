import axios from "axios";
import { GET_BY_NAME } from "./actionTypes";

export function getByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios(`http://localhost:3001/videogames/name?name=${name}`);
          dispatch({
        type: GET_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error)
    }
  };
}

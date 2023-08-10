import axios from "axios";
import { GET_DETAIL } from "./actionTypes";

export function getGameDetail({ id }) {
  return async function (dispatch) {
    try {
      const { data } = await axios(`http://localhost:3001/videogames/${id}`);
      dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      
    }
  };
}

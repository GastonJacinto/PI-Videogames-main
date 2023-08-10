import { ORDER } from "./actionTypes";

export function orderByName(orden) {
  return async function (dispatch) {
    try {
      dispatch({
        type: ORDER,
        payload: orden,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
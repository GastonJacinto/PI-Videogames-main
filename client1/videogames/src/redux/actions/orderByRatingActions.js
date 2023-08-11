import { ORDER_RATING} from "./actionTypes";

export function orderByRating(orden) {
  return async function (dispatch) {
    console.log(orden)
    try {
      dispatch({
        type: ORDER_RATING,
        payload: orden,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
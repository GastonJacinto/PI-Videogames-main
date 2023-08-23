import { PAGINATE } from './actionTypes';

export function nextOrPrev(direction){
  return async function (dispatch) {
    try {
    dispatch({
  type:PAGINATE,
  payload: direction
})
    } catch (error) {
      window.alert(error.response.data.error)
    }
  };
}
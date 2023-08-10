/* eslint-disable no-unused-vars */
import axios from "axios";

export function postGame(create) {

  return async function (dispatch) {
    try {

      const response = await axios.post(
        'http://localhost:3001/videogames/',
        create
      );

    } catch (error) {
      console.log(error);
    }
  };
}

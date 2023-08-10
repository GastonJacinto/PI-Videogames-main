/* eslint-disable no-unused-vars */
import {
  charged,
  FILTERED_BY_RATING,
  GET_ALL_GAMES,
  ORDER,
  GET_BY_NAME,
  POST_GAME,
  PAGINATE,
  GET_DETAIL,
  CLEAN_DETAIL,
  GET_GENRES,
  GET_PLATFORMS,
  CLEAN_FILTERED,
  FILTERED_BY_SOURCE,
  DELETE_DBGAME,
  CHARGE_HOME
} from "../actions/actionTypes";

let initialState = {
  allGames: [],
  allGamesBackUp: [],
  currentPage: 0,
  gameDetail: {},
  genres: [],
  platforms: [],
  filteredByName: [],
  backUp: [],
  
  // isLoading: true,  LOADING
};

function rootReducer(state = initialState, action) {
  const cardPerPage = 15;
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        backUp: action.payload,
        allGamesBackUp: action.payload,
        allGames: [...action.payload].splice(0, cardPerPage),
        charged:true,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      localStorage.setItem("plats", action.payload);
      return { ...state };
    case GET_BY_NAME:
      return { ...state, filteredByName: action.payload };
    case CLEAN_FILTERED:
      return {
        ...state,
        filteredByName: action.payload,
        allGamesBackUp: [...state.backUp],
        allGames: [...state.backUp].splice(0, cardPerPage),
        currentPage:0
      };
    case ORDER:
      let orderBy = [];
      if (action.payload === "asc") {
        orderBy = [...state.allGamesBackUp].sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        return {
          ...state,
          allGames: [...orderBy].splice(0, cardPerPage),
          allGamesBackUp: orderBy,
          currentPage: 0,
        };
      } else if (action.payload === "desc") {
        orderBy = [...state.allGamesBackUp].sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        return {
          ...state,
          allGames: [...orderBy].splice(0, cardPerPage),
          allGamesBackUp: orderBy,
          currentPage: 0,
        };
      } else if (action.payload === "-") {
        orderBy = [...state.allGamesBackUp].sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
          return 0;
        });
        return {
          ...state,
          allGames: [...orderBy].splice(0, cardPerPage),
          allGamesBackUp: orderBy,
          currentPage: 0,
        };
      } else if (action.payload === "+") {
        orderBy = [...state.allGamesBackUp].sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
        return {
          ...state,
          allGames: [...orderBy].splice(0, cardPerPage),
          allGamesBackUp: orderBy,
          currentPage: 0,
        };
      }

      break;
    case FILTERED_BY_SOURCE:
      let bySource = [];
      if (action.payload === "db") {
        bySource = [...state.allGamesBackUp].filter(
          (game) => game.onDB === true
        );
        return {
          ...state,
          allGames: [...bySource].splice(0, cardPerPage),
          allGamesBackUp: bySource,
          currentPage: 0,
        };
      } else if (action.payload === "api") {
        bySource = [...state.allGamesBackUp].filter(
          (game) => game.onDB!==true
        );
        return {
          ...state,
          allGames: [...bySource].splice(0, cardPerPage),
          allGamesBackUp: bySource,
          currentPage: 0,
        };
      }
      break;
    case PAGINATE:
      const nextPage = state.currentPage + 1;

      const prevPage = state.currentPage - 1;

      const index =
        action.payload === "next"
          ? nextPage * cardPerPage
          : prevPage * cardPerPage;

      if (action.payload === "next" && index >= state.allGamesBackUp.length) {
        return { ...state };
      } else if (action.payload === "prev" && prevPage < 0) {
        return { ...state };
      }
      return {
        ...state,
        allGames: [...state.allGamesBackUp].splice(index, cardPerPage),
        currentPage: action.payload === "next" ? nextPage : prevPage,
      };
    case GET_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case CLEAN_DETAIL:

      return {
        ...state,
        gameDetail: action.payload,
      };
    case DELETE_DBGAME:
      let filterDelete = state.allGamesBackUp.filter((games)=>games.id !== action.payload)
      return {
        ...state,
        allGamesBackUp: filterDelete,
        allGames: [...filterDelete].splice(0, cardPerPage),
      };
      default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

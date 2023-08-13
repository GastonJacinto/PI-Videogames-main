/* eslint-disable no-unused-vars */
import {
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
  NOT_FOUND,
  FILTERED_BY_GENRES,
  FILTERED_BY_PLATFORMS,
} from "../actions/actionTypes";

let initialState = {
  allGames: [],
  filteredGames: [],
  currentPage: 1,
  gameDetail: {},
  filteredByName: [],
  backUp: [],
  gameFound: "",
  // isLoading: true,  LOADING
  platforms: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  const cardPerPage = 15;
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        backUp: action.payload,
        filteredGames: action.payload,
        allGames: [...action.payload].splice(0, cardPerPage),
        currentPage: 1,
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
      return {
        ...state,
        allGames: [...action.payload].splice(0, cardPerPage),
        filteredGames: action.payload,
        currentPage: 1,
      };
    case CLEAN_FILTERED:
      const search = document.getElementById("search");
      search.value = "";

      const selects = document.getElementsByTagName("select");
      for (let i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
      }
      return {
        ...state,
        filteredGames: [...state.backUp],
        allGames: [...state.backUp].splice(0, cardPerPage),
        currentPage: 1,
      };
    case NOT_FOUND:
      return {
        ...state,

        gameFound: action.payload,
      };
    case ORDER:
      if (action.payload === "asc") {
        const ascOrder = [...state.filteredGames].sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        return {
          ...state,
          allGames: [...ascOrder].splice(0, cardPerPage),
          filteredGames: ascOrder,
          currentPage: 1,
        };
      } else if (action.payload === "desc") {
        const descOrder = [...state.filteredGames].sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        return {
          ...state,
          allGames: [...descOrder].splice(0, cardPerPage),
          filteredGames: descOrder,
          currentPage: 1,
        };
      } else if (action.payload === "-") {
        const lowRating = [...state.filteredGames].sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
          return 0;
        });
        return {
          ...state,
          allGames: [...lowRating].splice(0, cardPerPage),
          filteredGames: lowRating,
          currentPage: 1,
        };
      } else if (action.payload === "+") {
        const highRating = [...state.filteredGames].sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
        return {
          ...state,
          allGames: [...highRating].splice(0, cardPerPage),
          filteredGames: highRating,
          currentPage: 1,
        };
      }

      break;
    case FILTERED_BY_SOURCE:
      if (action.payload === "db") {
        const dbGames = [...state.backUp].filter((game) => game.onDB === true);
        return {
          ...state,
          allGames: [...dbGames].splice(0, cardPerPage),
          filteredGames: dbGames,
          currentPage: 1,
        };
      } else if (action.payload === "api") {
        const apiGames = [...state.backUp].filter((game) => game.onDB !== true);
        return {
          ...state,
          allGames: [...apiGames].splice(0, cardPerPage),
          filteredGames: apiGames,
          currentPage: 1,
        };
      }
      break;
    case FILTERED_BY_GENRES:
      let genreFilter = [];

      [...state.backUp].forEach((game) => {
        game.genres.forEach((gen) => {
          if (gen.name === action.payload) {
            genreFilter.push(game);
          }
        });
      });
      return {
        ...state,
        allGames: [...genreFilter].splice(0, cardPerPage),
        filteredGames: genreFilter,
        currentPage: 1,
      };
      
    case FILTERED_BY_PLATFORMS:
      
      let platformFilter = [...state.backUp].filter((game) =>
        game.platforms.includes(action.payload)
      );

      return {
        ...state,
        allGames: [...platformFilter].splice(0, cardPerPage),
        filteredGames: platformFilter,
        currentPage: 1,
      };
    case PAGINATE:
      const nextPage = state.currentPage + 1;

      const prevPage = state.currentPage - 1;

      const index =
        action.payload === "next"
          ? nextPage * cardPerPage
          : prevPage * cardPerPage;

      if (action.payload === "next" && index >= state.filteredGames.length) {
        return { ...state };
      } else if (action.payload === "prev" && prevPage < 0) {
        return { ...state };
      }
      return {
        ...state,
        allGames: [...state.filteredGames].splice(index, cardPerPage),
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
      let filterDelete = state.filteredGames.filter(
        (games) => games.id !== action.payload
      );
      return {
        ...state,
        backUp: filterDelete,
        filteredGames: filterDelete,
        allGames: [...filterDelete].splice(0, cardPerPage),
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

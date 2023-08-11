const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame } = require("../db");
const { Op } = require("sequelize");

async function getVideogameByNameController(gameName) {
  let games = [];

  let page = 1;
  const filteredByNameDB = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${gameName}%` },
    },
  });
  while (page < 4) {
    const { data } = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`
    );

    data.results.forEach((game) => {
      const insertPlatforms = game.platforms.map((platf) => {
        return (name = platf.platform.name);
      });

      const insertGenres = game.genres.map((gen) => {
        return (
          {
            id:gen.id,
            name: gen.name
          }
        );
      });

      const newGame = {
        name: game.name,
        id: game.id,
        genres: insertGenres,
        description: game.description,
        platforms: insertPlatforms,
        imagen: game.background_image,
        released: game.released,
        rating: game.rating,
      };
      games.push(newGame);
    });
    page += 1;
  }
  let filteredByName = [];

  if (games.length) {
    filteredByName = games.filter((game) => {
      return game.name.toLowerCase().includes(gameName.toLowerCase());
    });
  }

  const filteredGames = filteredByNameDB.concat(filteredByName);
  if (filteredGames.length) {
    return filteredGames.slice(0, 15);
  } else {
    throw new Error("There are no games with that name");
  }
}

module.exports = getVideogameByNameController;

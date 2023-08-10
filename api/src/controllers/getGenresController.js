const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genres } = require("../db");

async function getGenresController() {

const findGenders = await Genres.findAll();

  if (!findGenders.length) {
    
    let addingGenres = [];
    const { data } = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    data.results.forEach((genre) => {
      const gen = {
        name: genre.name,
        id: genre.id,
      };
      addingGenres.push(gen);
    });
    const allGenres = await Genres.bulkCreate(addingGenres);

    return allGenres;
  }

return findGenders
}

module.exports = getGenresController;

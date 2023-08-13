const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame,Genres } = require("../db");

const platforms = new Set()

let plats = [];
let allPlatforms=[];

async function getVideogamesController() {
  const dbGames = await Videogame.findAll({
    include:[
      {
        model: Genres,
        attributes:["name"],
        through:{attributes:[]}
      }
    ]
    
  });

  let games = [];
  let page = 1;

  while (page < 4) {
    const { data } = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&page=${page}`
    );
    let insertPlatforms =[]
    data.results.forEach((game) => {

      insertPlatforms = game.platforms.map((platf) => {
        return (name = platf.platform.name);
      });

      plats.push(insertPlatforms)

      const insertGenres = game.genres.map((gen) => {
        return {name:gen.name}
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
  
plats.forEach((p)=>{
  p.forEach((pl)=>{
    platforms.add(pl)
  })
})
 allPlatforms = [...platforms]

  const allGames = dbGames.concat(games);
  return allGames;
}

module.exports = { getVideogamesController,allPlatforms};

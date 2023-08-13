const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame,Genres } = require("../db");

async function getVideogameByIdController(id) {

if(id.includes("-")){
  const foundVideogame = await Videogame.findOne({
    where: { id: id },
    include:[
      {
        model: Genres,
        attributes:["name"],
        through:{attributes:[]}
      }
    ]
    
  });
  if (foundVideogame) {
    return foundVideogame;
  }
}


  const { data } = await axios(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  const insertPlatforms = data.platforms.map((platf)=>{
    return (
      name=platf.platform.name
    )
  })
  
  const insertGenres = data.genres.map((gen)=>{
    return (
      id=gen.id,
      name=gen.name
   )
  })
 
  if (data.name) {
  const idGame = {
    name: data.name,
    id: data.id,
    genres: insertGenres,
    description: data.description,
    platforms:insertPlatforms,
    imagen: data.background_image,
    released: data.released,
    rating: data.rating,
  };

  return idGame;
  } 
 
}

module.exports = getVideogameByIdController;

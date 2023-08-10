const { Videogame } = require("../db");
const { Genres } = require("../db");

async function postVideogameController(
  name,
  description,
  platforms,
  imagen,
  rating,
  genres,
  released
) {

  if (!name || !description || !platforms || !imagen || !rating || !genres || !released
    ) {
    throw new Error("Missing data.");
  }

  const findingGame = await Videogame.findOne({ where: { name: name } });

  if (findingGame) {
    throw new Error("This game already exists. Try again using another name.");
  }

  for (let i = 0; i < genres.length; i++) {
    const genre = await Genres.findOne({
      where: {
        name: genres[i],
      },
    });

    if (!genre) {
      throw new Error("You have entered a genre that does not exists.");
    }
  }
  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    imagen,
    rating,
    released,
    genres,
  });

 
  for (let i = 0; i < genres.length; i++) {
    const genre = await Genres.findOne({
      where: {
        name: genres[i],
      },
    });
      await newGame.addGenres(genre.id);
    
  }

  const returnCreatedGame = await Videogame.findOne({
    where: { id: newGame.id },
    include:[
      {
        model: Genres,
        attributes:["name"],
        through:{attributes:[]}
      }
    ]
    
  });

  return returnCreatedGame;
}

module.exports = postVideogameController;


const { Genres,Videogame } = require("../db");

async function deleteGameController(id) {

const deleteGame = await Videogame.destroy({
  where:{
    id
  }
});
return "Your game was succesfully deleted."
}

module.exports = deleteGameController;

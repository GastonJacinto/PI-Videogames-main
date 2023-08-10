const {getVideogamesController} = require("../controllers/getVideogamesController")

async function getVideogamesHandler(req,res){
try {
  const response = await getVideogamesController();
  return res.status(200).json(response)
} catch (error) {
  return res.status(400).json({error:error.message})
}

}

module.exports = getVideogamesHandler;
const getVideogameByNameController = require("../controllers/getVideogameByNameController")

async function getVideogameByNameHandler(req,res){
  
  try {
    const {name} = req.query
    const response = await getVideogameByNameController(name)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

module.exports = getVideogameByNameHandler
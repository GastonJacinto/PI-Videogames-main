const getVideogameByIdController = require("../controllers/getVideogameByIdController")

async function getVideogameByIdHandler(req,res){

  try {
    const {id} = req.params
   const response =  await getVideogameByIdController(id)
    return res.status(200).json(response)
    
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

module.exports = getVideogameByIdHandler
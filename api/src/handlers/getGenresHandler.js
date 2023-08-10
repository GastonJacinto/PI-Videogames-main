const getGenresController = require("../controllers/getGenresController")

async function getGenresHandler(req,res){
try {
  const response =await getGenresController()
  return res.status(200).json(response)

} catch (error) {
  return res.status(400).json({error:error.message})
}
}

module.exports= getGenresHandler
const getPlatformsController = require("../controllers/getPlatformsController")

async function getPlatformsHandler(req,res){
try {
  const response = await getPlatformsController()
  return res.status(200).json(response)

} catch (error) {
  return res.status(400).json({error:error.message})
}
}

module.exports= getPlatformsHandler
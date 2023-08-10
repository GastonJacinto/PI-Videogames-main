const deleteGameController = require("../controllers/deleteGameController")

async function deleteGameHandler(req,res){
try {
  const {id} = req.params
  const response = await deleteGameController(id)
  return res.status(200).json(response)

} catch (error) {
  return res.status(400).json({error:error.message})
}
}

module.exports= deleteGameHandler
const postVideogameController = require("../controllers/postVideogameController");

async function postVideogameHandler(req, res) {
  const { name, released,description,platforms, imagen, rating,genres } = req.body;
  try {
    const response = await postVideogameController(
      name,
      description,
      platforms,
      imagen,
      rating,
      genres,
      released
    );
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

module.exports = postVideogameHandler;

const { Router } = require('express');
const router = Router();

const postVideogameHandler = require("../handlers/postVideogameHandler")

router.post("/videogames",postVideogameHandler)


module.exports = router;
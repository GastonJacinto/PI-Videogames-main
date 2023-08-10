const { Router } = require('express');
const getVideogameByNameHandler = require("../handlers/getVideogameByNameHandler.js")
const router = Router();

router.get("/videogames/name?",getVideogameByNameHandler)

module.exports = router;
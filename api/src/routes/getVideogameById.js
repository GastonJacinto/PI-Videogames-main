const { Router } = require('express');
const getVideogameByIdHandler = require("../handlers/getVideogameByIdHandler")
const router = Router();

router.get("/videogames/:id",getVideogameByIdHandler)

module.exports = router;
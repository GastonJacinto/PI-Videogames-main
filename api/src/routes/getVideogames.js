const { Router } = require('express');
const router = Router();

const getVideogamesHandler = require("../handlers/getVideogamesHandler")

router.get(`/videogames`,getVideogamesHandler)

module.exports = router;


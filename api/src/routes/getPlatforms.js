const { Router } = require('express');
const getPlatformsHandler = require("../handlers/getPlatformsHandler")
const router = Router();

router.get("/platforms", getPlatformsHandler)

module.exports= router;
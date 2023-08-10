const deleteGameHandler = require("../handlers/deleteGameHandler")
const { Router } = require('express');
const router = Router();

router.get("/delete/:id", deleteGameHandler)

module.exports= router;

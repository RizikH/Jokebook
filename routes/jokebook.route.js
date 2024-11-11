"use strict";
const express = require("express");
const router = express.Router();

const jokebookController = require("../controllers/jokebook.controller");

//http://localhost:3000/jokebook/all
router.get("/all", jokebookController.getAllCategories);

//http://localhost:3000/jokebook?attribute=name&value=funnyJoke
router.get("/", jokebookController.getAllByOneAttribute);

//http://localhost:3000/random
router.get("/random", jokebookController.getRandom);

// //http://localhost:3000/jokes/new
// router.post("/new", jokesController.createNew);

module.exports = router;
const express = require("express");
const router = express.Router();
const solutionsController = require("../controllers/solutions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createSolution/:id", solutionsController.createSolution);

module.exports = router;

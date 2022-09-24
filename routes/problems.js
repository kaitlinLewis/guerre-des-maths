const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const problemsController = require("../controllers/problems");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, problemsController.getProblem);

router.post(
  "/createProblem",
  upload.single("file"),
  problemsController.createProblem
);

router.put("/likeProblem/:id", problemsController.likeProblem);

router.delete("/deleteProblem/:id", problemsController.deleteProblem);

module.exports = router;

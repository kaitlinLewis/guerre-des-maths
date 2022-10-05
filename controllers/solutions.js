const Solution = require("../models/Solution");

module.exports = {
  createSolution: async (req, res) => {
    try {
      await Solution.create({
        solution: req.body.solution,
        referencedProblem: req.params.id,
        author: req.user.id,
      });
      console.log("Solution has been added");
      res.redirect("/problem/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};

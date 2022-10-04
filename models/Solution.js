const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
  solution: {
    type: String,
    required: true,
  },
  referencedProblem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Solution", SolutionSchema);

const cloudinary = require("../middleware/cloudinary");
const Problem = require("../models/Problem");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const problems = await Problem.find({ user: req.user.id });
      res.render("profile.ejs", { problems: problems, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const problems = await Problem.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { problems: problems });
    } catch (err) {
      console.log(err);
    }
  },
  getProblem: async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);
      res.render("post.ejs", { problem: problem, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createProblem: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Problem.create({
        title: req.body.title,
        image: res.secure_url,
        cloudinaryId: res.public_id,
        problem: req.body.problem,
        likes: 0,
        user: req.user.id,
      });
      console.log("Problem has been added");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeProblem: async (req, res) => {
    try {
      await Problem.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 } }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProblem: async (req, res) => {
    try {
      //Find problem by id
      let problem = await problem.findById({ _id: req.params.id });
      //Delete from cloudinary
      await cloudinary.uploader.destroy(problem.cloudinaryId);
      //Delete problem from db
      await Problem.remove({ _id: req.params.id });
      console.log("Deleted problem");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

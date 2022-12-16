const Comment = require("../models/Comment");
const router = require("express").Router();
const auth = require("../middleware/auth");

//create a new comment
router.post("/:videoId", auth, async (req, res, next) => {
  try {
    // create new comments
    const newComment = await Comment(req.body);
    newComment.user = req.user._id;
    const comment = await newComment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//delete a comment
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//
router.post("/delete", async (req, res) => {
  try {
    await Comment.deleteMany({ _id: req.body });
    res.status(200).json("Utilisateur(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a comment
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments
router.get("/list/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId: postId })
      .sort({ _id: -1 })
      .populate({
        path: "user",
        select: "_id firstName lastName profilePicture",
      });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

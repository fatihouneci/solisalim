const Post = require("../models/Post");
const Video = require("../models/Video");
const router = require("express").Router();

// get recents post
router.get("/recents", async (req, res, next) => {
  try {
    const posts = await Post.find().sort("-createdAt").limit(20);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get popular post
router.get("/popular", async (req, res, next) => {
  try {
    const posts = await Post.find({ views: { $gt: 5 } }).limit(20);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get exclusifs post
router.get("/exclusif", async (req, res, next) => {
  try {
    const posts = await Post.find({ isExclusif: true }).limit(20);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get recents post
router.get("/music/recents", async (req, res, next) => {
  try {
    const posts = await Post.find().sort("-createdAt").limit(20);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get recents post
router.get("/video/recents", async (req, res, next) => {
  try {
    const videos = await Video.find().sort("-createdAt").limit(20);
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

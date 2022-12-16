const Video = require("../models/Video");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const paginate = require("jw-paginate");

//get all videos pagination
router.get("/", async (req, res, next) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    let keyword = req.query.keyword
      ? {
          title: { $regex: req.query.keyword, $options: "i" },
        }
      : {};
    if (req.query.tags) {
      keyword = { tags: { $in: req.query.tags } };
    }
    const count = await Video.countDocuments({ ...keyword });
    const videos = await Video.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ videos, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create a new video
router.post("/create", auth, async (req, res, next) => {
  try {
    // create new videos
    const newVideo = await Video(req.body);
    newVideo.userId = req.user._id;
    const video = await newVideo.save();
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
});

//update video
router.put("/:id", async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const video = await Video.findByIdAndUpdate(req.params.id, data);
    res.status(200).json(video);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete a video
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//
router.post("/delete", async (req, res) => {
  try {
    await Video.deleteMany({ _id: req.body });
    res.status(200).json("Utilisateur(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

// like video
router.post("/like/:videoId", auth, async (req, res, next) => {
  const userId = req.user._id;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
    });
    res.status(200).send(video);
  } catch (err) {
    next(err);
  }
});

// get video by tags
router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(10);
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// search video
router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    console.log(videos);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

//get a video
router.get("/:slug", async (req, res) => {
  try {
    const video = await Video.findOne({ slug: req.params.slug });
    await Video.findByIdAndUpdate(video._id, {
      $inc: {
        views: 1,
      },
    });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get video by tags
router.get("/related-videos/:videoId", async (req, res, next) => {
  const video = await Video.findById(req.params.videoId);
  try {
    const videos = await Post.find({
      tags: { $in: [...video.tags] },
      _id: { $ne: video._id },
    })
      .limit(10)
      .sort({ createdAt: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

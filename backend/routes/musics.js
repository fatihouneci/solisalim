const Music = require("../models/Music");
const Category = require("../models/Category");
const router = require("express").Router();
const auth = require("../middleware/auth");
const paginate = require("jw-paginate");

//get all musics pagination
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
    const count = await Music.countDocuments({ ...keyword });
    const musics = await Music.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    console.log(musics);
    res.json({ musics, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next(err);
  }
});

//create a new music
router.post("/create", auth, async (req, res) => {
  try {
    // create new musics
    const newMusic = new Music(req.body);
    newMusic.userId = req.user._id;
    const music = await newMusic.save();
    res.status(200).json(music);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update music
router.put("/:id", async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(music);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    await Music.deleteMany({ _id: req.body });
    res.status(200).json("Articles(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

// like music
router.post("/like/:musicId", auth, async (req, res, next) => {
  const userId = req.user._id;
  const musicId = req.params.musicId;
  try {
    const music = await Music.findByIdAndUpdate(musicId, {
      $addToSet: { likes: userId },
    });
    res.status(200).send(music);
  } catch (err) {
    next(err);
  }
});

// get music by tags
router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const musics = await Music.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(musics);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// search music
router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  try {
    const musics = await Music.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(musics);
  } catch (err) {
    next(err);
  }
});

//get a music
router.get("/:id", async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, {
      $inc: {
        views: 1,
      },
    });
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

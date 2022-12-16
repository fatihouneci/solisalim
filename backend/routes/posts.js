const Post = require("../models/Post");
const Category = require("../models/Category");
const router = require("express").Router();
const auth = require("../middleware/auth");
const paginate = require("jw-paginate");

//get all posts pagination
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
    const count = await Post.countDocuments({ ...keyword });
    const posts = await Post.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.json({ posts, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next(err);
  }
});

//create a new post
router.post("/create", auth, async (req, res) => {
  try {
    // create new posts
    console.log(req.body);
    const newPost = new Post(req.body);
    newPost.author = req.user._id;
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    await Post.deleteMany({ _id: req.body });
    res.status(200).json("Articles(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by tags
router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const posts = await Post.find({ tags: { $in: tags[0] } })
      .limit(10)
      .sort({ _id: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// search post
router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  try {
    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    })
      .limit(40)
      .sort({ _id: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

//get a post
router.get("/slug/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("comments.postedBy", "_id profilePicture firstName lastName")
      .populate("author", "_id profilePicture firstName lastName");
    await Post.findByIdAndUpdate(post._id, {
      $inc: {
        views: 1,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/byid/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get related post by tags
router.get("/related-posts/:slug", async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  try {
    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .limit(5)
      .sort({ createdAt: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// like post
router.post("/like/:postId", auth, async (req, res, next) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  try {
    const response = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    );

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

router.put("/comment/:postId", auth, async (req, res) => {
  let comment = req.body;
  comment.postedBy = req.user._id;
  console.log(comment);
  try {
    let result = await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id profilePicture firstName lastName")
      .populate("author", "_id profilePicture firstName LastName")
      .exec();
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
});

router.put("/uncomment/:postId", auth, async (req, res) => {
  let { comment } = req.body;
  console.log(comment._id);
  try {
    let result = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id profilePicture firstName lastName")
      .populate("author", "_id profilePicture firstName LastName")
      .exec();
    // console.log(result);
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

//get a post
router.get("/user", auth, async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;

    console.log(req.query);

    let keyword = req.query.keyword
      ? {
          title: { $regex: req.query.keyword, $options: "i" },
        }
      : {};
    if (req.query.tags) {
      keyword = { tags: { $in: req.query.tags } };
    }
    const userId = req.user._id;
    keyword.author = userId;

    console.log(keyword);
    const count = await Post.countDocuments({ ...keyword });
    const posts = await Post.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
      .select("_id coverPicture title description views likes slug createdAt");
    res.json({ posts, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

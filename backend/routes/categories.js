const Category = require("../models/Category");
const Post = require("../models/Post");
const router = require("express").Router();

//create a new category
router.post("/create", async (req, res) => {
  try {
    // create new categorys
    const newCategory = await Category(req.body);
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a category
router.get("/:id", async (req, res) => {
  try {
    console.log("Category has been");
    const category = await Category.findById(req.params.id);
    const othersCategories = await Category.find({
      _id: { $ne: req.params.id },
    });
    const posts = await Post.find({ categories: { $in: [req.params.id] } });
    console.log(othersCategories);
    res.status(200).json({ category, othersCategories, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all categorys
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isVisible: true });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

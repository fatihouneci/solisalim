const Tag = require("../models/Tag");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const paginate = require("jw-paginate");
const auth = require("../middleware/auth");

//get all tags pagination
router.get("/list", async (req, res) => {
  try {
    const tags = await Tag.find();

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pager = paginate(tags.length, page);

    // get page of items from items array
    const pageOfItems = tags.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create a new tag
router.post("/create", async (req, res) => {
  try {
    // create new tags
    const newTag = await Tag(req.body);
    const tag = await newTag.save();
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update tag
router.put("/:id", async (req, res) => {
  try {
    let data = req.body;
    const tag = await Tag.findByIdAndUpdate(req.params.id, data);
    res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete a tag
router.delete("/:id", async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json("Tag has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//
router.post("/delete", async (req, res) => {
  try {
    await Tag.deleteMany({ _id: req.body });
    res.status(200).json("Tag(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a tag
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all tags
router.get("/type/:type", async (req, res) => {
  try {
    const tags = await Tag.find({ type: req.params.type });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

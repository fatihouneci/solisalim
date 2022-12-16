const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

//get all users pagination
router.get("/paginate", auth, async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;

    let keyword = req.query.keyword
      ? {
          firstName: { $regex: req.query.keyword, $options: "i" },
        }
      : {};
    if (req.query.tags) {
      keyword = { tags: { $in: req.query.tags } };
    }

    const count = await User.countDocuments({ ...keyword });
    const users = await User.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
      .select(
        "_id profilePicture fullName firstName lastName code telephone email isAdmin createdAt"
      );
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new user
router.post("/create", async (req, res) => {
  try {
    // create new users
    const newUser = await User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user
router.put("/update/:id", async (req, res) => {
  try {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    const user = await User.findByIdAndUpdate(req.params.id, data);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//
router.post("/delete", async (req, res) => {
  try {
    await User.deleteMany({ _id: req.body });
    res.status(200).json("Utilisateur(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a user
router.get("/byid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

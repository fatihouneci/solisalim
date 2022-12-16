const Book = require("../models/Book");
const Category = require("../models/Category");
const router = require("express").Router();
const auth = require("../middleware/auth");
const paginate = require("jw-paginate");

//get all books pagination
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
    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    console.log(books);
    res.json({ books, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next(err);
  }
});

//create a new book
router.post("/create", auth, async (req, res) => {
  try {
    // create new books
    const newBook = new Book(req.body);
    newBook.userId = req.user._id;
    const book = await newBook.save();
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(book);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    await Book.deleteMany({ _id: req.body });
    res.status(200).json("Articles(s) supprimé(s)");
  } catch (err) {
    res.status(500).json(err);
  }
});

// like book
router.post("/like/:bookId", auth, async (req, res, next) => {
  const userId = req.user._id;
  const bookId = req.params.bookId;
  try {
    const book = await Book.findByIdAndUpdate(bookId, {
      $addToSet: { likes: userId },
    });
    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
});

// get book by tags
router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const books = await Book.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// search book
router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  try {
    const books = await Book.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

//get a book
router.get("/:slug", async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    await Book.findByIdAndUpdate(book._id, {
      $inc: {
        views: 1,
      },
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

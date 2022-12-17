const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String },
    description: {
      type: String,
      trim: true,
    },
    coverPicture: {
      type: String,
      default: "",
      required: true,
    },
    fileUrl: {
      type: String,
      default: "",
    },
    audioUri: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

bookSchema.methods.toJSON = function () {
  const book = this;
  const bookObject = book.toObject();

  delete bookObject.__v;

  return bookObject;
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    coverPicture: {
      type: String,
    },
    audioUri: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    media: {
      type: String,
      enum: {
        values: ["text", "audio", "video", "book"],
      },
      required: true,
      default: "text",
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["private", "public"],
      },
      default: "private",
    },
    isExclusif: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();

  delete postObject.__v;

  return postObject;
};

postSchema.pre("save", async function (next) {
  const post = this;

  next();
});

postSchema.pre("remove", async function (next) {
  const post = this;

  // Remove Object attach to the post
  //await Task.deleteMany({ owner: post._id });

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

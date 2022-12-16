const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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
    videoUrl: {
      type: String,
      default: "",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: ["islam"],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

videoSchema.methods.toJSON = function () {
  const video = this;
  const videoObject = video.toObject();

  delete videoObject.__v;

  return videoObject;
};

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;

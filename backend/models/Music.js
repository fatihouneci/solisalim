const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    musicUrl: {
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
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

musicSchema.methods.toJSON = function () {
  const music = this;
  const musicObject = music.toObject();

  delete musicObject.__v;

  return musicObject;
};

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

tagSchema.methods.toJSON = function () {
  const tag = this;
  const tagObject = tag.toObject();

  delete tagObject.createdAt;
  delete tagObject.updatedAt;
  delete tagObject.__v;

  return tagObject;
};

tagSchema.pre("save", async function (next) {
  const tag = this;

  next();
});

tagSchema.pre("remove", async function (next) {
  const tag = this;

  // Remove Object attach to the tag
  //await Task.deleteMany({ owner: tag._id });

  next();
});

const Category = mongoose.model("Tag", tagSchema);

module.exports = Category;

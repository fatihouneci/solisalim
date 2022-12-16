const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const Utility = require("./helpers/utility");

const { notFound, errorHandler } = require("./middleware/errors.js");
//Load public routes
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const videosRoutes = require("./routes/videos");
const musicsRoutes = require("./routes/musics");
const booksRoutes = require("./routes/books");
const commentsRoutes = require("./routes/comments");
const categoriesRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");
const tagsRoutes = require("./routes/tags");

//app configuration
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "uploads")));

//use middleware
app.use(express.json({ limit: "1000mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Public api
app.use("/api/dash", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/musics", musicsRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/upload", uploadRoutes);

// Errors handlers
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Express server started ${process.env.PORT}`);
});

const Post = require("./models/Post");
const Video = require("./models/Video");
const Category = require("./models/Category");
const Book = require("./models/Book");

const getPosts = async () => {
  const posts = await Post.find().populate("categories");
  posts.forEach(async (post) => {
    const categories = post.categories;
    post.tags = [];
    for (let index = 0; index < categories.length; index++) {
      post.tags.push(categories[index].name);
    }
    await post.save();
    console.log("####");
    console.log(post);
  });
};

const slugPosts = async () => {
  const posts = await Post.find();
  posts.forEach(async (post) => {
    post.slug = Utility.convertToSlug(post.title);
    await post.save();
  });
};

getPosts();
slugPosts();

const slugVideos = async () => {
  const videos = await Video.find();
  videos.forEach(async (video) => {
    video.slug = Utility.convertToSlug(video.title);
    await video.save();
  });
};

slugVideos();

const slugBooks = async () => {
  const books = await Book.find();
  books.forEach(async (book) => {
    book.slug = Utility.convertToSlug(book.title);
    await book.save();
  });
};

slugBooks();

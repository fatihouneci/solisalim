const router = require("express").Router();
const multerConfig = require("../middleware/multer-config");
const dotenv = require("dotenv");
dotenv.config();

router.post("/upload-img", multerConfig.uploadImage, (req, res) => {
  try {
    let filePath = "";
    if (req.file.filename) {
      filePath = `${process.env.HOST}/${process.env.IMAGE_PATH}/${req.file.filename}`;
    }
    console.log(filePath);
    return res.status(200).json(filePath);
  } catch (error) {
    console.error(error);
  }
});

router.post("/upload-audio", multerConfig.uploadAudio, (req, res) => {
  try {
    let filePath = "";
    if (req.file.filename) {
      filePath = `${process.env.HOST}/${process.env.AUDIO_PATH}/${req.file.filename}`;
    }
    return res.status(200).json(filePath);
  } catch (error) {
    console.log(error);
    console.error(error);
  }
});

router.post("/upload-file", multerConfig.uploadOther, (req, res) => {
  try {
    let filePath = "";
    if (req.file.filename) {
      filePath = `${process.env.HOST}/${process.env.FILE_PATH}/${req.file.filename}`;
    }
    return res.status(200).json(filePath);
  } catch (error) {
    console.log(error);
    console.error(error);
  }
});

module.exports = router;

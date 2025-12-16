const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/profile_pics");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const avatarFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only image files are allowed"), false);
  }
};

const fileUpload = multer({
  storage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
});

module.exports = { fileUpload } ;

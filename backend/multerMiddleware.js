const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === 'profile_pic')
      return cb(null, "./uploads/profile_pics");
    else if (file.fieldname === 'resume')
      return cb(null, "./uploads/resumes_pdf");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if(file.fieldname === 'profile_pic'){
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("only image files are allowed"), false);
    }
  } else if (file.fieldname === 'resume'){
    if (file.mimetype === "application/pdf" || file.mimetype === "application/msword") {
      cb(null, true);
    } else {
      cb(new Error("only PDF/DOC/DOCX files are allowed"), false);
    }
  } else {
    cb(new Error("Invalid field name"), false);
  }
};

const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
});

module.exports = { fileUpload } ;

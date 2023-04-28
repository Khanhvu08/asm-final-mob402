const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // set the destination folder for the uploaded file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // set the filename for the uploaded file
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
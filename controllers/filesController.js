const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadFile = (req, res, next) => {
  console.log(req.file, req.body);
  next();
};

module.exports = {
  uploadFile,
};

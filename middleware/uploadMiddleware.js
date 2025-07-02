const multer = require("multer");
let upload = multer({ dest: "./uploads" });

const uploadMiddleware = upload.fields([
  { name: "uploaded_file", maxCount: 1 },
]);

module.exports = uploadMiddleware;

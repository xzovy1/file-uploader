const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user = req.url.split("/")[1];
    cb(null, `./uploads/${user}`);
  },
  filename: (req, file, cb) => {
    const { filename } = req.body;
    cb(null, filename || file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
  { name: "uploaded_file", maxCount: 1 },
]);

module.exports = uploadMiddleware;

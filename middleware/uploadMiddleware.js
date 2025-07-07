const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user = req.user;

    const { folder } = req.params;
    if (folder) {
      cb(null, `./uploads/${user.id}/${folder}`);
    } else {
      cb(null, `./uploads/${user.id}/`);
    }
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

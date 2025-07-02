const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const { folder } = require("../prisma/client");

const uploadFile = (req, res, next) => {
  console.log(req.file, req.body);
  next();
};

const createFolder = async (req, res) => {
  const { foldername } = req.body;
  const { id } = res.locals.user;

  const projectFolder = join("./uploads", id.toString(), foldername);
  const dirCreation = await mkdir(projectFolder, { recursive: true });
  res.redirect(`/user/${id}`);
};

module.exports = {
  uploadFile,
  createFolder,
};

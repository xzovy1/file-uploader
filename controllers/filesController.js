const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const prisma = require("../prisma/client");

const uploadFile = (req, res, next) => {
  const { id } = res.locals.user;

  console.log(req.files["uploaded_file"][0].filename, req.body.filename);
  res.redirect(`/user/${id}`);
};

const createFolder = async (req, res) => {
  const { foldername } = req.body;
  const { id } = res.locals.user;

  const projectFolder = join("./uploads", id.toString(), foldername);
  const addFolder = await prisma.folder.create({
    data: {
      name: foldername,
      authorId: parseInt(id),
    },
  });
  const dirCreation = await mkdir(projectFolder, { recursive: true });
  res.redirect(`/user/${id}`);
};

module.exports = {
  uploadFile,
  createFolder,
};

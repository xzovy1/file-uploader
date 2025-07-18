const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const prisma = require("../prisma/client");

const uploadFile = async (req, res, next) => {
  console.log(req.body);
  const { id } = req.app.locals.user;
  const prismaFile = await prisma.file.create({
    data: {
      name: req.body.filename,
      author: { connect: { id: id } },
    },
  });
  res.redirect(`/`);
};

const getFile = async (req, res) => {
  const { filename } = req.params;
  const { id } = req.app.locals.user;
  const prismaFile = await prisma.file.findUnique({
    where: {
      name: filename,
      authorId: id,
    },
    include: {
      author: true,
      folder: true,
    },
  });
  if (!prismaFile) {
    return null;
  }
  res.render("index", {
    title: filename,
    partial: "partials/info",
    file: prismaFile,
  });
};

const uploadFileToFolder = async (req, res, next) => {
  const { id } = req.app.locals.user;
  const { folder } = req.params;
  const prismaFolder = await prisma.folder.findUnique({
    where: {
      name: folder,
    },
  });
  const prismaFile = await prisma.file.create({
    data: {
      name: req.body.filename,
      folder: {
        connect: { id: prismaFolder.id },
      },
      author: { connect: { id: id } },
    },
  });
  res.redirect(`/${prismaFolder.id}`);
};

const createFolder = async (req, res) => {
  const { foldername } = req.body;
  const { id } = req.app.locals.user;

  const projectFolder = join("./uploads", id.toString(), foldername);
  const constPrismaFolder = await prisma.folder.create({
    data: {
      name: foldername,
      authorId: parseInt(id),
    },
  });
  const dirCreation = await mkdir(projectFolder, { recursive: true });
  res.redirect(`/`);
};

const getFolder = async (req, res) => {
  const user = req.app.locals.user;
  const prismaFolder = await prisma.folder.findUnique({
    where: {
      name: req.params.folderName,
    },
    include: {
      files: true,
    },
  });
  res.render("index", {
    title: prismaFolder.name,
    user: req.app.locals.user,
    partial: "partials/files",
    folder: prismaFolder.name,
    files: prismaFolder.files,
  });
};

module.exports = {
  uploadFile,
  uploadFileToFolder,
  createFolder,
  getFolder,
  getFile,
};

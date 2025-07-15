const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const prisma = require("../prisma/client");

const uploadFile = async (req, res, next) => {
  const { id } = res.locals.user;
  const prismaFile = await prisma.file.create({
    data: {
      name: req.body.filename,
      author: { connect: { id: id } },
    },
  });
  res.redirect(`/user/${id}`);
};
const getFile = async (req, res) => {
  const { filename } = req.params;
  const { id } = res.locals.user;
  const prismaFile = await prisma.file.findUnique({
    where: {
      name: filename,
      authorId: id,
    },
    relationLoadStrategy: "join",
    include: {
      author: true,
      folder: true,
    },
  });
  if (!prismaFile) {
    return null;
  }
  // console.log(prismaFile);
  res.render("index", {
    title: filename,
    partial: "partials/info",
    file: prismaFile,
  });
};

const uploadFileToFolder = async (req, res, next) => {
  const { id } = res.locals.user;
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
  res.redirect(`/user/${id}/${prismaFolder.id}`);
};

const createFolder = async (req, res) => {
  const { foldername } = req.body;
  const { id } = res.locals.user;

  const projectFolder = join("./uploads", id.toString(), foldername);
  const constPrismaFolder = await prisma.folder.create({
    data: {
      name: foldername,
      authorId: parseInt(id),
    },
  });
  const dirCreation = await mkdir(projectFolder, { recursive: true });
  res.redirect(`/user/${id}`);
};

const getFolder = async (req, res) => {
  const user = res.locals.user;
  const prismaFolder = await prisma.folder.findUnique({
    where: {
      name: req.params.folderName,
    },
  });
  const folderId = req.params.id;

  const files = await prisma.file.findMany({
    where: {
      id: parseInt(folderId),
    },
  });
  console.log(files);
  res.render("index", {
    title: prismaFolder.name,
    user: res.locals.user,
    partial: "partials/files",
    files: files,
  });
};

module.exports = {
  uploadFile,
  uploadFileToFolder,
  createFolder,
  getFolder,
  getFile,
};

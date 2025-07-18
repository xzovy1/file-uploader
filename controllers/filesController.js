const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const prisma = require("../prisma/client");

const uploadFile = async (req, res, next) => {
  const { id } = req.app.locals.user;
  const folderName = req.params.folderName;
  console.log(req.app.locals);
  console.log(req.params);
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

  console.log(req.params);
  req.app.locals.fileInfo = req.params;
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
    partials: ["partials/info"],
    file: prismaFile,
  });
};

const uploadFileToFolder = async (req, res) => {
  const { id } = req.app.locals.user;
  const prismaFile = await prisma.file.create({
    data: {
      name: req.body.filename,
      folder: {
        connect: { id: req.app.locals.folder.id },
      },
      author: { connect: { id: id } },
    },
  });
  res.redirect(`/${req.app.locals.folder.name}`);
};

const deleteFile = async (req, res) => {
  const { user, fileInfo } = req.app.locals;

  console.log(req.app.locals.fileInfo);
  await prisma.file.delete({
    where: {
      authorId: user.id,
      name: fileInfo.filename,
    },
  });
  res.redirect("/");
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
    partials: ["partials/files", "partials/newFile", "partials/deleteFolder"],
    folder: prismaFolder.name,
    files: prismaFolder.files,
    fileActionPath: `${prismaFolder.name}/folderUpload`,
  });
};
const deleteFolder = async (req, res) => {
  const { folder } = req.app.locals;
  try {
    await prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });
  } catch (err) {
    console.log("Folder has entries. Deleting entries.");
    await prisma.file.deleteMany({
      where: {
        folderId: folder.id,
      },
    });
    await prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });
  } finally {
    res.redirect("/");
  }
};

module.exports = {
  uploadFile,
  uploadFileToFolder,
  createFolder,
  getFolder,
  getFile,
  deleteFile,
  deleteFolder,
};

const { mkdir } = require("node:fs/promises");
const { join } = require("node:path");
const prisma = require("../prisma/client");

const uploadFile = async (req, res, next) => {
  const { id } = res.locals.user;
  const { folder } = req.params;
  const prismaFolder = await prisma.folder.findUnique({
    where: {
      name: folder,
    },
  });
  if (folder) {
    res.redirect(`/user/${id}/${prismaFolder.id}`);
  } else {
    res.redirect(`/user/${id}`);
  }
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
  const url = req.url.split("/");
  const folderId = url[url.length - 1];
  const user = res.locals.user;
  const prismaFolder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId),
    },
  });
  res.locals.folder = prismaFolder;
  res.render("index", {
    title: prismaFolder.name,
    user: res.locals.user,
    partial: "partials/home",
    fileSystemEntries: prismaFolder,
    actionPath: `user/${user.id}/${prismaFolder.name}`,
  });
};

module.exports = {
  uploadFile,
  createFolder,
  getFolder,
};

const prisma = require("../prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const signUpGet = (req, res) => {
  res.render("index", { title: "Sign up", partials: ["partials/signup"] });
};

const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
  res.redirect("/");
});

const getUser = asyncHandler(async (req, res) => {
  if (req.isUnauthenticated()) {
    return res.redirect("/login");
  }
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      files: {
        where: {
          folderId: null,
        },
      },
      folders: true,
    },
  });
  res.render("dashboard", {
    title: `File Uploader`,
    user: user,
    folders: user.folders,
    files: user.files,
    fileActionPath: `${user.id}`, //newFile.ejs
  });
});

module.exports = {
  signUpGet,
  createUser,
  getUser,
};

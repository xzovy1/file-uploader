const prisma = require("../prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const signUpGet = (req, res) => {
  res.render("index", { title: "Sign up", partial: "partials/signup" });
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
  if (!req.app.locals.user) {
    return res.redirect("/login");
  }
  const { id } = req.app.locals.user;
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

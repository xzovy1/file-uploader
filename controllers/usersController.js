const prisma = require("../prisma/client");
const asyncHandler = require("express-async-handler");

const signUpGet = (req, res) => {
  res.render("index", { title: "Sign up", partial: "partials/signup" });
};

const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.redirect("/");
});

async function getAll(req, res) {
  const users = await prisma.user.findMany();
  console.log(users);
  res.redirect("/");
}

async function getUserFolders() {}

async function getFiles() {}

module.exports = {
  signUpGet,
  createUser,
  getUserFolders,
  getFiles,
  getAll,
};

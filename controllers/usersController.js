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
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.render("index", { title: `Welcome Back ${user.username}`, user: user });
});

async function getAll(req, res) {
  const users = await prisma.user.findMany();
  console.log(users);
  res.redirect("/");
}

module.exports = {
  signUpGet,
  createUser,
  getUser,
  getAll,
};

const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/new", usersController.signUpGet);
usersRouter.post("/new", usersController.createUser);

usersRouter.get("/:id", usersController.getUser);

usersRouter.post("/all", usersController.getAll);
module.exports = usersRouter;

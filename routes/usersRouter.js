const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const filesController = require("../controllers/filesController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

usersRouter.get("/new", usersController.signUpGet);
usersRouter.post("/new", usersController.createUser);

usersRouter.get("/:id", usersController.getUser);
usersRouter.get("/:id/:folderName", filesController.getFolder);

usersRouter.post("/:id/upload", uploadMiddleware, filesController.uploadFile);
usersRouter.post(
  "/:id/:folderName",
  uploadMiddleware,
  filesController.uploadFile
);

usersRouter.post("/newFolder", filesController.createFolder);

module.exports = usersRouter;

const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const filesController = require("../controllers/filesController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

usersRouter.get("/new", usersController.signUpGet);
usersRouter.post("/new", usersController.createUser);

usersRouter.get("/:id", usersController.getUser);

usersRouter.post(
  "/upload",
  upload.single("uploaded_file"),
  filesController.uploadFile
);

usersRouter.post("/newFolder", filesController.createFolder);

usersRouter.get("/all", usersController.getAll);
module.exports = usersRouter;

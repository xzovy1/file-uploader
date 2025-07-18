const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");
const filesController = require("../controllers/filesController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const storeFolderToLocals = require("../middleware/folderMiddleware");

router.get("/new", usersController.signUpGet);
router.post("/new", usersController.createUser);

router.get("/", usersController.getUser);

router.post("/newFolder", filesController.createFolder);

router.post("/deleteFile", filesController.deleteFile);
router.post("/deleteFolder", filesController.deleteFolder);
router.get("/:folderName", storeFolderToLocals, filesController.getFolder);
router.get("/:folderName/:filename", filesController.getFile);

router.post("/:id", uploadMiddleware, filesController.uploadFile);
router.post(
  "/:id/folderUpload",
  uploadMiddleware,
  filesController.uploadFileToFolder
);
router.post("/:id/:folder", uploadMiddleware, filesController.uploadFile);

module.exports = router;

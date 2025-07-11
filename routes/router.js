const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");
const filesController = require("../controllers/filesController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const storeFolderToLocals = require("../middleware/folderMiddleware");

router.get("/new", usersController.signUpGet);
router.post("/new", usersController.createUser);
router.get("/:id", usersController.getUser);

router.use(storeFolderToLocals);
router.get("/:id/:folderName", filesController.getFolder);

router.post("/:id/", uploadMiddleware, filesController.uploadFile);
router.post(
  "/:id/upload",
  uploadMiddleware,
  filesController.uploadFileToFolder
);
router.post("/:id/:folder", uploadMiddleware, filesController.uploadFile);

router.post("/newFolder", filesController.createFolder);

module.exports = router;

const {Router} = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/:id', usersController.getUserFolders);
usersRouter.get('/:id/:fileId', usersController.getFiles);

module.exports = usersRouter;
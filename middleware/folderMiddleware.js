const prisma = require("../prisma/client");
const storeFolderToLocals = async (req, res, next) => {
  const { folderName } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      authorId: parseInt(req.user.id),
      name: folderName,
    },
  });
  req.app.locals.folder = folder;
  next();
};

module.exports = storeFolderToLocals;

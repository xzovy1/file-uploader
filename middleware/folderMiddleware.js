const prisma = require("../prisma/client");
const storeFolderToLocals = async (req, res, next) => {
  const folders = await prisma.folder.findMany({
    where: {
      authorId: parseInt(res.locals.user.id),
    },
  });
  res.locals.folders = folders;
  next();
};

module.exports = storeFolderToLocals;

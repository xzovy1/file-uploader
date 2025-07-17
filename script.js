const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const dbCall = await prisma.user.findMany();
  console.log(dbCall);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

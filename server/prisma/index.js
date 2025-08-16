const db = require("../config/prismaClient");
const Folder = require("./queries/Folder");

const main = async () => {
  const res = await Folder.getRoot(10);
  console.log(res);
};

main();

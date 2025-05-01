const { Router } = require("express");
const {
  getFolder,
  postDeleteFolder,
  getNewFolder,
  postNewFolder,
} = require("../controllers/folderController");
const folderRouter = Router();

// folderRouter.get("/:folderId/create", getNewFolder);
folderRouter.get("/:folderId", getFolder);
folderRouter.delete("/:folderId", postDeleteFolder);
folderRouter.post("/:folderId", postNewFolder);

module.exports = folderRouter;

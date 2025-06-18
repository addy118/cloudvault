const Folder = require("../prisma/queries/Folder");
const Supabase = require("../prisma/queries/Supabase");

// folder/:folderId
exports.getFolder = async (req, res, next) => {
  const { folderId } = req.params;

  const folderDetails = await Folder.getItemsById(Number(folderId));

  if (!folderDetails) {
    const err = new Error("Folder Not Found");
    err.status = 404;
    next(err);
  }

  res.json(folderDetails);
};

// folder/:folderId
exports.postNewFolder = async (req, res) => {
  try {
    // current folderId
    const { folderId } = req.params;
    const { folderName, userId } = req.body;

    await Folder.create(folderName, Number(folderId), Number(userId));
    res.json({ msg: "Folder created successfully!" });
  } catch (error) {
    // send user-friendly error message
    res.status(400).json({ msg: error.message });
  }
};

// folder/:folderId
exports.postDeleteFolder = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const { userId } = req.body;
  // console.log(userId);

  try {
    // delete the contents of the folder (files and subfolders)
    await Supabase.removeFolder(folderId, Number(userId));

    // delete the folder metadata itself from db
    await Folder.deleteById(folderId);
    res.json({ msg: "Folder deleted successfully!" });
  } catch (err) {
    console.error("Error deleting the folder: ", err.message);
    console.error(err.stack);
    res.status(500).json({ msg: "Failed to remove folder and its files." });
  }
};

exports.appError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("customError", {
    title: "Error",
    file: "Folder Controller",
    error: err.message,
  });
};

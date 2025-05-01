const Folder = require("../prisma/queries/Folder");
const Supabase = require("../prisma/queries/Supabase");

exports.getFolder = async (req, res, next) => {
  const { folderId } = req.params;

  const folderDetails = await Folder.getItemsById(Number(folderId));
  // console.log("folder " + folderId + " rendered!");

  if (!folderDetails) {
    const err = new Error("Folder Not Found");
    err.status = 404;
    return next(err);
  }

  res.json(folderDetails);
};

// create folder form
// exports.getNewFolder = (req, res) => {
//   const { folderId } = req.params;

//   res.render("folderForm", {
//     title: "New Folder",
//     parentId: folderId,
//   });
// };

exports.postNewFolder = (req, res) => {
  try {
    // current folderId
    const { folderId } = req.params;
    const { folderName, userId } = req.body;

    Folder.create(folderName, Number(folderId), userId);
    // res.redirect(`/${folderId}/folder`);
    res.json({ msg: "Folder created successfully!" });
  } catch (error) {
    // send user-friendly error message
    res.status(400).json({ msg: error.message });
  }
};

exports.postDeleteFolder = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const userId = Number(req.user.id);

  // const parent = await Folder.getParent(folderId);

  try {
    // delete the contents of the folder (files and subfolders)
    await Supabase.removeFolder(folderId, userId);

    // delete the folder metadata itself from db
    await Folder.deleteById(folderId);

    // redirect to the parent folder
    // res.redirect(`/${parent.id}/folder`);
    res.json({ msg: "Folder deleted successfully!" });
  } catch (err) {
    console.error("Error deleting the folder: ", err.message);
    console.error("Stack: ", err.stack);
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

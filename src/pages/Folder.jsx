import React, { useEffect, useState } from "react";
import { Upload, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import api from "@/axiosInstance";
import { useAuth } from "@/authProvider";
import BreadCrumbNav from "@/components/BreadCrumbNav";
import RenderFolder from "@/components/RenderFolders";
import RenderFiles from "@/components/RenderFiles";
import UploadDialog from "@/components/UploadDialog";
import FolderDialog from "@/components/FolderDialog";

export default function CloudVault() {
  const { user } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [navigationPath, setNavigationPath] = useState([
    { id: user.rootId, name: "Root" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // state for dialogs
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);

  // state for form inputs
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    (async () => await refreshFolder(user.rootId))();
  }, []);

  const refreshFolder = async (folderId) => {
    try {
      const res = await api.get(`/folder/${folderId}`);
      setCurrentFolder(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Unable to fetch folder");
    }
  };

  // navigate to a folder
  const navigateToFolder = async (folder) => {
    const folderDetailsRes = await api.get(`/folder/${folder.id}`);
    setCurrentFolder(folderDetailsRes.data);

    // append to the navPath array
    setNavigationPath([
      ...navigationPath,
      { id: folder.id, name: folder.name },
    ]);
  };

  // navigate to a specific path level
  const navigateToPath = async (index) => {
    if (index === navigationPath.length - 1) return;

    // shrink to the path until newly selected folder only
    const newPath = navigationPath.slice(0, index + 1);
    setNavigationPath(newPath);

    if (index === 0) {
      // just get the root folder and set it as currFolder
      const rootRes = await api.get(`/folder/${user.rootId}`);
      setCurrentFolder(rootRes.data);
    } else {
      // get the selected folder obj {id, name}
      const folder = newPath[index];

      // get the folder details using folder.id
      const folderRes = await api.get(`/folder/${folder.id}`);
      setCurrentFolder(folderRes.data);
    }
  };

  // handle folder creation
  const handleCreateFolderSubmit = async (e) => {
    try {
      e.preventDefault();

      const currFolderId = navigationPath[navigationPath.length - 1].id;
      const newFolderRes = await api.post(`/folder/${currFolderId}`, {
        folderName: newFolderName,
        userId: user.id,
      });

      toast.success(
        // `Would create folder "${newFolderName}" in folder ID: ${navigationPath[navigationPath.length - 1].id}`
        `Folder ${newFolderName} created in ${navigationPath[navigationPath.length - 1].name} folder.`
      );

      await refreshFolder(currentFolder.id);

      setFolderDialogOpen(false);
      setNewFolderName("");
    } catch (err) {
      // gracefully catch the duplicate name error
      toast.error(err?.response?.data?.msg);
    }
  };

  // Handle file upload
  const handleUploadSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const currentFolder = navigationPath[navigationPath.length - 1];
      // console.log(currentFolder.id);

      // FormData obj formation
      const formData = new FormData();
      formData.append("userId", user.id);
      const filesArray = Array.from(selectedFiles);
      // console.log(filesArray);
      filesArray.forEach((file) => {
        formData.append("files", file);
      });

      console.log(formData);

      await api.post(`file/${currentFolder.id}`, formData);
      toast.success(
        `Uploaded ${filesArray ? filesArray.length : 0} files to ${currentFolder.name} folder.`
      );

      // refresh the currect folder and re-render
      await refreshFolder(currentFolder.id);

      setSelectedFiles(null);
      setUploadDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  // handle file download
  const handleDownload = (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    } else {
      toast.success(`Downloading ${file.name}.${file.type}...`);
    }
  };

  // handle copy link
  const handleCopyLink = (file) => {
    // In a real app, this would copy the file's URL to clipboard
    if (file.url) {
      navigator.clipboard
        .writeText(file.url)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(() => toast.success("Failed to copy link"));
    } else {
      toast.success(
        `Link for ${file.name}.${file.type} would be copied to clipboard`
      );
    }
  };

  // handle delete
  const handleDelete = async (item, itemType) => {
    if (confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        console.log("deleting...");

        // handle delete file/folder
        console.log(`/${itemType}/${item.id}`);
        console.log(user.id);
        // we need to send the body as { data: <your body as obj> } when sending delete req by axios
        await api.delete(`/${itemType}/${item.id}`, {
          data: { userId: user.id },
        });

        toast.success(`${itemType} ${item.name} deleted successfully!`);
        // refresh the currect folder and re-render
        await refreshFolder(currentFolder.id);
      } catch (err) {
        console.log("Error msg: ", err?.response?.data?.msg);
        toast.error(err?.response?.data?.msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <div className="container mx-auto max-w-7xl p-4">
        {/* Breadcrumb Navigation */}
        <BreadCrumbNav
          navigationPath={navigationPath}
          navigateToPath={navigateToPath}
        />

        {/* control buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="flex items-center gap-2 border-none bg-[#FFD369] font-medium text-[#222831] hover:bg-[#FFD369]/70 active:scale-95"
          >
            <Upload size={16} />
            Upload File
          </Button>
          <Button
            onClick={() => setFolderDialogOpen(true)}
            // variant="outline"
            className="flex items-center gap-2 border-[#393E46] bg-[#EEEEEE] text-[#222831] transition-all hover:bg-[#EEEEEE]/70 active:scale-95"
          >
            <FolderPlus size={16} />
            Create Folder
          </Button>
        </div>

        {/* Folder View Table */}
        <div className="overflow-hidden rounded-lg border border-[#393E46] bg-[#222831]">
          <Table>
            <TableHeader className="bg-[#393E46]">
              <TableRow className="border-b-[#393E46] hover:bg-[#393E46]">
                <TableHead className="w-[40%] text-[#EEEEEE]">Name</TableHead>
                <TableHead className="text-[#EEEEEE]">Type</TableHead>
                <TableHead className="text-[#EEEEEE]">Size</TableHead>
                <TableHead className="text-[#EEEEEE]">Modified</TableHead>
                <TableHead className="text-right text-[#EEEEEE]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* render subfolders */}
              {console.log(currentFolder)}
              {currentFolder?.subFolders?.map((folder) => (
                <RenderFolder
                  folder={folder}
                  navigateToFolder={navigateToFolder}
                  handleCopyLink={handleCopyLink}
                  handleDelete={handleDelete}
                />
              ))}

              {/* render files */}
              {currentFolder?.files?.map((file) => (
                <RenderFiles
                  file={file}
                  handleCopyLink={handleCopyLink}
                  handleDelete={handleDelete}
                  handleDownload={handleDownload}
                />
              ))}

              {/* show message if folder is empty */}
              {(!currentFolder?.subFolders ||
                currentFolder?.subFolders.length === 0) &&
                (!currentFolder?.files ||
                  currentFolder?.files?.length === 0) && (
                  <TableRow className="hover:bg-[#393E46]/30">
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-[#EEEEEE]/50"
                    >
                      This folder is empty
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>

        {/* upload file dialog */}
        {uploadDialogOpen && (
          <UploadDialog
            setSelectedFiles={setSelectedFiles}
            setUploadDialogOpen={setUploadDialogOpen}
            handleUploadSubmit={handleUploadSubmit}
            isLoading={isLoading}
          />
        )}

        {/* create folder dialog */}
        {folderDialogOpen && (
          <FolderDialog
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
            setFolderDialogOpen={setFolderDialogOpen}
            handleCreateFolderSubmit={handleCreateFolderSubmit}
          />
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  ChevronRight,
  Folder,
  Upload,
  FolderPlus,
  Download,
  Link,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatFileSize, formatDate, getFileIcon } from "../utils/utils";
import { toast } from "sonner";

export default function CloudVault() {
  // Initial response object structure - directly the folder object
  const initialResponse = {
    id: 34,
    name: "Root",
    parentId: null,
    createdAt: "2025-01-08T11:55:00.835Z",
    updatedAt: "2025-01-08T11:55:00.835Z",
    userId: 10,
    url: null,
    subFolders: [
      {
        id: 37,
        name: "demo",
        parentId: 34,
        createdAt: "2025-04-18T17:30:22.017Z",
        updatedAt: "2025-04-18T17:30:22.017Z",
        userId: 10,
        url: null,
      },
    ],
    files: [
      {
        id: 122,
        name: "wpmh-qb-ise-ii",
        folderId: 34,
        type: "pdf",
        size: 393762,
        createdAt: "2025-04-18T17:30:15.005Z",
        updatedAt: "2025-04-18T17:30:15.005Z",
        userId: 10,
        url: "https://gqpjlndplnbrfujevaon.supabase.co/storage/v1/object/public/files/10/34/wpmh-qb-ise-ii.pdf?download",
      },
    ],
  };

  // State for current folder and navigation path
  const [currentFolder, setCurrentFolder] = useState(initialResponse);
  const [navigationPath, setNavigationPath] = useState([
    { id: 34, name: "Root" },
  ]);

  // State for dialogs
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);

  // State for form inputs
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  // Navigate to a folder
  const navigateToFolder = (folder) => {
    // In a real app, this would fetch the folder contents from the server
    // For this demo, we'll simulate it with mock data
    const mockSubfolder = {
      id: folder.id,
      name: folder.name,
      parentId: folder.parentId,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
      userId: 10,
      url: null,
      subFolders: [
        // Mock subfolders
        {
          id: folder.id + 100,
          name: "Subfolder in " + folder.name,
          parentId: folder.id,
          createdAt: "2025-04-19T10:30:22.017Z",
          updatedAt: "2025-04-19T10:30:22.017Z",
          userId: 10,
          url: null,
        },
      ],
      files: [
        // Mock files
        {
          id: folder.id + 200,
          name: "Document in " + folder.name,
          folderId: folder.id,
          type: "pdf",
          size: 250000,
          createdAt: "2025-04-19T11:15:15.005Z",
          updatedAt: "2025-04-19T11:15:15.005Z",
          userId: 10,
          url: "https://example.com/document.pdf",
        },
      ],
    };

    setCurrentFolder(mockSubfolder);
    setNavigationPath([
      ...navigationPath,
      { id: folder.id, name: folder.name },
    ]);
  };

  // Navigate to a specific path level
  const navigateToPath = (index) => {
    if (index === navigationPath.length - 1) return;

    const newPath = navigationPath.slice(0, index + 1);
    setNavigationPath(newPath);

    // In a real app, this would fetch the folder contents from the server
    // For this demo, we'll just go back to the initial response if we're at root
    if (index === 0) {
      setCurrentFolder(initialResponse);
    } else {
      // Mock response for intermediate folders
      const folder = newPath[index];
      const mockFolder = {
        id: folder.id,
        name: folder.name,
        parentId: index > 0 ? newPath[index - 1].id : null,
        createdAt: "2025-04-18T17:30:22.017Z",
        updatedAt: "2025-04-18T17:30:22.017Z",
        userId: 10,
        url: null,
        subFolders: [
          {
            id: folder.id + 100,
            name: "Subfolder in " + folder.name,
            parentId: folder.id,
            createdAt: "2025-04-19T10:30:22.017Z",
            updatedAt: "2025-04-19T10:30:22.017Z",
            userId: 10,
            url: null,
          },
        ],
        files: [
          {
            id: folder.id + 200,
            name: "Document in " + folder.name,
            folderId: folder.id,
            type: "pdf",
            size: 250000,
            createdAt: "2025-04-19T11:15:15.005Z",
            updatedAt: "2025-04-19T11:15:15.005Z",
            userId: 10,
            url: "https://example.com/document.pdf",
          },
        ],
      };
      setCurrentFolder(mockFolder);
    }
  };

  // Handle file upload
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would upload the files to the server
    toast.success(
      `Would upload ${selectedFiles ? selectedFiles.length : 0} files to folder ID: ${navigationPath[navigationPath.length - 1].id}`
    );
    setUploadDialogOpen(false);
    setSelectedFiles(null);
  };

  // Handle folder creation
  const handleCreateFolderSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create a new folder on the server
    toast.success(
      `Would create folder "${newFolderName}" in folder ID: ${navigationPath[navigationPath.length - 1].id}`
    );
    setFolderDialogOpen(false);
    setNewFolderName("");
  };

  // Handle file download
  const handleDownload = (file) => {
    // In a real app, this would download the file
    if (file.url) {
      window.open(file.url, "_blank");
    } else {
      toast.success(`Downloading ${file.name}.${file.type}...`);
    }
  };

  // Handle copy link
  const handleCopyLink = (file) => {
    // In a real app, this would copy the file's URL to clipboard
    if (file.url) {
      navigator.clipboard
        .writeText(file.url)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(() => toast.success("Failed to copy link"));
    } else {
      toast.success(`Link for ${file.name}.${file.type} would be copied to clipboard`);
    }
  };

  // Handle delete
  const handleDelete = (item, itemType) => {
    // In a real app, this would delete the file or folder
    if (confirm(`Are you sure you want to delete this ${itemType}?`)) {
      toast.success(`${itemType} "${item.name}" would be deleted`);
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <div className="container mx-auto max-w-7xl p-4">
        {/* <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-[#FFD369]">CloudVault</h1>
          <p className="text-[#EEEEEE]/70">
            Your secure cloud storage solution
          </p>
        </header> */}

        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {navigationPath.map((folder, index) => (
              <React.Fragment key={folder.id}>
                {index > 0 && (
                  <BreadcrumbSeparator className="text-[#FFD369]">
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => navigateToPath(index)}
                    className="cursor-pointer text-[#EEEEEE] hover:text-[#FFD369]"
                  >
                    {folder.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Control Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="flex items-center gap-2 border-none bg-[#FFD369] font-medium text-[#222831] hover:bg-[#FFD369]/90"
          >
            <Upload size={16} />
            Upload File
          </Button>
          <Button
            onClick={() => setFolderDialogOpen(true)}
            variant="outline"
            className="flex items-center gap-2 border-[#393E46] text-[#EEEEEE] hover:bg-[#393E46] hover:text-[#FFD369]"
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
              {/* Render subfolders */}
              {currentFolder.subFolders &&
                currentFolder.subFolders.map((folder) => (
                  <TableRow
                    key={`folder-${folder.id}`}
                    className="border-b-[#393E46] hover:bg-[#393E46]/30"
                  >
                    <TableCell className="font-medium text-[#EEEEEE]">
                      <div className="flex items-center gap-2">
                        <Folder size={20} className="text-[#FFD369]" />
                        <span
                          className="cursor-pointer hover:text-[#FFD369]"
                          onClick={() => navigateToFolder(folder)}
                        >
                          {folder.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#EEEEEE]/80">Folder</TableCell>
                    <TableCell className="text-[#EEEEEE]/80">-</TableCell>
                    <TableCell className="text-[#EEEEEE]/80">
                      {formatDate(folder.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyLink(folder)}
                          title="Copy Link"
                          className="text-[#EEEEEE] hover:bg-[#393E46]"
                        >
                          <Link size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(folder, "folder")}
                          title="Delete"
                          className="text-red-400 hover:bg-[#393E46]"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              {/* Render files */}
              {currentFolder.files &&
                currentFolder.files.map((file) => (
                  <TableRow
                    key={`file-${file.id}`}
                    className="border-b-[#393E46] hover:bg-[#393E46]/30"
                  >
                    <TableCell className="font-medium text-[#EEEEEE]">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#EEEEEE]/80">
                      {file.type.toUpperCase()}
                    </TableCell>
                    <TableCell className="text-[#EEEEEE]/80">
                      {formatFileSize(file.size)}
                    </TableCell>
                    <TableCell className="text-[#EEEEEE]/80">
                      {formatDate(file.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(file)}
                          title="Download"
                          className="text-[#EEEEEE] hover:bg-[#393E46]"
                        >
                          <Download size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyLink(file)}
                          title="Copy Link"
                          className="text-[#EEEEEE] hover:bg-[#393E46]"
                        >
                          <Link size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(file, "file")}
                          title="Delete"
                          className="text-red-400 hover:bg-[#393E46]"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              {/* Show message if folder is empty */}
              {(!currentFolder.subFolders ||
                currentFolder.subFolders.length === 0) &&
                (!currentFolder.files || currentFolder.files.length === 0) && (
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

        {/* Upload File Dialog */}
        {uploadDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-full max-w-md rounded-lg border border-[#393E46] bg-[#222831] p-6 text-[#EEEEEE]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#FFD369]">
                  Upload Files
                </h2>
                <button
                  onClick={() => setUploadDialogOpen(false)}
                  className="text-[#EEEEEE]/70 hover:text-[#FFD369]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit}>
                <div className="mb-4">
                  <label className="mb-2 block font-medium text-[#EEEEEE]">
                    Upload (Max 10 files of each 5.5 MB):
                  </label>
                  <input
                    type="file"
                    multiple
                    className="w-full rounded border border-[#393E46] bg-[#222831] p-2 text-[#EEEEEE]"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setUploadDialogOpen(false)}
                    className="rounded border border-[#393E46] px-4 py-2 text-[#EEEEEE] hover:bg-[#393E46]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-[#FFD369] px-4 py-2 font-medium text-[#222831] hover:bg-[#FFD369]/90"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Folder Dialog */}
        {folderDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-full max-w-md rounded-lg border border-[#393E46] bg-[#222831] p-6 text-[#EEEEEE]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#FFD369]">
                  Create New Folder
                </h2>
                <button
                  onClick={() => setFolderDialogOpen(false)}
                  className="text-[#EEEEEE]/70 hover:text-[#FFD369]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateFolderSubmit}>
                <div className="mb-4">
                  <label className="mb-2 block font-medium text-[#EEEEEE]">
                    Folder Name:
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full rounded border border-[#393E46] bg-[#222831] p-2 text-[#EEEEEE]"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFolderDialogOpen(false)}
                    className="rounded border border-[#393E46] px-4 py-2 text-[#EEEEEE] hover:bg-[#393E46]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-[#FFD369] px-4 py-2 font-medium text-[#222831] hover:bg-[#FFD369]/90"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

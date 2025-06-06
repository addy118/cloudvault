import React from "react";
import { X } from "lucide-react";

export default function UploadDialog({
  setUploadDialogOpen,
  setSelectedFiles,
  handleUploadSubmit,
  isLoading,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg border border-[#393E46] bg-[#222831] p-6 text-[#EEEEEE]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#FFD369]">Upload Files</h2>
          <button
            onClick={() => setUploadDialogOpen(false)}
            className="text-[#EEEEEE]/70 hover:text-[#FFD369]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleUploadSubmit} enctype="multipart/form-data">
          <div className="mb-4">
            <label className="mb-2 block font-medium text-[#EEEEEE]">
              Upload (Max 10 files of each 5.5 MB):
            </label>
            <input
              type="file"
              multiple
              className="w-full cursor-pointer rounded border border-[#393E46] bg-[#222831] p-2 text-[#EEEEEE]"
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
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

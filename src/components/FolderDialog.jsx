import React from "react";
import { X } from "lucide-react";

export default function FolderDialog({
  setFolderDialogOpen,
  newFolderName,
  setNewFolderName,
  handleCreateFolderSubmit
}) {
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    <div className="w-full max-w-md rounded-lg border border-[#393E46] bg-[#222831] p-6 text-[#EEEEEE]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#FFD369]">Create New Folder</h2>
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
  </div>;
}

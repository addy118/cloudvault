import React from "react";
import { Folder, Link, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "../utils/utils";

export default function RenderFolder({
  folder,
  navigateToFolder,
  handleCopyLink,
  handleDelete,
}) {
  return (
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
  );
}

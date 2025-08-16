import React from "react";
import { Download, Link, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatFileSize, formatDate, getFileIcon } from "../utils/utils";

export default function RenderFiles({
  file,
  handleCopyLink,
  handleDelete,
  handleDownload,
}) {
  return (
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
  );
}

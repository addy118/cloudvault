import React from "react";
import { FileText, FileImage, FileMusic, FileVideo, File } from "lucide-react";

// Format file size to human-readable format
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

// Format date to human-readable format
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Get appropriate icon based on file type
export function getFileIcon(fileType) {
  switch (fileType) {
    case "pdf":
    case "txt":
    case "md":
    case "doc":
    case "docx":
      return <FileText size={20} className="text-[#FFD369]" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      return <FileImage size={20} className="text-[#FFD369]" />;
    case "mp3":
    case "wav":
    case "ogg":
      return <FileMusic size={20} className="text-[#FFD369]" />;
    case "mp4":
    case "mov":
    case "avi":
      return <FileVideo size={20} className="text-[#FFD369]" />;
    default:
      return <File size={20} className="text-[#EEEEEE]/80" />;
  }
}

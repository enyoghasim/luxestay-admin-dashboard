import { useCallback } from "react";
import { UploaderFile } from "../types/upload.type";

export const useUploadHandler = () => {
  const files: UploaderFile[] = [];

  const addFiles = useCallback((newFiles: File[]) => {
    newFiles.forEach((file) => {
      const uploaderFile: UploaderFile = {
        id: crypto.randomUUID(),
        blob: URL.createObjectURL(file),
        state: "pending",
        name: file.name,
        contentType: file.type,
      };
      files.push(uploaderFile);
    });
  }, []);

  return { files };
};

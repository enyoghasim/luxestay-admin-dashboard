export type UploaderFile = {
  id: string;
  blob: string;
  state: "pending" | "getting-upload-url" | "uploading" | "uploaded" | "error";
  name: string;
  contentType: string;
  uploadPercent?: number;
};

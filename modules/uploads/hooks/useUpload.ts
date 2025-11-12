"use client";
import * as React from "react";
import axios from "axios";
import axiosInstance from "@/modules/common/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { UploaderFile } from "@/modules/uploads/types/upload.type";
import { validateApiResponse } from "@/modules/common/lib/utils";

type GenerateUrlResult = {
  signedUrl?: string;
  filename?: string;
};

type InternalUploadFile = UploaderFile & {
  fileObject?: File;
  cancelSource?: ReturnType<typeof axios.CancelToken.source>;
  error?: string;
  serverFileId?: string;
};

function genId() {
  if (typeof crypto !== "undefined") {
    const c = crypto as unknown as { randomUUID?: () => string };
    if (typeof c.randomUUID === "function") return c.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function useUpload(scope: string) {
  const [files, setFiles] = React.useState<InternalUploadFile[]>([]);
  const filesRef = React.useRef<InternalUploadFile[]>([]);
  const onIdsChangeRef = React.useRef<((ids: string[]) => void) | null>(null);

  // react-query mutation to request signed/upload url from your API
  const generateUrlMutation = useMutation<
    GenerateUrlResult,
    unknown,
    { filename: string; contentType: string }
  >(async ({ filename, contentType }) => {
    const { data } = await axiosInstance.post(
      "/storage/generate-signed-upload-url",
      {
        filename,
        contentType,
        scope,
      }
    );
    // expect res.data to contain { uploadUrl }
    return validateApiResponse(data);
  });

  // helper to update a specific file by id
  const updateFile = React.useCallback(
    (id: string, patch: Partial<InternalUploadFile>) => {
      setFiles((prev) => {
        const next = prev.map((f) => (f.id === id ? { ...f, ...patch } : f));
        filesRef.current = next;
        return next;
      });
    },
    []
  );

  const startUploadFor = React.useCallback(
    async (internal: InternalUploadFile) => {
      const fileObj = internal.fileObject;
      if (!fileObj) return;

      const id = internal.id;

      try {
        updateFile(id, {
          state: "getting-upload-url",
          uploadPercent: 0,
          error: undefined,
        });

        const payload = {
          filename: internal.name,
          contentType: internal.contentType,
        };
        const data = await generateUrlMutation.mutateAsync(payload);
        console.log(data, "okay");

        // Accept several possible response shapes. Preferred: { signedUrl, filename }
        const uploadUrl = data?.signedUrl;
        if (!uploadUrl) throw new Error("No upload URL returned from server");

        const source = axios.CancelToken.source();
        updateFile(id, {
          cancelSource: source,
          state: "uploading",
          uploadPercent: 0,
        });

        await axios.put(uploadUrl, fileObj, {
          headers: {
            "Content-Type": internal.contentType || "application/octet-stream",
          },
          onUploadProgress: (evt) => {
            if (!evt.total) return;
            const percent = Math.round((evt.loaded / evt.total) * 100);
            updateFile(id, { uploadPercent: percent });
          },
          cancelToken: source.token,
        });

        // The backend may return a `filename` (path) which we treat as the uploaded id.
        const serverId = data.filename;
        updateFile(id, {
          state: "uploaded",
          uploadPercent: 100,
          serverFileId: serverId,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : String(err ?? "Upload failed");
        updateFile(id, { state: "error", error: message });
      }
    },
    [generateUrlMutation, updateFile]
  );

  const addFiles = React.useCallback(
    (selected: FileList | File[] | null) => {
      if (!selected) return;
      const list = Array.isArray(selected) ? selected : Array.from(selected);

      const created: InternalUploadFile[] = list.map((f) => ({
        id: genId(),
        blob: URL.createObjectURL(f),
        state: "pending",
        name: f.name,
        contentType: f.type || "application/octet-stream",
        uploadPercent: 0,
        fileObject: f,
      }));

      setFiles((prev) => {
        const next = [...prev, ...created];
        filesRef.current = next;
        return next;
      });

      // start uploads asynchronously (don't await all here)
      created.forEach((c) => {
        // run in next tick to ensure state updated
        void startUploadFor(c);
      });
    },
    [startUploadFor]
  );

  const removeFile = React.useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) {
        // cancel if uploading
        if (target.cancelSource) {
          try {
            target.cancelSource.cancel("Cancelled by user");
          } catch {
            // noop
          }
        }
        // revoke preview
        try {
          URL.revokeObjectURL(target.blob);
        } catch {
          // noop
        }
      }
      const next = prev.filter((p) => p.id !== id);
      filesRef.current = next;
      return next;
    });
  }, []);

  // cleanup on unmount
  // cleanup on unmount: cancel any inflight uploads and revoke blobs
  React.useEffect(() => {
    return () => {
      filesRef.current.forEach((f) => {
        if (f.cancelSource) {
          try {
            f.cancelSource.cancel("Component unmounted");
          } catch {
            // noop
          }
        }
        try {
          URL.revokeObjectURL(f.blob);
        } catch {
          // noop
        }
      });
    };
  }, []);

  // notify subscribers with uploaded ids whenever files change
  React.useEffect(() => {
    const ids = files
      .filter((f) => f.state === "uploaded" && f.serverFileId)
      .map((f) => f.serverFileId as string);
    if (onIdsChangeRef.current) onIdsChangeRef.current(ids);
  }, [files]);

  const clearAll = React.useCallback(() => {
    filesRef.current.forEach((f) => {
      if (f.cancelSource) {
        try {
          f.cancelSource.cancel("Cleared by user");
        } catch {
          // noop
        }
      }
      try {
        URL.revokeObjectURL(f.blob);
      } catch {
        // noop
      }
    });
    filesRef.current = [];
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearAll,
    setOnIdsChange: (fn: (ids: string[]) => void | null) => {
      onIdsChangeRef.current = fn;
    },
    isGeneratingUrl: generateUrlMutation.isLoading,
    generateUrlError: generateUrlMutation.error,
  };
}

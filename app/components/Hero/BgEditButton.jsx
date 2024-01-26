"use client";

import { useDropzone, useUploadThing } from "@utils/uploadthing";
import { ImageIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

export default function BgEditButton({ setHomeBgUrl = async () => {} }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadProgress: () => {
      setUploading(true);
    },
    onUploadBegin: () => {
      setUploading(true);
    },
    onClientUploadComplete: async (res) => {
      // Do something with the response
      if (res.length) {
        const { name, url } = res[0];
        await setHomeBgUrl(url);
        setUploading(false);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    if (files.length) {
      startUpload(files);
    }
  }, [files]);
  return (
    <div
      className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full items-center justify-center rounded-lg border border-white px-4 py-2 hover:opacity-50"
      {...getRootProps()}
    >
      <input type="file" id="home-bg-upload-btn" {...getInputProps()} />

      <label htmlFor="home-bg-upload-btn" className="cursor-pointer">
        {uploading ? (
          <div>...</div>
        ) : (
          <div className="flex items-center gap-2 tracking-normal">
            <ImageIcon size={20} />
            <span>Edit background</span>
          </div>
        )}
      </label>
    </div>
  );
}

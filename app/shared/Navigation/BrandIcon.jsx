"use client";

import Image from "next/image";
import defaultIcon from "@assets/icon.png";
import { useCallback, useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";

import { useDropzone, useUploadThing } from "@utils/uploadthing";
import { generateClientDropzoneAccept } from "uploadthing/client";

export default function BrandIcon({
  cmsBrandIcon = "",
  setCmsBrandIcon = async () => {},
}) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

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
        await setCmsBrandIcon(url);
        setUploading(false);
        setShowEditOverlay(false);
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
    <div className="relative" {...getRootProps()}>
      <Image
        src={cmsBrandIcon || defaultIcon}
        width={35}
        height={35}
        alt="brand icon"
        className="block h-[35px] w-[35px] md:scale-150"
        onMouseEnter={() => setShowEditOverlay(true)}
      />

      <input type="file" id="upload-btn" {...getInputProps()} />

      {showEditOverlay ? (
        <label
          htmlFor="upload-btn"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseLeave={(e) => {
            if (!uploading) setShowEditOverlay(false);
          }}
          className="absolute bottom-0 left-0 right-0 top-0 flex scale-[1.5] cursor-pointer items-center justify-center bg-black/60"
        >
          {uploading ? (
            <div>...</div>
          ) : (
            <div className="flex items-center gap-0 text-[0.6rem] tracking-normal">
              <PencilIcon size={10} />
              <span>Edit</span>
            </div>
          )}
        </label>
      ) : null}
    </div>
  );
}

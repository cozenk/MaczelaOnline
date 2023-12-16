"use client";

import { UploadButton } from "@utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

export default function ImageField({
  defaultImageUrl = "",
  setIsReadyToSubmit = () => {},
}) {
  const [uploadedImage, setUploadedImage] = useState({
    name: "",
    url: defaultImageUrl,
  });

  return (
    <div className="mb-2">
      <label
        htmlFor="image_url"
        className="block text-sm font-medium leading-6 "
      >
        Image: {uploadedImage.name ? <span>{uploadedImage.name}</span> : null}
      </label>

      <input
        type="hidden"
        id="image_url"
        name="image_url"
        value={uploadedImage.url}
      />

      {uploadedImage.url ? (
        <Image src={uploadedImage.url} width={100} height={100} />
      ) : null}

      <UploadButton
        endpoint="imageUploader"
        onUploadProgress={() => {
          setIsReadyToSubmit(false);
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (res.length) {
            const { name, url } = res[0];
            setUploadedImage({ name, url });
            setIsReadyToSubmit(true);
          }
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          setIsReadyToSubmit(true);
        }}
      />
    </div>
  );
}

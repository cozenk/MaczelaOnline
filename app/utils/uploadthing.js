import { generateComponents } from "@uploadthing/react";
import {
  generateReactHelpers,
  useDropzone as dz,
} from "@uploadthing/react/hooks";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents();
export const { useUploadThing, uploadFiles } = generateReactHelpers();
export const useDropzone = dz;

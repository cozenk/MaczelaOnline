import Image from "next/image";
import { ImageDown } from "lucide-react";
import Info from "./Info";

export default function Pizza({
  id,
  href,
  imageSrc,
  imageAlt,
  name,
  price,
  size,
  variants = [],
}) {
  return (
    <div>
      <a href={href} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          {imageSrc ? (
            <Image
              src={imageSrc || ""}
              width={340}
              height={340}
              alt={imageAlt || "Some image description"}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          ) : (
            <ImageDown width={340} height={340} />
          )}
        </div>
      </a>
      <Info
        id={id}
        href={href}
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        name={name}
        price={price}
        size={size}
        variants={variants}
      />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
const ImageFallback = (props: ImageProps & { fallbackSrc?: string }) => {
  const {
    src,
    fallbackSrc = "https://staging1.internal1.packiyo.com/img/no-image.png",
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt="image"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageFallback;

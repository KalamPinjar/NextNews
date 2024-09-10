/* eslint-disable @next/next/no-img-element */
import React from "react";
interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = ({ src, width, height, alt, style }) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      style={style}
      className="rounded-t-lg w-full h-[150px] object-cover"
    />
  );
};

export default Image;

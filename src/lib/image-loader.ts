"use client";
import type { ImageLoaderProps } from "next/image";
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/")) return src;
  return `/optimized/${src.split("/").pop()}-${width}.webp`;
}

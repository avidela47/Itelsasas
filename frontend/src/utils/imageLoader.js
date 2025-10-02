// src/utils/imageLoader.js
export const getProductImage = (fileName) => {
  if (!fileName) return "/placeholder.png";
  if (fileName.startsWith("http")) return fileName;
  return `/product/${fileName}`;  // se resuelve desde public/product/
};

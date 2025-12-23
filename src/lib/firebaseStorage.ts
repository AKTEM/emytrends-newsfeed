import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import app from "./firebase";
import { compressImage } from "./imageCompression";

const storage = getStorage(app);

export const uploadProductImage = async (file: File, productId: string): Promise<string> => {
  // Compress image before uploading to save storage space
  const compressedFile = await compressImage(file, {
    maxWidth: 2048,
    maxHeight: 2048,
    quality: 0.88,
    targetSizeKB: 500,
  });
  
  const timestamp = Date.now();
  const storageRef = ref(storage, `products/${productId}/${timestamp}-${file.name}`);
  await uploadBytes(storageRef, compressedFile);
  return getDownloadURL(storageRef);
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

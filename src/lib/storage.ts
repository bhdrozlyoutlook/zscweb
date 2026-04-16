import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function deleteImageByUrl(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch {
    // ignore — file may not exist or URL may be external
  }
}

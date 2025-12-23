import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const blogsCollection = collection(db, "blogs");

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  featuredImage?: string;
  images?: string[];
  tags?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const addBlogPost = async (blog: Omit<BlogPost, "id">): Promise<string> => {
  const docRef = await addDoc(blogsCollection, {
    ...blog,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updateBlogPost = async (id: string, blog: Partial<BlogPost>): Promise<void> => {
  const blogRef = doc(db, "blogs", id);
  await updateDoc(blogRef, {
    ...blog,
    updatedAt: new Date(),
  });
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const blogRef = doc(db, "blogs", id);
  await deleteDoc(blogRef);
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const blogRef = doc(db, "blogs", id);
  const blogDoc = await getDoc(blogRef);
  
  if (blogDoc.exists()) {
    return { id: blogDoc.id, ...blogDoc.data() } as BlogPost;
  }
  return null;
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const q = query(blogsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
};

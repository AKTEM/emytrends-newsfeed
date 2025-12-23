import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import app from "../lib/firebase";

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  user: User | null;
}

const AdminContext = createContext<AdminContextType>({ 
  isAdmin: false, 
  loading: true,
  user: null 
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        
        if (adminDoc.exists() && adminDoc.data()?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, authLoading]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading: authLoading || loading, user }}>
      {children}
    </AdminContext.Provider>
  );
};

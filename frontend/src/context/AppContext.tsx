// src/context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // Return the name if available, otherwise the email
      return parsed.name || parsed.email;
    }
    return null;
  });

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

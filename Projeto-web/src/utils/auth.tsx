import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import api from "../services/api";

interface User {
  id: number;
  nome: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<Boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<Boolean> => {
    try {
      const res = await api.post<User>("api/user/login", { email, password });
      const data = res.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error("Erro no login: ", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

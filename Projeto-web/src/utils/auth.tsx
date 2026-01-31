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
  email: string;
  nome: string;
  role: string;
}

interface ReturnLogin {
  token: string;
  id: number;
  email: string;
  nome: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<Boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<Boolean> => {
    try {
      const res = await api.post<ReturnLogin>("api/user/login", {
        email,
        senha,
      });
      const data = res.data;

      // Guardar token no localStorage
      localStorage.setItem("token", data.token);

      // Guardar dados do usuário
      const userData: User = {
        id: data.id,
        nome: data.nome,
        email: data.email,
        role: data.role,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (err) {
      console.error("Erro no login: ", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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

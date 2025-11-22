import  {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { authAPI } from "../services/api.ts";
import { setAuthToken,clearAuthToken} from "../services/authToken";
import type { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  email: string;
};

type RequestResult = { success: true } | { success: false; message: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<RequestResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();


  async function login(
    email: string,
    password: string
  ): Promise<RequestResult> {
    try {
      const { data } = await authAPI.login(email, password);
      const token = data.token;
      setToken(token);
      setAuthToken(token);
      return { success: true };
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      return {
        success: false,
        message:
          err.response?.data?.error || "Erro ao fazer login. Tente novamente.",
      };
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    clearAuthToken();
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

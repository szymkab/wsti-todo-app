import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, removeToken, saveToken } from "./service";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthData {
  isAuthenticated: boolean;
  user: User | null;
  logout?: () => void;
  login?: (payload: User & { access_token: string }) => void;
}

export const AuthContext = createContext<AuthData>({
  isAuthenticated: false,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const lookForToken = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status !== 200) {
            throw new Error();
          }
          const user = await response.json();
          setUser(user);
          setIsAuthenticated(true);
          if (location.pathname === "/login") {
            navigate("/");
          }
        } catch (e) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }

      setIsResolved(true);
    };

    lookForToken();
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = (user: User & { access_token: string }) => {
    saveToken(user.access_token);
    setIsAuthenticated(true);
    setUser(user);
    navigate("/", { replace: true });
  };

  if (!isResolved) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        logout: handleLogout,
        login: handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

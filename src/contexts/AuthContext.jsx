import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoading(true);
      fetchUserStatus(storedToken).finally(() => setIsLoading(false)); // Fetch user status from the server
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserStatus = async (token) => {
    try {
      const response = await fetch(
        "https://marketilo.onrender.com/marketilo/checkToken",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUserRole(data.userRole);
      } else {
        // Handle invalid token or other errors here
        console.error("Error fetching user status:", response.statusText);
        setIsLoggedIn(false); // Set isLoggedIn to false on error
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      setIsLoggedIn(false); // Set isLoggedIn to false on error
    }
  };

  const login = (newToken, role) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false); // Manually set isLoggedIn to false on logout
    setUserRole(""); // Clear the userRole on logout
  };

  const getToken = useCallback(() => {
    return token;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, getToken, login, logout, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

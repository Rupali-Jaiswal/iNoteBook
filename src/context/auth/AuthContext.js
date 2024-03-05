import { useContext, createContext,useState, Children } from "react";
const AuthContext=createContext();

export const AuthProvider=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Implement your login logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
  };
  return(
   <AuthContext.Provider value={{login,logout,isAuthenticated}}>
    {Children}
   </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
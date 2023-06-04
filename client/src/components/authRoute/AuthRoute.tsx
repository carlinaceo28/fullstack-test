import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const response = localStorage.getItem("userData");
      const parsedInfoFromStorage = JSON.parse(response!);
      setUser(parsedInfoFromStorage);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("USER NO AUTH ROUTE", user);
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {}, [isLoading]);

  return isAuthenticated ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

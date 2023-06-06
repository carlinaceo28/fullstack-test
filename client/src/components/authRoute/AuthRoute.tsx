import { Navigate, Outlet, redirect } from "react-router";
import { useEffect, useState } from "react";
import { AsyncLocalStorage } from "../../util/AsyncLocalStorage";

export const AuthRoute = () => {
  const [userFromStorage, setUserFromStorage] = useState<object | null>(null);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const getUser = await AsyncLocalStorage.getItem("userData");
        const parseUser = JSON.parse(getUser!)
        setUserFromStorage(parseUser);
        console.log(parseUser)
         userFromStorage ? redirect("/home") : redirect("/")
      } catch (error) {
        console.error(error);
      }
    }
    getUserFromStorage()
  }, []);


  return userFromStorage ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

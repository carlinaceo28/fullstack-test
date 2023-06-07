import { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import { AsyncLocalStorage } from "../../util/AsyncLocalStorage";

export const AuthRoute = () => {
  const [userFromStorage, setUserFromStorage] = useState<object | null>(null);
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const getUser = await AsyncLocalStorage.getItem("userData");
        const parseUser = JSON.parse(getUser!)
        setUserFromStorage(parseUser);
        console.log(parseUser)
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
    getUserFromStorage()
  }, [loading]);
console.log(userFromStorage)

  return userFromStorage && !loading ? (
    <Outlet/>
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

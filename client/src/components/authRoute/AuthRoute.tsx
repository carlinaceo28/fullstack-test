import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AsyncLocalStorage } from "../../util/AsyncLocalStorage";

export const AuthRoute = () => {
  const location = useLocation();
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      await AsyncLocalStorage.getItem("userData")
        .then(async (user) => {
          const parsedUser = JSON.parse(user!);
          setUser(parsedUser);
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getUser();
  }, []);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import NotFound from "../../pages/notFound/NotFound";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, persist } = useAuth();

  useEffect(() => {
    isAuthenticated && persist && setIsLoading(false);
  }, []);
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(persist)}`);
  }, [isLoading]);

  return <>{persist ? <Outlet /> : isLoading ? <NotFound /> : <Outlet />}</>;
};
export default PersistLogin;

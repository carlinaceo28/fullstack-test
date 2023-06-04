import { useEffect, useState } from "react";
import { AsyncLocalStorage } from "../../util/AsyncLocalStorage";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await AsyncLocalStorage.getItem("userData")
        .then((user) => {
          const parserUser = user ? JSON.parse(user!) : null;
          setUser(parserUser);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      window.location.reload();
    }
  }, [isLoading]);

  return (
    <>
      <h1>Redirecionando</h1>
    </>
  );
};

export default NotFound;

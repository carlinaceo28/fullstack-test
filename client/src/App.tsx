import { useState, useEffect } from "react";
import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, BrowserRouter, Routes, redirect } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import CadastrarAluno from "./pages/cadastrarAluno/CadastrarAluno";
import RemoverAluno from "./pages/removerAluno/RemoverAluno";
import EditarAluno from "./pages/editarAluno/EditarAluno";
import Metricas from "./pages/metricas/Metricas";
import { AuthRoute } from "./components/authRoute/AuthRoute";
import NotFound from "./pages/notFound/NotFound";
import { AsyncLocalStorage } from "./util/AsyncLocalStorage";

function App() {
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

  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<AuthRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route element={<AuthRoute />}>
              <Route path="/cadastrarAluno" element={<CadastrarAluno />} />
            </Route>

            <Route element={<AuthRoute />}>
              <Route path="/removerAluno" element={<RemoverAluno />} />
            </Route>

            <Route element={<AuthRoute />}>
              <Route path="/editarAluno" element={<EditarAluno />} />
            </Route>

            <Route element={<AuthRoute />}>
              <Route path="/minhasMetricas" element={<Metricas />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;

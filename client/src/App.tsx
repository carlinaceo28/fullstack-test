import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import CadastrarAluno from "./pages/cadastrarAluno/CadastrarAluno";
import RemoverAluno from "./pages/removerAluno/RemoverAluno";
import EditarAluno from "./pages/editarAluno/EditarAluno";
import Metricas from "./pages/metricas/Metricas";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import { AuthRoute } from "./components/authRoute/AuthRoute";

function App() {
  // const { isAuthenticated } = useAuth();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUserFromStorage = () => {
  //     new Promise((resolve) => {
  //       resolve(localStorage.getItem("userData"));
  //     })
  //       .then((res: any) => {
  //         setUser(JSON.parse(res));
  //       })
  //       .catch((error) => {
  //         console.error("error", error);
  //       });
  //   };

  //   getUserFromStorage();
  // }, [isAuthenticated]);

  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/loading" element={<h1>Carregando...</h1>} />

            <Route element={<AuthRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cadastrarAluno" element={<CadastrarAluno />} />
              <Route path="/removerAluno" element={<RemoverAluno />} />
              <Route path="/editarAluno" element={<EditarAluno />} />
              <Route path="/minhasMetricas" element={<Metricas />} />
            </Route>
            <Route path="*" element={<h1>O que você está buscando...?</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;

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

function App() {
  const [user, setUser] = useState();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            {isAuthenticated || user ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/cadastrarAluno" element={<CadastrarAluno />} />
                <Route path="/removerAluno" element={<RemoverAluno />} />
                <Route path="/editarAluno" element={<EditarAluno />} />
                <Route path="/minhasMetricas" element={<Metricas />} />
              </>
            ) : (
              <Route path="/unauthorized" element={<h1>Sem autorização</h1>} />
            )}

            <Route path="*" element={<h1>O que você está buscando...?</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;

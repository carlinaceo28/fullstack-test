import { useEffect } from "react";
import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import CadastrarAluno from "./pages/cadastrarAluno/CadastrarAluno";
import RemoverAluno from "./pages/removerAluno/RemoverAluno";
import EditarAluno from "./pages/editarAluno/EditarAluno";
import Metricas from "./pages/metricas/Metricas";
import { AuthRoute } from "./components/authRoute/AuthRoute";
import NotFound from "./pages/notFound/NotFound";
import { AsyncLocalStorage } from "./util/AsyncLocalStorage"
function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const getStoredUser = async () => {
      await AsyncLocalStorage.getItem("userData")
      .then((user) => {
        const parseUser = JSON.parse(user!);
        if (parseUser) {
          navigate("/home");
        };
      })
      .catch((error) => console.error("Erro ao obter user no storage"));
    };
    getStoredUser();
  }, [])
  
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

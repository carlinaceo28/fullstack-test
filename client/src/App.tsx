import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth";
import { AuthRoute } from "./components/authRoute/AuthRoute";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import CadastrarAluno from "./pages/cadastrarAluno/CadastrarAluno";
import RemoverAluno from "./pages/removerAluno/RemoverAluno";

function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/home/:_id" element={<Home />} />
            <Route path="/cadastrarAluno/:_id" element={<CadastrarAluno />} />
            <Route path="/removerAluno/:_id" element={<RemoverAluno />} />
            <Route path="*" element={<h1>Nada</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;

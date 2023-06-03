import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdAlternateEmail } from "react-icons/md";

interface IUser {
  userName: string;
  userEmail: string;
  _id: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { login } = useAuth();
  const navigate = useNavigate();

  const signup = async () => {
    await axios
      .post("http://localhost:5000/login", {
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        login(true);
        localStorage.setItem("userData", JSON.stringify(res?.data));
      })
      .then(() => {
        navigate(`/home`);
      })
      .catch((error) => {
        console.error("Erro ao logar", error);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <main className={styles.loginContainerMain}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdAlternateEmail color="gray.300" />
          </InputLeftElement>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="tel"
            placeholder="Email"
          />
        </InputGroup>

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          backgroundColor={"#ea4c89"}
          size="xs"
          padding={6}
          color={"#ffffff"}
          width={"100%"}
          fontSize={"medium"}
          onClick={signup}
        >
          Login
        </Button>
      </main>
    </div>
  );
};

export default Login;

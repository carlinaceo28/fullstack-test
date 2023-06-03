import { useState } from "react";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import { Button, Input, Stack } from "@chakra-ui/react";
import axios from "axios";

const CadastrarAluno = () => {
  const [nome, setNome] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");

  const handleChange = (event: any) => {
    const formattedValue = formatInputValue(event.target.value);
    setDataDeNascimento(formattedValue);
  };

  const formatInputValue = (value: any) => {
    let formattedValue = value.replace(/\D/g, "").slice(0, 8);
    if (formattedValue.length >= 2) {
      formattedValue = formattedValue.replace(/^(\d{2})/, "$1/");
    }
    if (formattedValue.length >= 5) {
      formattedValue = formattedValue.replace(/^(\d{2})\/(\d{2})/, "$1/$2/");
    }
    return formattedValue;
  };

  const cadastrarAluno = async () => {
    new Promise((resolve) => {
      resolve(localStorage.getItem("userData"));
    })
      .then(async (response: any) => {
        const parsedInfoFromStorage = JSON.parse(response);
        await axios
          .post(
            "http://localhost:5000/registrarAluno",
            { nome: nome, dataDeNascimento: dataDeNascimento },
            {
              headers: {
                Authorization: "Bearer " + parsedInfoFromStorage?.token,
              },
            }
          )
          .then((res) => {
            setNome("");
            setDataDeNascimento("");
            console.log(res.data);
          })
          .catch((error) => {
            console.error("Erro ao cadastrar aluno(a)", error);
          });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleBlur = () => {};
  return (
    <div>
      <HomeHeader />

      <Stack spacing={3}>
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do aluno"
          size="lg"
        />
        <Input
          value={dataDeNascimento}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          type="text"
          placeholder="dd/mm/yy"
        />
        <Button
          backgroundColor={"#ea4c89"}
          size="xs"
          padding={6}
          color={"#ffffff"}
          width={"100%"}
          fontSize={"medium"}
          onClick={cadastrarAluno}
        >
          Cadastrar
        </Button>
      </Stack>
    </div>
  );
};

export default CadastrarAluno;

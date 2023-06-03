import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);
interface IAlunoData {
  faixa: string;
  quantidade: number;
  porcentagem: number;
}
const Chart = () => {
  const [alunos, setAlunos] = useState<IAlunoData[]>([]);

  useEffect(() => {
    const getFilteredData = () => {
      new Promise((resolve, reject) => {
        resolve(localStorage.getItem("userData"));
      })
        .then(async (response: any) => {
          const parsedInfoFromStorage = JSON.parse(response);

          await axios
            .get("http://localhost:5000/alunosFiltrados", {
              headers: {
                Authorization: "Bearer " + parsedInfoFromStorage?.token,
              },
            })
            .then((res) => {
              setAlunos(res?.data);
            })
            .catch((error) => {
              console.error(
                "Erro ao buscar alunos filtrados",
                error?.response?.message
              );
            });
        })
        .catch((error) => {
          console.error("error", error);
        });
    };

    getFilteredData();
  }, []);

  const data = {
    labels: [
      "Entre 18 a 25 anos ",
      "Entre 26 a 35 anos ",
      "Entre 36 a 45 anos",
      "Entre 46 anos a 55 anos",
      "Maiores que 55 anos",
    ],

    datasets: [
      {
        label: "Quantidade",
        data: alunos.map((aluno) => aluno?.quantidade),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;

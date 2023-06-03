import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const alunos = [
  { name: "Eva", dateOfBirth: "9/1/2010" },
  { name: "Eva", dateOfBirth: "26/5/1996" },
  { name: "Gina", dateOfBirth: "17/3/2011" },
  { name: "Harry", dateOfBirth: "8/2/2011" },
  { name: "Charlie", dateOfBirth: "16/9/1995" },
  { name: "Harry", dateOfBirth: "3/9/2006" },
  { name: "Frank", dateOfBirth: "14/3/2009" },
  { name: "Bob", dateOfBirth: "20/3/2001" },
  { name: "Ivy", dateOfBirth: "3/11/1996" },
  { name: "Ivy", dateOfBirth: "12/1/2004" },
];

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
      data: [12, 19, 3, 5, 2],
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
const Chart = () => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const options = {
  maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      align: 'right',
      labels: {
        align: 'start'
      }
    },
    title: {
      display: true,
      text: 'Tipos de atendimentos realizados',
    }
  }
};

export const data = {
  labels: [
    "Atendimento: PARA MIM MESMO",
    "Atendimento: PARA FAMILIAR",

    "Dependentes Químicos",
    "Transtornos Mentais",
    "Dependentes Químicos + Transtornos Mentais",
    "Casa de repouso",
    "Moradia Assistida",

    "Homen",
    "Mulher",

    "Consegue se deslocar até a unidade",
    "Não consegue se deslocar até a unidade",

    "Possui Convênio",
    "Não Possui Convênio"

  ],
  datasets: [
    {
      data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16],
      backgroundColor: [
        'rgba(210, 110, 129, 0.8)',
        'rgba(230, 168, 255, 0.4)',

        'rgba(112, 145, 67, 0.8)',
        'rgba(212, 53, 130, 0.1)',
        'rgba(106, 186, 255, 0.6)',
        'rgba(206, 2, 77, 0.9)',
        'rgba(181, 73, 91, 0.5)',

        'rgba(98, 157, 123, 0.8)',
        'rgba(21, 142, 19, 0.2)',

        'rgba(139, 89, 211, 0.1)',
        'rgba(210, 218, 20, 0.9)',

        'rgba(189, 59, 153, 0.8)',
        'rgba(6, 75, 91, 0.1)'
      ]
    }
  ],
};

export function ChartTiposDeAtendimento() {
  
  console.log("aqui....");

  return <Pie data={data} options={options} width={800} height={450} />;
}

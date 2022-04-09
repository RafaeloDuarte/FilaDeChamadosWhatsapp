import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale);

const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Total de atendimentos por Atendente',
        }
    }
};

export const data = {
    labels: ["Kamila", "Lucas", "Jonnas", "Nathalia", "Vera"],
    datasets: [
        {
            label: 'Total de atendimentos por Atendente',
            data: [35, 29, 5, 5, 20],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }
    ],
};

export function ChartAtendimentosPorAtendente() {
    return <Bar data={data} options={options} width={800} height={450} />;
}

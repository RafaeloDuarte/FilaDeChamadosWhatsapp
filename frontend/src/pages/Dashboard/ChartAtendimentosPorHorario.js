import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Total de atendimentos por Horário',
        }
    }
};

export const data = {
    labels: ["08:00", "10:00", "13:00", "17:00", "22:00", "23:00"],
    datasets: [
        {
            label: 'Atendimento por Horário',
            data: [1, 1, 2, 7, 2],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }
    ],
};

export function ChartAtendimentosPorHorario() {
    return <Line data={data} options={options} width={800} height={450} />;
}

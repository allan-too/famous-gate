import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface OccupancyChartProps {
  data: {
    date: string;
    occupancy: number;
  }[];
  className?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ data, className = '' }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Occupancy Rate',
        data: data.map(item => item.occupancy),
        borderColor: '#1956EB',
        backgroundColor: 'rgba(25, 86, 235, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#1956EB',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1E293B',
        bodyColor: '#334155',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `Occupancy: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
          color: '#64748B',
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <Card title="Occupancy Rate" className={className}>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default OccupancyChart;
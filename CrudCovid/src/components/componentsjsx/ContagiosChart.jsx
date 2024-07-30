// src/components/ContagiosChart.js
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ContagiosChart = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    fetchContagiosData();
  }, []);

  const fetchContagiosData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contagios');
      const contagios = response.data;

      // Datos para la gráfica de líneas
      const lineLabels = [];
      const lineData = [];
      const contagiosByDate = {};

      contagios.forEach(contagio => {
        const date = new Date(contagio.fecha_registro).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short'
        });
        if (!contagiosByDate[date]) {
          contagiosByDate[date] = 0;
        }
        contagiosByDate[date] += 1;
      });

      for (const date in contagiosByDate) {
        lineLabels.push(date);
        lineData.push(contagiosByDate[date]);
      }

      // Datos para la gráfica de barras
      const ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
      const contagiosByAgeRange = {};

      ageRanges.forEach(range => contagiosByAgeRange[range] = 0);

      contagios.forEach(contagio => {
        const age = contagio.edad; // Assuming 'edad' is the age field
        let range;

        if (age >= 70) range = '70+';
        else if (age >= 60) range = '60-69';
        else if (age >= 50) range = '50-59';
        else if (age >= 40) range = '40-49';
        else if (age >= 30) range = '30-39';
        else if (age >= 20) range = '20-29';
        else if (age >= 10) range = '10-19';
        else range = '0-9';

        contagiosByAgeRange[range] += 1;
      });

      const barLabels = ageRanges;
      const barData = ageRanges.map(range => contagiosByAgeRange[range]);

      if (lineLabels.length > 0 && lineData.length > 0) {
        setLineChartData({
          labels: lineLabels,
          datasets: [
            {
              label: 'Contagios de COVID',
              data: lineData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      }

      if (barLabels.length > 0 && barData.length > 0) {
        setBarChartData({
          labels: barLabels,
          datasets: [
            {
              label: 'Contagios por Rango de Edad',
              data: barData,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching contagios data:', error);
    }
  };

  return (
    <div>
      <h2>Contagios de COVID</h2>
      <div>
        {lineChartData ? <Line data={lineChartData} /> : <p>Cargando datos para la gráfica de líneas...</p>}
      </div>
      <div>
        {barChartData ? <Bar data={barChartData} /> : <p>Cargando datos para la gráfica de barras...</p>}
      </div>
    </div>
  );
};

export default ContagiosChart;

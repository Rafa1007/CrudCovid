 // Importar las dependencias necesarias de React, Axios y Chart.js
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js que se usarán en las gráficas
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ContagiosChart = () => {
  // Definir estados locales para almacenar los datos de las gráficas
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  // Utilizar useEffect para llamar a la función fetchContagiosData cuando el componente se monta
  useEffect(() => {
    fetchContagiosData();
  }, []);

  // Función para obtener datos de contagios desde el backend
  const fetchContagiosData = async () => {
    try {
      // Realizar una solicitud GET a la API para obtener los datos de contagios
      const response = await axios.get('http://localhost:3000/contagios');
      const contagios = response.data;

      // Preparar los datos para la gráfica de líneas
      const lineLabels = []; // Etiquetas del eje X
      const lineData = []; // Datos del eje Y
      const contagiosByDate = {}; // Objeto para contar contagios por fecha

      // Procesar cada contagio para contar los casos por fecha
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

      // Rellenar las etiquetas y datos de la gráfica de líneas
      for (const date in contagiosByDate) {
        lineLabels.push(date);
        lineData.push(contagiosByDate[date]);
      }

      // Preparar los datos para la gráfica de barras
      const ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
      const contagiosByAgeRange = {};

      // Inicializar el contador de contagios por rango de edad
      ageRanges.forEach(range => contagiosByAgeRange[range] = 0);

      // Procesar cada contagio para contar los casos por rango de edad
      contagios.forEach(contagio => {
        const age = contagio.edad; // Suponiendo que 'edad' es el campo de la edad
        let range;

        // Determinar el rango de edad correspondiente
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

      // Etiquetas y datos para la gráfica de barras
      const barLabels = ageRanges;
      const barData = ageRanges.map(range => contagiosByAgeRange[range]);

      // Actualizar el estado con los datos de la gráfica de líneas
      if (lineLabels.length > 0 && lineData.length > 0) {
        setLineChartData({
          labels: lineLabels,
          datasets: [
            {
              label: 'Contagios de COVID',
              data: lineData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        });
      }

      // Actualizar el estado con los datos de la gráfica de barras
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
      // Manejar errores en la solicitud
      console.error('Error fetching contagios data:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Contagios de COVID</h2>
      <div style={{ marginBottom: '10px' }}>
        {/* Mostrar la gráfica de líneas si hay datos, de lo contrario mostrar un mensaje de carga */}
        {lineChartData ? (
          <Line 
            data={lineChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Contagios de COVID a lo Largo del Tiempo',
                  font: {
                    size: 18,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Fecha',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Número de Contagios',
                  },
                },
              },
            }}
          />
        ) : (
          <p>Cargando datos para la gráfica de líneas...</p>
        )}
      </div>
      <div>
        {/* Mostrar la gráfica de barras si hay datos, de lo contrario mostrar un mensaje de carga */}
        {barChartData ? (
          <Bar 
            data={barChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Contagios de COVID por Rango de Edad',
                  font: {
                    size: 18,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Rango de Edad',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Número de Contagios',
                  },
                },
              },
            }}
          />
        ) : (
          <p>Cargando datos para la gráfica de barras...</p>
        )}
      </div>
    </div>
  );
};

export default ContagiosChart;

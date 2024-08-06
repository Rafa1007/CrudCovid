// Importar las dependencias necesarias de React, Axios y Chart.js
import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrar los componentes de Chart.js que se usarán en las gráficas
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const ContagiosChart = () => {
  // Definir estados locales para almacenar los datos de las gráficas
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [stateBarChartData, setStateBarChartData] = useState(null);
  const [genderPieChartData, setGenderPieChartData] = useState(null);

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

      // Preparar los datos para la gráfica de barras por estado
      const contagiosByState = {};
      contagios.forEach(contagio => {
        const state = contagio.estado; // Suponiendo que 'estado' es el campo del estado
        if (!contagiosByState[state]) {
          contagiosByState[state] = 0;
        }
        contagiosByState[state] += 1;
      });

      // Ordenar los estados por el número de contagios y tomar los 10 con más contagios
      const sortedStates = Object.keys(contagiosByState).sort((a, b) => contagiosByState[b] - contagiosByState[a]);
      const topStates = sortedStates.slice(0, 10);
      const stateLabels = topStates;
      const stateData = topStates.map(state => contagiosByState[state]);

      // Preparar los datos para la gráfica de pastel por género
      const contagiosByGender = { 'Hombres': 0, 'Mujeres': 0 };
      contagios.forEach(contagio => {
        const gender = contagio.sexo; // Suponiendo que 'genero' es el campo del género
        if (gender === 'Hombre') {
          contagiosByGender['Hombres'] += 1;
        } else if (gender === 'Mujer') {
          contagiosByGender['Mujeres'] += 1;
        }
      });

      // Etiquetas y datos para la gráfica de pastel
      const genderLabels = Object.keys(contagiosByGender);
      const genderData = Object.values(contagiosByGender);

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

      // Actualizar el estado con los datos de la gráfica de barras por estado
      if (stateLabels.length > 0 && stateData.length > 0) {
        setStateBarChartData({
          labels: stateLabels,
          datasets: [
            {
              label: 'Contagios por Estado',
              data: stateData,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        });
      }

      // Actualizar el estado con los datos de la gráfica de pastel por género
      if (genderLabels.length > 0 && genderData.length > 0) {
        setGenderPieChartData({
          labels: genderLabels,
          datasets: [
            {
              label: 'Contagios por Género',
              data: genderData,
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Azul para hombres y rosa para mujeres
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'], // Azul para hombres y rosa para mujeres
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%', height: '400px' }}>
            {/* Mostrar la gráfica de líneas si hay datos, de lo contrario mostrar un mensaje */}
            {lineChartData ? (
              <Line data={lineChartData} />
            ) : (
              <p>Cargando datos de contagios...</p>
            )}
          </div>
          <div style={{ width: '48%', height: '400px' }}>
            {/* Mostrar la gráfica de barras si hay datos, de lo contrario mostrar un mensaje */}
            {barChartData ? (
              <Bar data={barChartData} />
            ) : (
              <p>Cargando datos de contagios...</p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%', height: '400px' }}>
            {/* Mostrar la gráfica de barras por estado si hay datos, de lo contrario mostrar un mensaje */}
            {stateBarChartData ? (
              <Bar data={stateBarChartData} />
            ) : (
              <p>Cargando datos de contagios por estado...</p>
            )}
          </div>
          <div style={{ width: '48%', height: '400px' }}>
            {/* Mostrar la gráfica de pastel por género si hay datos, de lo contrario mostrar un mensaje */}
            {genderPieChartData ? (
              <Pie data={genderPieChartData} />
            ) : (
              <p>Cargando datos de contagios por género...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContagiosChart;

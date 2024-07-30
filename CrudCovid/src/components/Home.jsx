// src/pages/Home.js
import React from 'react';
import ContagiosChart from '../components/componentsjsx/ContagiosChart';

const Home = () => {
  return (
    <div>
        <div>
            <div>
            <ContagiosChart />
            </div>
        </div>
      <h1>Grafica de contagios</h1>
    </div>
  );
};

export default Home;

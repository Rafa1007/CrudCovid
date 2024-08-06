// src/pages/Home.js
import React from 'react';
import ContagiosChart from '../components/componentsjsx/ContagiosChart';

const Home = () => {
  return (
    <div>
        <h1>Graficas de contagios</h1>
        <div>
            <div>
            <ContagiosChart />
            </div>
        </div>
    </div>
  );
};

export default Home;

// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de crear este archivo para los estilos

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
        <li className="nav-item"><Link to="/"></Link></li>
          <li className="nav-item"><Link to="/home">Inicio</Link></li>
          <li className="nav-item"><Link to="/contagios">Contagios</Link></li>
          <li className="nav-item"><Link to="/hospitalizados">Hospitalizados</Link></li>
          <li className="nav-item"><Link to="/recuperados">Recuperados</Link></li>
          <li className="nav-item"><Link to="/fallecidos">Fallecidos</Link></li>
          <li className="nav-item"><Link to="/perfil">Perfil</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

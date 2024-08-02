// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Asegúrate de instalar react-icons
import './Header.css'; // Asegúrate de crear este archivo para los estilos

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/home">Inicio</Link></li>
          <li className="nav-item"><Link to="/contagios">Contagios</Link></li>
          <li className="nav-item"><Link to="/hospitalizados">Hospitalizados</Link></li>
          <li className="nav-item"><Link to="/recuperados">Recuperados</Link></li>
          <li className="nav-item"><Link to="/fallecidos">Fallecidos</Link></li>
          <li className="nav-item">
            <div className="profile-menu">
              <FaUserCircle className="profile-icon" />
              <div className="profile-info">
                <span>{username}</span>
                <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

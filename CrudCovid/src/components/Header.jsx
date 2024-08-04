import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <img src="https://lh5.googleusercontent.com/proxy/Sli3etZ2i2ZrKdmV703KmpyCY3VMpHWymH8zC13HxL-uomrxTRhfSFTNPQ-QQZilem9OENMERIyULQI2LmiyP131lPZsb5J0d_DoCJAUog" alt="Logo" className="logo" />
      <div className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/home">Inicio</Link></li>
          <li className="nav-item"><Link to="/contagios">Contagios</Link></li>
          <li className="nav-item"><Link to="/hospitalizados">Hospitalizados</Link></li>
          <li className="nav-item"><Link to="/recuperados">Recuperados</Link></li>
          <li className="nav-item"><Link to="/fallecidos">Fallecidos</Link></li>
        </ul>
  
        <div className="profile-menu" aria-haspopup="true">
          <FaUserCircle className="profile-icon" aria-hidden="true" />
          <div className="profile-info">
            <span>{username}</span>
            <button className="logout-button" onClick={onLogout} aria-label="Cerrar sesión">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

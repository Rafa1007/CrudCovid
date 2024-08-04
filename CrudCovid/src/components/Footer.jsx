import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <img src="https://lh5.googleusercontent.com/proxy/Sli3etZ2i2ZrKdmV703KmpyCY3VMpHWymH8zC13HxL-uomrxTRhfSFTNPQ-QQZilem9OENMERIyULQI2LmiyP131lPZsb5J0d_DoCJAUog" alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-column">
          <h1>Enlaces</h1>
          <ul>
            <li><a href="#">Participa</a></li>
            <li><a href="#">Datos</a></li>
            <li><a href="#">Publicaciones Oficiales</a></li>
            <li><a href="#">Portal de Obligaciones de Transparencia</a></li>
            <li><a href="#">Sistema Infomex</a></li>
            <li><a href="#">INAI</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h1>¿Qué es gob.mx?</h1>
          <p>Es el portal único de trámites, información y participación ciudadana.</p>
          <ul>
            <li><a href="#">Declaración de accesibilidad</a></li>
            <li><a href="#">Aviso de privacidad integral</a></li>
            <li><a href="#">Aviso de privacidad simplificado</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de seguridad</a></li>
            <li><a href="#">Marco Jurídico</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

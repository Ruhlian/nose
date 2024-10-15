import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import mainLogo from '../../assets/images/logo1.png';
import secondaryLogo from '../../assets/images/logo-azul.png';
import contact from '../../assets/icons/contact.png';
import instagram from '../../assets/icons/logotipo-de-instagram.png';
import linkedin from '../../assets/icons/linkedin.png';
import italia from '../../assets/Categorys/italia.png';
import india from '../../assets/Categorys/india.png';
import corea from '../../assets/Categorys/bandera.png';
import malasia from '../../assets/Categorys/malasia.png';
import china from '../../assets/Categorys/china.png';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Obtener el año actual dinámicamente

    return (
        <div className="footer">
            <div className="footer-logos__container">
                <img className="main-logo" src={mainLogo} alt="Logo ENTQUIM"></img>
                <img className="secondary-logo" src={secondaryLogo} alt="Logo ENTQUIM"></img>
            

                <div className="footer__socials">
                    <Link><img src={contact} alt="Whatsapp"></img></Link>
                    <Link><img src={instagram} alt="Instagram"></img></Link>
                    <Link><img src={linkedin} alt="LinkedIn"></img></Link>
                </div>
            </div>
            
            <div className="footer__content">
            <div className="footer__information">
                <h3>Información</h3>
                <Link to={"/AccountManage"}>Mi cuenta</Link>
                <Link>Términos y Condiciones</Link>
                <Link>Pólitica de Tratamiento de Protección de Datos</Link>
            </div>

            <div className="footer__about">
                <h3>Conócenos</h3>
                <Link to={'/Nosotros'}>Quienes somos</Link>
            </div>

            <div className="footer__contact">
                <h3>Contáctanos</h3>
                <Link to={"/Contacto"}>Enviar Correo</Link>
                <Link>+57 3106189254</Link>
                <Link>Transversal 106 #77-14</Link>
            </div>

            <div className="footer__suppliers">
                <h3>Proveedores</h3>
                <img className="italy" alt="Italia" src={italia}></img>
                <img className="india" alt="India" src={india}></img>
                <img className="corea" alt="Corea del Sur" src={corea}></img>
                <img className="malasia" alt="Malasia" src={malasia}></img>
                <img className="china" alt="China" src={china}></img>
            </div>
            </div>
            <div className="footer__copyright">
                © {currentYear} ENTQUIM. Todos los derechos reservados.
            </div>
        </div>
    );
};

export default Footer;

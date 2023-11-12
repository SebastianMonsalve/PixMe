import { Link } from "react-router-dom";
import { contextProvider } from "./ContextApi";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { section, setSection } = contextProvider();
  const SingUp = () => {
    setSection(null);
    return <Navigate to={"/login"} replace />;
  };
  return (
    <div className={isMenuOpen ? "Sidebar SidebarVH" : "Sidebar"}>
      <button
        className="icon-menu-open"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <i className="fa-solid fa-bars" />
      </button>
      <li className={isMenuOpen ? "closed" : "logo-sideclosed"}>
        <img
          className="icon-sideclosed"
          src="/src/imagesLogin/LogoPIXME.png"
          draggable="false"
        />
        <span className="text-logo-sideclosed">PixMe</span>
      </li>
      <ul className={isMenuOpen ? null : "none"}>
        <li className="li-logo">
          <Link to={"/home"} className="btn-sidebar-home logo">
            <span className="icon">
              <img src="/src/imagesLogin/LogoPIXME.png" draggable="false" />
            </span>
            <span className="text-logo">PixMe</span>
          </Link>
        </li>
        <li>
          <Link to={"/home"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-house" />
            </span>
            <span className="text">Inicio</span>
          </Link>
        </li>
        <li>
          <Link to={"/createimage"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-arrow-up-from-bracket" />
            </span>
            <span className="text">Subir Multimedia</span>
          </Link>
        </li>
        <li>
          <Link to={"/photos"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-images" />
            </span>
            <span className="text">Fotos</span>
          </Link>
        </li>
        <li>
          <Link to={"/videos"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-clapperboard" />
            </span>
            <span className="text">Videos</span>
          </Link>
        </li>
        <li>
          <Link to={"/favorite"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-heart" />
            </span>
            <span className="text">Favoritos</span>
          </Link>
        </li>
        <li>
          <Link to={"/dump"} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-trash" />
            </span>
            <span className="text">Papelera</span>
          </Link>
        </li>
        <li>
          <Link to={`/config/${section[0]._id}`} className="btn-sidebar-home">
            <span className="icon">
              <i className="fa-solid fa-gear" />
            </span>
            <span className="text">Configuración</span>
          </Link>
        </li>
        <div className="bottom">
          <li>
            <Link
              className="btn-sidebar-home"
              onClick={() => {
                SingUp();
              }}
            >
              <span className="icon">
                <i className="fa-solid fa-right-from-bracket" />
              </span>
              <span className="text">Cerrar Sesión</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Nav;

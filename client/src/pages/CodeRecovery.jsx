import React, { useState } from "react";
import { contextProvider } from "../components/ContextApi";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";

const CodeRecovery = () => {
  const navigate = useNavigate();
  const [invalideCode, setInvalideCode] = useState(false);
  const { codeValidation, setCodeValidation } = contextProvider();

  const [codeInput, setCodeInput] = useState("");
  const handleCodeChange = (event) => {
    setCodeInput(event.target.value);
  };
  const handleEventClick = () => {
    if (codeValidation.code == codeInput) {
      navigate("/recoverypassword");
    } else {
      setCodeInput("");
      setInvalideCode(true);
    }
  };
  return (
    <div className="Back">
      <div className="collageCreate">
        <div className="container1Create">
          <div className="dCreate">
            <img src="/src/imagesLogin/image1.jpg" alt="" draggable="false" />
          </div>
          <div className="dCreate"></div>
          <div className="dCreate">
            <img src="/src/imagesLogin/image3.jpg" alt="" draggable="false" />
          </div>
        </div>
        <div className="container2Create">
          <div className="dCreate">
            <img src="/src/imagesLogin/image4.jpg" alt="" draggable="false" />
          </div>
          <div className="dCreate">
            <img src="/src/imagesLogin/image5.jpg" alt="" draggable="false" />
          </div>
        </div>
        <div className="container3Create">
          <div className="dCreate">
            <img src="/src/imagesLogin/image8.jpg" alt="" draggable="false" />
          </div>
          <div className="dCreate"></div>
          <div className="dCreate">
            <img src="/src/imagesLogin/image6.jpg" alt="" draggable="false" />
          </div>
        </div>
      </div>
      <div className="Pag">
        <div className="BigLogo">
          <img
            src="/src/imagesLogin/LogoPIXME.png"
            alt="PixMe Logo"
            draggable="false"
          />
        </div>
        <h2 className="Tittle">Verificar el codigo</h2>
        <p className="info">
          Por favor, ingresa el código de verificación que has recibido en tu
          correo electrónico para continuar con el proceso de recuperación de tu
          cuenta.
        </p>
        <form className="form">
          <input
            onChange={handleCodeChange}
            placeholder="Codigo"
            className="Input-form"
            // type="number"
            name="code"
            value={codeInput}
          />
          <div className="btn-loading">
            <button className="btn" type="button" onClick={handleEventClick}>
              <i className="fa-solid fa-file-code" />
              Verificar Codigo
            </button>
          </div>
          {invalideCode && <p className="alert3">Codigo incorrecto</p>}
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CodeRecovery;

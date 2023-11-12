import React, { useState } from "react";
import axios from "axios";
import { contextProvider } from "../components/ContextApi";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";

const PageRecoveryAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { codeValidation, setCodeValidation } = contextProvider();
  const [isNotFormat, setIsNotFormat] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleEventClick = async () => {
    if (!/^\S+@\S+$/.test(email)) {
      setEmail("");
      setIsLoading(false);
      setIsNotFormat(true);
    } else {
      setIsLoading(!isLoading);
      const res = await axios
        .post("http://localhost:4000/api/users/recoveryemail/", {
          email: email,
        })
        .then((response) => {
          if (response.data === "Correo no existente") {
            setEmail("");
            setIsLoading(false);
            setIsNotFormat(true);
          } else {
            setCodeValidation(response.data);
            navigate("/recoverycode");
          }
        });
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
          <img src="/src/imagesLogin/LogoPIXME.png" draggable="false" />
        </div>
        <h2 className="Tittle">Restablecer Contraseña</h2>
        <p className="info">
          Por favor ingresa tu dirección de correo electrónico a continuación.
          Te enviaremos un código de verificación para restablecer tu
          contraseña.
        </p>
        <form className="form">
          <input
            onChange={handleEmailChange}
            className="Input-form"
            placeholder="Correo"
            type="email"
            name="email"
            value={email}
          />
          <div className="btn-loading">
            {!isLoading && (
              <button className="btn" type="button" onClick={handleEventClick}>
                <i className="fa-solid fa-envelope-circle-check" />
                Verificar correo
              </button>
            )}
            {isLoading && <Loading />}
          </div>
          {isNotFormat && <p className="alert3">Correo no valido</p>}
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PageRecoveryAccount;

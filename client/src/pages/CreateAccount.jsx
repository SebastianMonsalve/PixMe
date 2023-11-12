import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../components/Loading";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);
  const [isNotDisponible, setIsNotDisponible] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (watch("password", "") !== watch("confirmPassword", "")) {
      setIsNotMatchPassword(true);
    } else {
      setIsLoading(!isLoading);
      const res = axios
        .post("http://localhost:4000/api/users/", data)
        .then((response) => {
          if (response.data === "Correo ya registrado") {
            setIsLoading(false);
            setIsNotDisponible(true);
          } else {
            navigate("/login");
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
        <h2 className="Tittle">Crear cuenta</h2>
        <p className="info">
          ¡Bienvenido! Completa el formulario para crear tu cuenta. Todos los
          campos son obligatorios y la contraseña debe tener al menos 6
          caracteres. Recuerda que la dirección de correo no se puede cambiar
          posteriormente.
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Input-form"
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true, maxLength: 80 })}
          />
          <input
            className="Input-form"
            type="text"
            placeholder="Correo"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <input
            className="Input-form"
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <input
            className="Input-form"
            type="password"
            placeholder="Confirmar Contraseña"
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <div className="btn-loading">
            {!isLoading && (
              <button className="btn" type="submit">
                <i className="fa-solid fa-file-import" />
                Crear cuenta
              </button>
            )}
            {isLoading && <Loading />}
          </div>
          <p className="alert1">{errors.email && "Correo Invalido"}</p>
          <p className="alert2">{errors.password && "Contraseña Invalida"}</p>
          <p className="alert3">
            {errors.confirmPassword && "Las contraseñas no coinciden"}
            {isNotMatchPassword && "Las contraseñas no coinciden"}
            {isNotDisponible && "Correo ya registrado"}
          </p>
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

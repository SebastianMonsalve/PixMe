import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { contextProvider } from "../components/contextApi";
import Loading from "../components/Loading";

const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setSection, section, setImages } = contextProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(!isLoading);
    const res = axios
      .post("http://localhost:4000/api/users/login/", data)
      .then((response) => {
        setSection(response.data);
        if (response.data !== "Not found") {
          setImages(response.data[0].images);
        }
        setIsLoading(!isLoading);
        navigate("/home");
      });
  };

  return (
    <>
      <div className="Main">
        <div className="bar"></div>
        <div className="Photos">
          <div className="collage">
            <div className="container1">
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image1.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image2.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image3.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
            <div className="container2">
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image4.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image5.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
            <div className="container3">
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image8.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image7.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
              <div className="diamond">
                <img
                  src="/src/imagesLogin/image6.jpg"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="SideBar">
          <div className="BigLogo">
            <img src="/src/imagesLogin/LogoPIXME.png" draggable="false" />
          </div>
          <h2 className="Tittle">Iniciar sesión</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="Input-form"
              type="text"
              placeholder="Correo"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <div className="input-container">
              <input
                type={isVisiblePassword ? "text" : "password"}
                className="Input-form"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              {isVisiblePassword ? (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-solid fa-eye-slash"
                  id="password-toggle"
                />
              ) : (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-solid fa-eye"
                  id="password-toggle"
                />
              )}
            </div>

            <div className="btn-loading">
              {!isLoading && (
                <button type="submit" className="btn">
                  <i className="fa-solid fa-arrow-right" />
                  Ingresar
                </button>
              )}
              {isLoading && <Loading />}
            </div>
            <p className="alert1">{errors.email && "Correo invalido"}</p>
            <p className="alert2">{errors.password && "Contraseña invalida"}</p>
            <Link className="btn2rec" to={"/recoveryaccount"}>
              Restablecer Contraseña
            </Link>
            <Link className="btn2" to={"/createaccount"}>
              Crear una cuenta
            </Link>
          </form>
          {<p className="alert3">{section === "Not found" && section}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;

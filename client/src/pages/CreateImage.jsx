import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { contextProvider } from "../components/contextApi";
import Loading from "../components/Loading";
import { Format } from "../components/Funtions";

const CreateImage = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const { setSection, section, setImages, images } = contextProvider();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(!isLoading);
    const ImageBody = {
      name: data.name,
      image: data.image[0],
      author: section[0]._id,
    };
    const form = new FormData();
    for (let key in ImageBody) {
      form.append(key, ImageBody[key]);
    }
    const res = await axios.post("http://localhost:4000/api/images/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImages([...images, res.data]);
    setIsLoading(!isLoading);
    navigate("/home");
  };
  const inputImageValue = watch("image", "");
  useEffect(() => {
    setImageSelected(inputImageValue[0]);
  }, [inputImageValue]);
  return (
    <>
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
            {imageSelected ? (
              Format(inputImageValue[0].name) == "mp4" ||
              Format(inputImageValue[0].name) == "mov" ? (
                <video
                  src={URL.createObjectURL(imageSelected)}
                  autoPlay
                  muted
                  loop
                ></video>
              ) : (
                <img
                  draggable="false"
                  src={URL.createObjectURL(imageSelected)}
                  alt="image"
                />
              )
            ) : (
              <img src="/src/imagesLogin/LogoPIXME.png" draggable="false" />
            )}
          </div>
          <h2 className="Tittle">Subir Multimedia</h2>
          <p className="info">
            Por favor, sube una imagen o video y proporciona un título
            obligatorio.
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="Input-form"
              type="text"
              placeholder="Título de la Imagen o Video"
              {...register("name", {
                required: true,
                // maxLength: 20,
              })}
            />
            <div className="input-File">
              <input
                ref={control.register}
                type="file"
                className="File-form"
                {...register("image", {
                  required: true,
                })}
              />
              <button className="btn-add">
                <i className="fa-regular fa-image" />
                Seleccionar
              </button>
            </div>
            <div className="btn-loading">
              {!isLoading && (
                <button type="submit" className="btn">
                  <i className="fa-solid fa-cloud-arrow-up" />
                  Guardar
                </button>
              )}
              {isLoading && <Loading />}
            </div>
            <Link className="btn2" to={"/home"}>
              Regresar al home
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateImage;

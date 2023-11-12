import axios from "axios";
import { contextProvider } from "./contextApi";
import { useState } from "react";
import { Format } from "../components/Funtions";

const Menu = ({
  id,
  isOpen,
  setIsOpen,
  item,
  isDelete,
  setIsDelete,
  idDelete,
}) => {
  const { images, setImages } = contextProvider();
  const updateImage = async () => {
    if (item.isFavorite === true) {
      const res = await axios.put(
        "http://localhost:4000/api/images/" + idDelete,
        {
          isFavorite: false,
        }
      );
      setImages(
        images.map((item) => (item._id === res.data._id ? res.data : item))
      );
      setIsDelete(!isDelete);
    } else {
      const res = await axios.put(
        "http://localhost:4000/api/images/" + idDelete,
        {
          isFavorite: true,
        }
      );
      setImages(
        images.map((item) => (item._id === res.data._id ? res.data : item))
      );
      setIsDelete(!isDelete);
    }
  };
  const updateDom = () => {
    const filterImages = images.filter((item) => item._id !== id);
    setImages(filterImages);
  };
  const deletePhoto = async () => {
    const imageRemoved = await axios
      .delete("http://localhost:4000/api/images/" + idDelete)
      .then((response) => {
        setIsOpen((prevState) => ({
          ...prevState,
          isopen: !prevState.isopen,
        }));
        updateDom();
      });
  };
  const handleDownload = (urlImage) => {
    fetch(urlImage)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        {
          Format(urlImage) == "mp4" || Format(urlImage) == "mov"
            ? link.setAttribute("download", `${item.name}.${Format(urlImage)}`)
            : link.setAttribute("download", `${item.name}.${Format(urlImage)}`);
        }
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  return (
    <div className="Options">
      <ol>
        <li>
          <button
            onClick={() => {
              handleDownload(item.image.url);
              setIsDelete(!isDelete);
            }}
          >
            <span className="icon">
              <i className="fa-solid fa-download" />
            </span>
            <span className="text">Descargar</span>
          </button>
        </li>
        <li>
          <div className="btn-fav">
            <button
              onClick={() => {
                updateImage();
              }}
            >
              <span className="icon">
                {item.isFavorite ? (
                  <i className="fa-solid fa-heart-crack" />
                ) : (
                  <i className="fa-solid fa-heart" />
                )}
              </span>
              <span className="text">Favoritos</span>
            </button>
          </div>
        </li>
        <li>
          <button
            onClick={() => {
              deletePhoto();
            }}
          >
            <span className="icon">
              <i className="fa-regular fa-trash-can" />
            </span>
            <span className="text">Eliminar</span>
          </button>
        </li>
      </ol>
    </div>
  );
};

export default Menu;

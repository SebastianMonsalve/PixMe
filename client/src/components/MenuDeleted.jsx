import React from "react";
import axios from "axios";
import { contextProvider } from "./contextApi";

const MenuDeleted = ({ id }) => {
  const { dumps, setDumps, images, setImages, section } = contextProvider();
  const updateDom = () => {
    const filterImages = dumps.filter((item) => item._id !== id);
    setDumps(filterImages);
  };
  const Recovery = async (id) => {
    await axios.delete("http://localhost:4000/api/dumps/recovery/" + id);
    const res = await axios
      .get(`http://localhost:4000/api/images/?author=${section[0]._id}`)
      .then((response) => {
        setImages(response.data);
        updateDom();
      });
  };
  const deletePhoto = async () => {
    const imageRemoved = await axios
      .delete("http://localhost:4000/api/dumps/" + id)
      .then((response) => {
        updateDom();
      });
  };
  return (
    <div className="Options">
      <ol>
        <li>
          <button
            onClick={() => {
              Recovery(id);
            }}
          >
            <span className="icon">
              <i className="fa-solid fa-arrows-turn-right fa-flip-horizontal" />
            </span>
            <span className="text">Restaurar</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              deletePhoto(id);
            }}
          >
            <span className="icon">
              <i className="fa-solid fa-trash" />
            </span>
            <span className="text">Eliminar</span>
          </button>
        </li>
      </ol>
    </div>
  );
};

export default MenuDeleted;

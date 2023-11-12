import React, { useState } from "react";
import ModalImage from "./ModalImage";
import MenuDeleted from "./MenuDeleted";
import { Format } from "../components/Funtions";

const CardImageDeleted = ({ item, isOpen, setIsOpen, isModal, setIsModal }) => {
  const [isDelete, setIsDelete] = useState(false);
  const getDate = (dateBackend) => {
    const date = new Date(dateBackend);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    return `${mes}/${dia}/${ano}`;
  };
  return (
    <div className="card">
      {isDelete && <MenuDeleted id={isOpen.id} />}
      {Format(item.image.url) == "mp4" || Format(item.image.url) == "mov" ? (
        <video src={item.image.url} autoPlay muted controls loop></video>
      ) : (
        <img
          src={item.image.url}
          alt="Images"
          draggable="false"
          onClick={() => {
            setIsModal((prevState) => ({
              ...prevState,
              ismodal: !prevState.ismodal,
              image: item.image.url,
            }));
          }}
        />
      )}

      <div className="card-layer">
        <button
          className="Menu"
          onClick={() => {
            setIsOpen((prevState) => ({
              ...prevState,
              isopen: !prevState.isopen,
              id: item._id,
            }));
            setIsDelete(!isDelete);
          }}
        >
          <i className="fa-solid fa-ellipsis-vertical" />
        </button>
        <div className="fav">
          {item.isFavorite ? <i className="fa-solid fa-heart" /> : null}
        </div>
        <p className="name">{item.name}</p>
        <p className="date">{getDate(item.createdAt)}</p>
      </div>
    </div>
  );
};

export default CardImageDeleted;

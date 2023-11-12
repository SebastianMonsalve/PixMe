import { useState } from "react";
import { contextProvider } from "../components/ContextApi";
import CardImage from "../components/CardImage";
import Nav from "../components/Nav";
import ModalImage from "../components/ModalImage";

const FavoriteImages = () => {
  const { images, setImages } = contextProvider();
  const [isModal, setIsModal] = useState({
    ismodal: false,
    image: "",
  });
  const [isOpen, setIsOpen] = useState({
    isopen: false,
    id: "",
  });

  const imagesFavorite = images.filter(
    (favorite) => favorite.isFavorite === true
  );
  if (imagesFavorite.length === 0) {
    return (
      <div className="MainHome">
        <Nav />
        <div className="content">
          <div className="presentation">
            <h2 className="Tittle">
              <span>Tus </span>Favoritos
            </h2>
            <div className="line"></div>
          </div>
          <div className="Nothing">
            <img
              src="/src/imagesLogin/corazon-roto.png"
              alt=""
              draggable="false"
            />
            <h2>No tienes favoritos</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="MainHome">
      <Nav />
      <div className="content">
        <div className="presentation">
          <h2 className="Tittle">
            <span>Tus </span>Favoritos
          </h2>
          <div className="line"></div>
        </div>
        <div className="ContainerImages">
          {images.map((item) => {
            if (item.isFavorite === true) {
              return (
                <CardImage
                  isModal={isModal}
                  setIsModal={setIsModal}
                  item={item}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  key={item._id}
                  idDelete={item._id}
                />
              );
            }
          })}
        </div>
      </div>
      {isModal.ismodal && (
        <ModalImage isModal={isModal} setIsModal={setIsModal} />
      )}
    </div>
  );
};

export default FavoriteImages;

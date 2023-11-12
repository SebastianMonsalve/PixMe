import Nav from "../components/Nav";
import { useState } from "react";
import { contextProvider } from "../components/contextApi";
import CardImage from "../components/CardImage";
import ModalImage from "../components/ModalImage";
import Footer from "../components/Footer";
import { Format } from "../components/Funtions";

const Photos = () => {
  const [isModal, setIsModal] = useState({
    ismodal: false,
    image: "",
  });
  const [isOpen, setIsOpen] = useState({
    isopen: false,
    id: "",
  });
  const { images } = contextProvider();
  if (Array.isArray(images) && images.length === 0) {
    return (
      <div className="MainHome">
        <Nav />
        <div className="content">
          <div className="presentation">
            <h2 className="Tittle">
              <span>Tus </span>Fotos
            </h2>
            <div className="line"></div>
          </div>
          <div className="Nothing">
            <img src="/src/imagesLogin/camara.png" alt="" draggable="false" />
            <h2>No tienes Fotos</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const filterImages = images.filter(
    (item) =>
      Format(item.image.url) !== "mp4" && Format(item.image.url) !== "mov"
  );
  return (
    <div className="MainHome">
      <Nav />
      <div className="content">
        <div className="presentation">
          <h2 className="Tittle">
            <span>Tus </span>Fotos
          </h2>
          <div className="line"></div>
        </div>
        <div className="ContainerImages">
          {filterImages.map((item) => (
            <CardImage
              isModal={isModal}
              setIsModal={setIsModal}
              item={item}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              key={item._id}
              idDelete={item._id}
            />
          ))}
        </div>
      </div>
      <Footer />
      {isModal.ismodal && (
        <ModalImage isModal={isModal} setIsModal={setIsModal} />
      )}
    </div>
  );
};

export default Photos;

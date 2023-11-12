import React from "react";

const ModalImage = ({ isModal, setIsModal }) => {
  return (
    <div className="container-modal">
      <div className="content-modal">
        <button
          onClick={() => {
            document.body.style.overflowY = "auto";
            setIsModal((prevState) => ({
              ...prevState,
              ismodal: !prevState.ismodal,
            }));
          }}
        >
          <span className="icon">
            <i className="fa-solid fa-xmark" />
          </span>
        </button>
        <img src={isModal.image} alt="Image" draggable="false" />
      </div>
    </div>
  );
};

export default ModalImage;

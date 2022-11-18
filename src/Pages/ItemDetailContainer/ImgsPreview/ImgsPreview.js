import React, { useState } from "react";
import "./ImgsPreview.css";

const ImgsPreview = ({ imgs }) => {
  const [currentImage, setCurrentImage] = useState(imgs[0]);

  const handlingImgSelection = (index) => {
    setCurrentImage(imgs[index]);
  };

  return (
    <div className="ImgsPreview_Container">
      <div className="selection-box">
        {imgs.map((src, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                handlingImgSelection(index);
              }}
            >
              <img src={src} alt="Imagen index + 1" className="product-img" />
            </button>
          );
        })}
      </div>
      <div className="img-preview">
        <img src={currentImage} alt="Preview" />
      </div>
      <div className="span-box">
        {imgs.map((src, index) => {
          return (
            <button
              type="button"
              title={"Imagen " + (index + 1)}
              key={index}
              onClick={() => {
                handlingImgSelection(index);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default ImgsPreview;

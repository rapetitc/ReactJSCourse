import React, { useState } from "react";

const ImgsPreview = ({ imgs }) => {
  const [currentImage, setCurrentImage] = useState(imgs[0]);

  const handlingImgSelection = (index) => {
    setCurrentImage(imgs[index]);
  };

  return (
    <div className="flex w-max">
      <div className="flex flex-wrap content-start w-min p-1 m-1 border-e border-gray-200 ">
        {imgs.map((src, index) => {
          return (
            <button
              type="button"
              className="flex justify-center items-center size-16 m-1 rounded overflow-hidden bg-white cursor-pointer"
              onClick={() => {
                handlingImgSelection(index);
              }}
              key={index}
            >
              <img src={src} alt="Imagen index + 1" />
            </button>
          );
        })}
      </div>
      <div className="flex justify-center items-center size-[450px] mx-4 overflow-hidden">
        <img src={currentImage} className="max-h-full max-w-full" alt="Preview" />
      </div>
    </div>
  );
};

export default ImgsPreview;

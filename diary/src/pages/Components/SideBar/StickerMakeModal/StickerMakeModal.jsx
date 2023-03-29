import React, { useEffect, useRef } from "react";
import EasyCropper from "./StickerCropper";

function StickerMakeModal({ modalHandler }) {
  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className=" h-screen w-screen">
      <div className="h-screen bg-opacity-75 bg-gray-400 flex justify-center items-center">
        <div className=" fixed border-2 bg-white opacity-100" ref={focusRef}>
          <EasyCropper modalHandler={modalHandler} />
        </div>
      </div>
    </div>
  );
}

export default StickerMakeModal;
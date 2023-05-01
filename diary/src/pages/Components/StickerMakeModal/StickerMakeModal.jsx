import React, { useEffect, useRef } from 'react';
import StickerCropper from './StickerCropper';

function StickerMakeModal({ modalHandler }) {
  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className=" h-screen w-screen">
      <div className="h-screen bg-opacity-75 bg-gray-400 flex justify-center items-center z-[100000000022]">
        <div className=" sticky border-2 bg-white opacity-100" ref={focusRef}>
          <StickerCropper modalHandler={modalHandler} />
        </div>
      </div>
    </div>
  );
}

export default StickerMakeModal;

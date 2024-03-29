import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const StickerButtonPresent = ({ id, imgURL, makeStickerHandler }) => (
  <button
    id={id}
    type="button"
    onDoubleClick={(e) => makeStickerHandler(e)}
    className="w-16 h-16 shadow-lg p-2 m-2 border-2 rounded-lg"
  >
    <Image
      className=" object-fill w-full h-full"
      src={imgURL}
      width={100}
      height={100}
      alt="sticker"
    />
  </button>
);

export default StickerButtonPresent;

StickerButtonPresent.propTypes = {
  id: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  makeStickerHandler: PropTypes.func.isRequired,
};

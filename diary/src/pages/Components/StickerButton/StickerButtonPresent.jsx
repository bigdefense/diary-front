import React from 'react';
import PropTypes from 'prop-types';

const StickerButtonPresent = ({ id, imgURL, makeStickerHandler }) => (
  <button
    id={id}
    type="button"
    onDoubleClick={(e) => makeStickerHandler(e)}
    className="w-16 h-16"
  >
    <img
      className=" object-fill w-full h-full"
      src={imgURL}
      width={100}
      height={100}
      alt=""
    />
  </button>
);

export default StickerButtonPresent;

StickerButtonPresent.propTypes = {
  id: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  makeStickerHandler: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { BiX } from 'react-icons/bi';

const StickerPresent = ({
  id,
  imgURL,
  selected,
  focusRef,
  focusHandler,
  removeStickerHandler,
  blurHandler,
}) => (
  <div
    className="absolute draggable z-20"
    id={id}
    tabIndex={0}
    ref={focusRef}
    onBlur={selected ? (e) => blurHandler(e) : null}
  >
    <div
      className={`${selected ? 'resizable ring' : null}`}
      onDoubleClick={(e) => focusHandler(e)}
    >
      {selected ? (
        <BiX
          className="absolute -right-2 -top-6 hover:cursor-pointer"
          onClick={(e) => removeStickerHandler(e)}
          size={24}
        />
      ) : null}
      <img
        className="object-fill w-full h-full"
        src={imgURL}
        width={screen.width}
        height={screen.height}
        alt="스티커"
      />
    </div>
  </div>
);

StickerPresent.propTypes = {};

export default StickerPresent;

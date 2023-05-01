import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSticker } from '@/Redux/action';
import { CURRENT_ROUTER_PATH } from '@/Constants/constants';
import StickerButtonPresent from './StickerButtonPresent';

function StickerButtonContainer({ id, imgURL }) {
  const dispatch = useDispatch();
  const currRouter = CURRENT_ROUTER_PATH();
  const makeStickerHandler = (e) => {
    const stickerPosition = {
      positionX: e.view.innerWidth / 2,
      positionY: e.view.innerHeight / 4,
    };
    dispatch(setSticker({ origin: currRouter, id, position: stickerPosition }));
  };
  return (
    <StickerButtonPresent
      id={id}
      imgURL={imgURL}
      makeStickerHandler={makeStickerHandler}
    />
  );
}

export default StickerButtonContainer;
StickerButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
};

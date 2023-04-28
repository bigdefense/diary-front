import { useEffect, useRef } from 'react';
import interact from 'interactjs';
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from 'src/Redux/action';
import {
  CURRENT_ROUTER_PATH,
  STICKER_POSITION_TRANSLATOR,
} from 'src/Constants/constants';

const useDraggable = (position) => {
  const positions = useRef(null);
  const stickerTimer = useRef(null);
  const dispatch = useDispatch();
  const currRouter = CURRENT_ROUTER_PATH();
  positions.current = position;
  const currStickersList = useSelector(
    (state) => state.stickerReducer.stickersArray[currRouter],
  );
  const debounce = (id, time, timer) => {
    let checkTimer = timer.current;
    if (checkTimer) clearTimeout(checkTimer);

    checkTimer = setTimeout(() => {
      dispatch(
        setPosition({ origin: currRouter, id, position: positions.current }),
      );
      checkTimer = null;
    }, time);
  };
  // 라이브러리 세팅은 config 따로 관리하자
  useEffect(() => {
    interact('.draggable').draggable({
      overlap: 'pointer',
      restrict: {
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1,
        },
      },
      listeners: {
        start: (event) => {
          const currSticker = currStickersList.find(
            (sticker) => sticker.id === event.target.id,
          );
          positions.current = {
            positionX: currSticker.positionX,
            positionY: currSticker.positionY,
          };
        },
        move: (event) => {
          const styleOfTarget = event.target.style;
          positions.current.positionX += event.dx;
          positions.current.positionY += event.dy;
          styleOfTarget.transform = STICKER_POSITION_TRANSLATOR(
            positions.current,
          );
          debounce(event.target.id, 300, stickerTimer);
        },
      },
    });
  });
};

export default useDraggable;

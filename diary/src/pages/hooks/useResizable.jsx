import interact from 'interactjs';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setResize } from '@/Redux/action';
import {
  CURRENT_ROUTER_PATH,
  STICKER_IMG_SIZE_OBJECT,
} from '@/Constants/constants';

const useResizable = () => {
  const stickerSize = useRef(null);
  const stickerTimer = useRef(null);
  const dispatch = useDispatch();
  const currRouter = useRef(null);
  currRouter.current = CURRENT_ROUTER_PATH();

  const debounce = (id, time, timer, position) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      dispatch(
        setResize({
          origin: currRouter.current,
          id,
          size: stickerSize.current,
          position,
        }),
      );
      timer.current = null;
    }, time);
  };

  useEffect(() => {
    interact('.resizable').resizable({
      edges: {
        top: true,
        left: true,
        bottom: true,
        right: true,
      },
      // invert: 'reposition',
      listeners: {
        move(event) {
          let { x, y } = event.target.dataset;

          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          const parentElem = event.target.parentNode;
          stickerSize.current = {
            width: event.rect.width,
            height: event.rect.height,
          };

          // 여기 부분에서 debounce가 아닌 mouseUp될때 dispatch를 실행할 수 있도록 변경해야하 할 것 같음. draggable에서도 동일.
          debounce(parentElem.id, 500, stickerTimer, { x, y });

          Object.assign(
            event.target.style,
            STICKER_IMG_SIZE_OBJECT(
              stickerSize.current.width,
              stickerSize.current.height,
              x,
              y,
            ),
          );
          /* move event가 발생하는 동안 event.target.dataset을 실시간 변경해줌. */
          Object.assign(event.target.dataset, { x, y });
        },
      },
    });
  }, []);
};

export default useResizable;

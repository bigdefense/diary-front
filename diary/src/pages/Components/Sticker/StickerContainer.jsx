import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useDraggable from '@/pages/hooks/useDraggable';
import useResizable from '@/pages/hooks/useResizable';
import { removeSticker, resetSelect, setSelect } from '@/Redux/action';
import {
  CURRENT_ROUTER_PATH,
  SELECT_IN_STICKER_DIV,
  STICKER_IMG_SIZE_OBJECT,
  STICKER_POSITION_TRANSLATOR,
  STICKER_SELECTOR_ID,
} from '@/Constants/constants';
import StickerPresent from './StickerPresent';

/*
현재 에러 사항
  - 스티커 A와 B가 있을 때, 스티커 A가 focus된 상태에서 스티커 B를 drag하면 에러 발생.
    undefined는 left property를 가질 수 없다는 에러인데, event가 잡히지 않는 것으로 생각 됨.
  - onBlur로 focus를 관리 중 일때 발생하는 문제로, 스티커 삭제 버튼을 눌렀을 때, onBlur가 실행되는 문제.
    div내부 다른 곳을 클릭하는 것에는 문제가 없으나, 버튼의 기능이 활성화 될 때, focus가 버튼으로 넘어가서 그렇게 되는 것으로 생각 됨.
 */
/**
 *
 * @param {imgURL} string
 * @param {id} string
 * @param {position} array
 * @param {width} string
 * @param {height} string
 * @param {selected} boolean
 */
function StickerContainer({
  imgURL, id, position, width, height, selected,
}) {
  useDraggable(position);
  // resize를 할때, 왼쪽 축을 잡고 늘리면 오른쪽으로 늘어나는 문제가 있음.
  useResizable();
  const dispatch = useDispatch();
  const routerRef = useRef(null);
  // CURRENT_ROUTER_PATH function을 dispatch안에서 실행시킬경우 react의 hook 규칙을 위반하게 되어 Ref의 current에 저장해서 사용하는 방식을 채택.
  // 더 좋은 방법이 있다면 수정할 예정.
  routerRef.current = CURRENT_ROUTER_PATH();
  const focusRef = useRef(null);

  useEffect(() => {
    const stickerPosition = document.querySelector(STICKER_SELECTOR_ID(id));
    stickerPosition.style.transform = STICKER_POSITION_TRANSLATOR(position);
    const stickerImgSize = stickerPosition.querySelector(SELECT_IN_STICKER_DIV); // 변수명 맘에 안듦.
    Object.assign(stickerImgSize.style, STICKER_IMG_SIZE_OBJECT(width, height));
  }, []);

  // onClick했을때 focus가 옮겨가야하는데, 어떻게 구현해야할지 더 고민해볼 것.
  useEffect(() => {
    if (selected) focusRef.current.focus();
  }, [selected]);

  const focusHandler = (e) => {
    const selectedStickerId = e.target.parentNode.parentNode.id;
    // if (selected && selectedStickerId===id) return; // 이 조건문을 건 이유 : 처음에 온클릭으로 해서
    dispatch(setSelect({ id: selectedStickerId, origin: routerRef.current }));
  };

  const removeStickerHandler = (e) => {
    const selectedStickerId = e.target.parentNode.parentNode.id;
    dispatch(
      removeSticker({ id: selectedStickerId, origin: routerRef.current }),
    );
  };

  // onBlur event를 사용할 때에는 tabIndex속성을 같이 사용해줘야 onBlur가 트리거 됨.
  // 참고 https://velog.io/@broccoliindb/onBlur-on-react
  const blurHandler = (e) => {
    const nextElem = e.relatedTarget;
    // 문제가 생기기 전까지는 보류.
    if (!nextElem) {
      dispatch(resetSelect({ origin: routerRef.current }));
    }
  };

  return (
    <StickerPresent
      id={id}
      imgURL={imgURL}
      position={position}
      width={width}
      height={height}
      selected={selected}
      focusRef={focusRef}
      focusHandler={focusHandler}
      removeStickerHandler={removeStickerHandler}
      blurHandler={blurHandler}
    />
  );
}

export default StickerContainer;

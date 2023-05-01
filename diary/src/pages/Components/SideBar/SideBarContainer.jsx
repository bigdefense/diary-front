import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SideBarPresent from './SideBarPresent';

function SideBarContainer() {
  const stickerList = useSelector(
    (state) => state.stickerReducer.stickersArray.Table,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // visibleHandler로 통합할까?
  const modalHandler = () => {
    setModalVisible(!modalVisible);
  };

  const sidebarHandler = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // table column을 만들기 위해서 사용하는 함수.
  // grid로 변경하자.
  const tableMaker = (arr, num) => {
    let slicedArr = [];
    const arrBox = [];
    for (let i = 0; i < arr.length; i += num) {
      slicedArr = arr.slice(i, i + num);
      arrBox.push(slicedArr);
    }
    return arrBox;
  };
  return (
    <SideBarPresent
      stickerList={stickerList}
      modalVisible={modalVisible}
      modalHandler={modalHandler}
      sidebarVisible={sidebarVisible}
      sidebarHandler={sidebarHandler}
      tableMaker={tableMaker}
    />
  );
}

export default SideBarContainer;

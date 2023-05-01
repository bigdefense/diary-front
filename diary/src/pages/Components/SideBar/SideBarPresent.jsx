import React from 'react';
import { v4 } from 'uuid';
import { BiChevronLeft, BiChevronRight, BiImageAdd } from 'react-icons/bi';
import StickerMakeModal from '../StickerMakeModal/StickerMakeModal';
import SideBarColumn from './SideBarColumn';

/**
 *
 * @param {stickerList} array sticker를 담은 배열
 * @param {modalVisible} boolean modal 랜더링을 결정하는 state
 * @param {modalHandler} function modalVisible을 관리하는 함수
 * @param {sidebarVisible} boolean sidebar 랜더링을 결정하는 state
 * @param {sidebarHandler} function sidebarVisible을 관리하는 함수
 * @param {tableMaker} function table형태를 만들기위해 2차원 배열을 만들어주는 함수. 추후 grid로 변경, 대체할 예정
 */

function SideBarPresent({
  stickerList,
  modalVisible,
  modalHandler,
  sidebarVisible,
  sidebarHandler,
  tableMaker,
}) {
  return (
    <div className=" absolute inset-y-0">
      <div className="fixed right-0">
        {modalVisible ? <StickerMakeModal modalHandler={modalHandler} /> : null}
        <div className="flex h-screen">
          {sidebarVisible ? (
            <BiChevronRight
              className=" m-auto w-fit h-fit"
              size={40}
              onClick={sidebarHandler}
            />
          ) : (
            <BiChevronLeft
              className=" m-auto w-fit h-fit"
              size={40}
              onClick={sidebarHandler}
            />
          )}
          {sidebarVisible ? (
            <div className="overflow-auto inline-block bg-white border-2">
              <div className=" flex justify-end mt-2 mr-2 mb-4">
                <BiImageAdd size={30} onClick={modalHandler} />
              </div>
              <table>
                <tbody>
                  {tableMaker(stickerList, 2).map((stickerCol) => (
                    <SideBarColumn stickerCol={stickerCol} key={v4()} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SideBarPresent;

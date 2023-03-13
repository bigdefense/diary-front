import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavItem from './NavItem';


// 이것도 데이트 객체를 이용해서 Array를 만드는게 좋겠다. 그런데 2023은 무슨 기능의 버튼인지 이야기 해봐야할 듯?
const navItemList = ['Cover', '2023', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Weekly', 'Daily', 'Personal'];
// 모달 창이 떴을 때, 회색 배경으로 같이 덮어져하는데 _app.js에서 실행되는 네브바여서 그런지 fixed를 사용하지 않으면 덮어지지 않음.
// 그렇다고 fixed를 사용하면, 달력이랑 네브바가 겹치는 현상이 발생함.
function NavBar() {
  return (
    <div className=" relative w-full">
      <ul className="flex justify-center gap-3">
        {navItemList.map((val) => <NavItem title={val} key={uuidv4()} />)}
      </ul>
    </div>

  );
}

export default NavBar;

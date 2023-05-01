import React from 'react';
import Button from '../Button';
import { NAVBAR_HOVER_BG_COLOR_OBJECT } from '@/constants/navbarConstants';
import { CURRENT_ROUTER_PATH } from '@/Constants/constants';

function NavItem({ title, routerSelector }) {
  return (
    <li
      className={`font-bold p-2 w-min ${
        NAVBAR_HOVER_BG_COLOR_OBJECT[CURRENT_ROUTER_PATH()]
      }`}
    >
      <Button content={title} onClick={(e) => routerSelector(e)} />
    </li>
  );
}

export default NavItem;

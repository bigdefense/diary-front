import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setMonthRouter } from '@/Redux/action';
import NavBarPresent from './NavBarPresent';

const NavBarContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();
  const routerSelector = (e) => {
    const routerKey = e.target.innerText;
    switch (routerKey) {
      case 'Cover':
        return router.push('/Main');
      case 'Weekly':
        return router.push(routerKey);
      case 'Daily':
        return router.push(routerKey);
      case 'Personal':
        return;
      case '2023':
        dispatch(setMonthRouter({ willMoveMonth: currMonth, currYear }));
        return router.push('/Monthly');
      default:
        dispatch(setMonthRouter({ willMoveMonth: +routerKey - 1, currYear }));
        return router.push('/Monthly');
    }
  };
  return <NavBarPresent routerSelector={routerSelector} />;
};

export default NavBarContainer;

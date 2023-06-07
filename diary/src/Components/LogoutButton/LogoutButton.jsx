import React from 'react';
// import { removeCookie } from 'src/Utils/cookies';
import useAxios from 'src/hooks/useAxios';

const LogoutButton = () => {
  const handleLogout = useAxios({
    method: 'post',
    url: '/users/signout',
    payload: {
      email: 'mmmm@m.com',
      password: 'mmmm',
      name: '이이이',
      image: '',
      image_type: '',
    },
  });

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="m-5 p-5 bg-blue-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

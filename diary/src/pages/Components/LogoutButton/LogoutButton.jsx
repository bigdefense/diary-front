import React from 'react';
import axios from '@/pages/Utils/api';
import { removeCookie } from '@/pages/Utils/cookies';

const LogoutButton = () => {
  const send = async () => {
    try {
      await axios
        .post(
          '/users/signout/',
          {
            email: 'dmswl@dmswl.com',
            password: 'dmswl1',
            name: 'dmswl',
            image: '',
            image_type: '',
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          console.log(res);
          removeCookie('Authorization');
          removeCookie('Refresh');
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button onClick={send} className="m-5 p-5 bg-blue-50">
      Logout
    </button>
  );
};

export default LogoutButton;

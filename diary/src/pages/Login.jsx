import React from 'react';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import axios from './Utils/api';
import LogoutButton from './Components/LogoutButton/LogoutButton';

const Login = () => {
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const handleLogin = handleSubmit(async (resData) => {
    try {
      await axios
        .post(
          '/users/signin/',
          {
            email: resData.email,
            password: resData.password,
            name: '',
            image: '',
            image_type: '',
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          console.log(res);
          // setCookie("Authorization", res.data.data.accessToken);
          // setCookie("Refresh", res.data.data.refreshToken);
        })
        // .then(() => router.push("/Main"))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          이메일
          <input
            id="email"
            type="email"
            placeholder="test@email.com"
            {...register('email')}
          />
        </label>
        <label htmlFor="password">
          비밀번호
          <input
            id="password"
            type="password"
            placeholder="****************"
            {...register('password')}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
      <LogoutButton />
    </>
  );
};

export default Login;

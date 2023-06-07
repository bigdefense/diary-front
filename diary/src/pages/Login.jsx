/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import LogoutButton from 'src/Components/LogoutButton/LogoutButton';
import axios from 'src/Utils/api';

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleLogin = handleSubmit(async (resData) => {
    try {
      const response = await axios.post(
        '/users/signin',
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
      );
      console.log(response);
      if (response.data.code === 'USI20001') {
        // router.push('/Main');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100">
      <div className="relative w-1/3 h-[620px] bg-white flex items-center justify-center shadow-md rounded-2xl flex-col">
        <div className=" mb-12 flex flex-col justify-center items-center gap-1">
          <div className=" mb-12 flex flex-col justify-center items-center gap-1">
            <p className="text-2xl mb-2 font-bold">LOGIN</p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <span className="h-3 px-3">
                이메일
              </span>
              <input
                id="email"
                type="email"
                placeholder="test@email.com"
                className=" border-2 rounded-md h-10 px-3 mt-5"
                {...register('email')}
              />
            </div>
            <div>
              <span className="h-3 px-3">
                비밀번호
              </span>
              <input
                id="password"
                type="password"
                placeholder="****************"
                className=" border-2 rounded-md h-10 px-3 mt-5"
                {...register('password')}
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-orange-300 rounded-md h-10 p-2"
                type="submit"
                disabled={isSubmitting}
              >
                로그인
              </button>
              <button onClick={() => router.push('/Signup')} type="button" className="text-blue-900 border-b-2 border-blue-900 h-10 p-2 float-right">회원가입 하러가기</button>
            </div>
            <div />
          </form>

          <p className="mt-10">로그아웃 확인하기 위한 임시 버튼</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Login;

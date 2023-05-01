import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from './Utils/api';

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors, isDirty, isValid,
    },
  } = useForm({ mode: 'onChange' });

  const handleSignup = handleSubmit(async (resData) => {
    try {
      await axios
        .post(
          '/users/signup/',
          {
            email: resData.email,
            password: resData.password,
            name: resData.username,
            image: '',
            image_type: '',
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          // alert('회원가입 완료! 로그인 후 이용해주세요.');
          router.push('/Login');
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="bg-white py-20 w-screen h-screen">
      <div className="w-1/2 h-3/4 p-5 mx-auto bg-white shadow-2xl">
        <h1 className="text-4xl text-center">회원가입</h1>
        <form onSubmit={handleSignup}>
          {errors.username && errors.username?.type === 'required' && (
            <span>이름을 입력하세요</span>
          )}
          {errors.username && errors.username?.type === 'minLength' && (
            <span>{errors.username.message}</span>
          )}
          <p className="text-gray-600">이름</p>
          <input
            type="text"
            placeholder="Eunji"
            aria-invalid={errors.username ? '#ff0000' : '#dadada'}
            {...register('username', {
              required: true,
              minLength: { value: 2, message: '이름은 2자 이상이어야 합니다.' },
            })}
            className="border w-full p-4 mt-2 border-gray-300 rounded"
          />
          {errors.email && errors.email?.type === 'required' && (
            <span>이메일을 입력하세요</span>
          )}
          {errors.email && errors.email?.type === 'pattern' && (
            <span>@를 포함한 주소를 적어주세요</span>
          )}
          <p className="text-gray-600">Email</p>
          <input
            placeholder="123@ex.com"
            aria-invalid={errors.email ? '#ff0000' : '#dadada'}
            {...register('email', {
              required: true,
              pattern: /@/,
            })}
            className="border w-full p-4 mt-2 border-gray-300 rounded"
          />
          {errors.password && errors.password?.type === 'required' && (
            <span>패스워드를 입력하세요</span>
          )}
          {errors.password && errors.password?.type === 'pattern' && (
            <span>
              비밀번호는 6자 이상으로 하나 이상의 숫자와 문자를 포함해주세요.
            </span>
          )}
          <p className="text-gray-600">비밀번호</p>
          <input
            placeholder="Password"
            aria-invalid={errors.email ? '#ff0000' : '#dadada'}
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            })}
            className="border w-full p-4 mt-2 border-gray-300 rounded"
          />
          {errors.passwordCheck
            && errors.passwordCheck?.type === 'required' && (
              <span>패스워드를 재입력하세요.</span>
          )}
          {errors.passwordCheck
            && errors.passwordCheck?.type === 'validate' && (
              <span>입력한 패스워드와 다릅니다.</span>
          )}
          <p className="text-gray-600">비밀번호 확인</p>
          <input
            placeholder="Password 확인"
            aria-invalid={errors.email ? '#ff0000' : '#dadada'}
            {...register('passwordCheck', {
              required: true,
              validate: (value) => value === watch('password'),
            })}
            className="border w-full p-4 mt-2 border-gray-300 rounded"
          />
          <div className="mx-auto">
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className="p-4 m-10 text-xl text-center text-white bg-indigo-500 rounded hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

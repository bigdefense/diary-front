/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'src/Utils/api';
import { useRouter } from 'next/router';
import SignupPresent from './SignupPresent';

const SignupContainer = () => {
  const router = useRouter();
  const passwordRef = useRef(null);
  const {
    register,
    getValues,
    handleSubmit,
    formState: {
      isSubmitting, isDirty, errors,
    },
  } = useForm();

  const handleSignup = handleSubmit(async (resData) => {
    try {
      const response = await axios.post(
        '/users/signup',
        {
          email: resData.email,
          password: resData.password,
          name: resData.name,
          image: '',
          image_type: '',
        },
        { withCredentials: true },
      );
      // console.log(response.data.code);
      if (response.data.code === 'USI10001') {
        router.push('/Login');
      } else {
        console.log('가입 실패');
      }
    } catch (error) {
      console.log(error);
    }
  });

  // useAxios({
  //   method: 'post',
  //   url: '/users/signup',
  //   payload: { accept: '*/*' },
  // });

  passwordRef.current = getValues('password');
  const Regex = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    name: /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
  };
  const emailRegister = register('email', {
    required: { value: true, message: '이메일을 입력해주세요' },
    pattern: { value: Regex.email, message: '이메일 형식을 입력해주세요' },
  });

  // isDirty를 사용해야 내가 입력한 값이 몇 자리인지 알 수 있을 것 같은데?
  const passwordRegister = register('password', {
    required: { value: true, message: '비밀번호를 입력해주세요' },
    minLength: { value: 4, message: '4자리이상 입력해주세요' },
    maxLength: { value: 16, message: '16자리이하로 입력해주세요' },
  });
  const passwordCheckRegister = register('passwordCheck', {
    required: { value: true, message: '비밀번호를 입력해주세요' },
    minLength: { value: 4, message: '4자리이상 입력해주세요' },
    validate: {
      check: (passwordCheck) => passwordCheck === passwordRef.current || '비밀번호가 다릅니다',
    },
  });
  const nameRegister = register('name', {
    required: { value: true, message: '이름을 입력해주세요' },
    pattern: { value: Regex.name, message: '이름을 다시 확인해주세요' },
  });

  return (
    <SignupPresent
      emailRegister={emailRegister}
      passwordRegister={passwordRegister}
      passwordCheckRegister={passwordCheckRegister}
      nameRegister={nameRegister}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      handleSignup={handleSignup}
      errors={errors}
    />
  );
};

export default SignupContainer;

import React from 'react';
import PropTypes from 'prop-types';

const SignupPresent = ({
  emailRegister,
  passwordRegister,
  passwordCheckRegister,
  nameRegister,
  isDirty,
  isSubmitting,
  handleSignup,
  errors,
}) => (
  <div className="flex justify-center items-center h-screen bg-orange-100">
    <div className="relative w-1/3 h-[620px] bg-white flex items-center justify-center shadow-md rounded-2xl flex-col">
      <div className=" mb-12 flex flex-col justify-center items-center gap-1">
        <span className="text-2xl mb-2 font-bold">회원가입</span>
        <span className="text-gray-400">
          간단한 웹페이지에 대한 소개를 여기에다가 적을 예정.
        </span>
        <span className="text-gray-400">한줄 정도 더 있으면 좋겠네.</span>
      </div>
      <form
        className="flex flex-col mx-5 w-3/4"
        onSubmit={handleSignup}
      >
        <input
          id="email"
          type="text"
          {...emailRegister}
          aria-invalid={isDirty ? errors.email : false}
          className=" border-2 rounded-md h-10 px-3 mt-5"
          placeholder="이메일"
        />
        <span className=" text-pink-300 text-sm h-3 px-3">
          {errors.email ? errors.email.message : ' '}
        </span>
        <input
          id="password"
          type="password"
          {...passwordRegister}
          aria-invalid={
            isDirty ? errors.password : false
          }
          className=" border-2 rounded-md h-10 px-3 mt-5"
          placeholder="비밀번호"
        />
        <span className=" text-pink-300 text-sm h-3 px-3">
          {errors.password ? errors.password.message : ' '}
        </span>
        <input
          type="password"
          {...passwordCheckRegister}
          aria-invalid={
            isDirty ? errors.passwordCheck : false
          }
          className=" border-2 rounded-md h-10 px-3 mt-5"
          placeholder="비밀번호 확인"
        />
        <span className=" text-pink-300 text-sm h-3 px-3">
          {errors.passwordCheck ? errors.passwordCheck.message : ' '}
        </span>
        <input
          id="name"
          type="text"
          {...nameRegister}
          aria-invalid={!isDirty ? errors.name : false}
          className=" border-2 rounded-md h-10 px-3 mt-5"
          placeholder="이름"
        />
        <span className=" text-pink-300 text-sm h-3 px-3">
          {errors.name ? errors.name.message : ' '}
        </span>
        <button
          className="bg-orange-300 rounded-md h-10 mt-6"
          type="submit"
          disabled={isSubmitting}
        >
          제출
        </button>
      </form>
    </div>
  </div>
);

// errors의 타입을 제대로 적어줄 필요가 있음. Warning 발생.

SignupPresent.propTypes = {
  emailRegister: PropTypes.shape({
    name: PropTypes.string, onChange: PropTypes.func, onBlur: PropTypes.func, ref: PropTypes.func,
  }).isRequired,
  passwordRegister: PropTypes.shape({
    name: PropTypes.string, onChange: PropTypes.func, onBlur: PropTypes.func, ref: PropTypes.func,
  }).isRequired,
  passwordCheckRegister: PropTypes.shape({
    name: PropTypes.string, onChange: PropTypes.func, onBlur: PropTypes.func, ref: PropTypes.func,
  }).isRequired,
  nameRegister: PropTypes.shape({
    name: PropTypes.string, onChange: PropTypes.func, onBlur: PropTypes.func, ref: PropTypes.func,
  }).isRequired,
  isDirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSignup: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default SignupPresent;

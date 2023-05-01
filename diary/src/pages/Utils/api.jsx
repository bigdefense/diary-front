import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://sejdiary.p-e.kr/',
});

export default axios;

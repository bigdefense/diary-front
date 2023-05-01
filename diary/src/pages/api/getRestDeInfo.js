import axios from 'axios';

// getRestDeInfo

const getRestDeInfo = (Year, Month) => {
  axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${Year}&solMonth=${Month}&ServiceKey=${process.env.NEXT_PUBLIC_RESTDE_API_KEY}`,
    )
    .then((res) => {
      console.log(res.data.response.body);
    })
    .catch((err) => console.log(err));
};

export default getRestDeInfo;

// W1 W2 W3 W4
// 해당 달의 maximum 주차 계산하기

const getDateOffset = (dateInDaily) => {
  const offset = dateInDaily.getTimezoneOffset() * 60000;
  const dateOffset = new Date(dateInDaily.getTime() - offset);
  return dateOffset.toISOString().substring(0, 10);
};
// 주차별로 이동가능한 컴포넌트 만들기
const useGetWeeksTarget = (date) => {
  const dateConv = new Date(date);
  const calcMon = dateConv.getDate() - dateConv.getDay() + 1;
  const lastDayOfMonth = new Date(
    dateConv.getFullYear(),
    dateConv.getMonth() + 1,
    0,
  ).getDate();
  const weekArr = [];
  for (let mon = calcMon % 7; mon <= lastDayOfMonth; mon += 7) {
    if (mon) {
      const reCalcDate = new Date(
        dateConv.getFullYear(),
        dateConv.getMonth(),
        mon,
      );
      const offsetReCalcDate = getDateOffset(reCalcDate);
      weekArr.push(offsetReCalcDate);
    }
  }
  return weekArr;
};
export default useGetWeeksTarget;

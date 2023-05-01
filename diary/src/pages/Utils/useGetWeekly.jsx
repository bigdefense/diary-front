import { v4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { DAYS_WEEKLY } from '../../Constants/weeklyConstant';

/**
 * @param {dateInWeekly} str 선택된 날짜,기본 날짜 ex."2023-04-04"
 * @param {getMonday} func, 그 주의 월요일 date 리턴 (plusDay=1일때 월요일)
 * @param {getlocWeek} func , 그 주가 몇째주인지를 표현 "2023-03-W3"
 * @param {useGetWeekly} func , weekly페이지의 날짜 정보
 * array [{day: 요일, locdate: '', textContent: ''},{},{}...]
 * @returns
 */

export const getMonday = (dateInWeekly, plusDay) => {
  const calcMonday = dateInWeekly.getDate() - dateInWeekly.getDay();
  const nextDate = (calc) => {
    const copyDate = new Date(dateInWeekly);
    return new Date(copyDate.setDate(calc));
  };
  return nextDate(calcMonday + plusDay);
};
getMonday.propTypes = {
  dateInWeekly: PropTypes.string.isRequired,
  plusDay: PropTypes.number.isRequired,
};

export const getlocWeek = (dateInWeekly) => {
  const dateConv = new Date(dateInWeekly);
  const mondayDate = getMonday(dateConv, 1);
  const year = mondayDate.getFullYear();
  const month = mondayDate.getMonth() + 1;
  const weeks = parseInt(mondayDate.getDate() / 7, 10);
  return `${year}-${month.toString().padStart(2, '0')}-W${weeks + 1}`;
};
getlocWeek.propTypes = {
  dateInWeekly: PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

const useGetWeekly = (dateInWeekly) => {
  const dateConv = new Date(dateInWeekly);
  const representWeekly = getlocWeek(dateConv);

  let weeklyList = [];
  let plusDay = 1;
  for (const days of DAYS_WEEKLY) {
    const weekObj = {
      day: days,
      locdate: '',
      textContent: '',
      id: v4(),
    };
    if (days === 'Weekly') weekObj.locdate = representWeekly;
    else if (days !== 'Weekly') {
      weekObj.locdate = getMonday(dateConv, plusDay)
        .toISOString()
        .substring(0, 10);
      plusDay += 1;
    }
    weeklyList = [...weeklyList, weekObj];
  }
  return weeklyList;
};
useGetWeekly.propTypes = {
  dateInWeekly: PropTypes.string.isRequired,
};
export default useGetWeekly;

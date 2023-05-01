import PropTypes from 'prop-types';
import { DAY_OF_WEEK, MONTH_DAYS } from '../../Constants/monthlyConstants';
import Holiday from '../Json/holidays_kr.json';

/**
 * @param {idxMonth} number, (ex. 03 -> 2)
 * @param {monthStartDay} number, 무슨 요일부터 시작하는지 (0-6)
 * @param {MAX_WEEKS} number, 달의 최대 주단위가 6주
 * @param {DAY_OF_WEEK} list, 월화수목금토일
 * @param {MONTH_DAYS} list, 1월부터 12월까지의 마지막 일수
 * @returns array 6 [[],[],[],[],[],[]]
 */

const useMonthCalendar = (year, month) => {
  const monthIdx = month * 1 - 1;
  const monthStartDay = new Date(year, monthIdx, 1).getDay();
  const MAX_WEEKS = 6;

  const MonthTable = Array.from(Array(MAX_WEEKS), (_, fewWeeks) => {
    let weekArr = [];
    let startday = 1;
    for (const dayOfWeek of DAY_OF_WEEK) {
      const monthCalendar = {
        locdate: '',
        date: '',
        isInMonth: false,
        day: '',
        dateName: '',
        isHoliday: false,
        todos: [],
      };
      const date = fewWeeks * 7 - monthStartDay + startday;
      startday += 1;

      if (date > MONTH_DAYS[monthIdx]) {
        monthCalendar.locdate = false;
        monthCalendar.date = date - MONTH_DAYS[monthIdx];
        if (fewWeeks === 5 && dayOfWeek === 'Sun') break;
      } else if (date < 1) {
        monthCalendar.locdate = false;
        monthCalendar.date = date + (MONTH_DAYS[monthIdx - 1] || 31);
      } else if (date >= 1 && date <= MONTH_DAYS[monthIdx]) {
        monthCalendar.locdate = `${year}-${month}-${date.toString().padStart(2, '0')}`;
        monthCalendar.date = date;
        monthCalendar.isInMonth = true;
      }
      monthCalendar.day = dayOfWeek;
      monthCalendar.dateName = Holiday[year] && Holiday[year][monthCalendar.locdate]
        ? Holiday[year][monthCalendar.locdate]
        : '';
      monthCalendar.isHoliday = !!(dayOfWeek === 'Sun' || monthCalendar.dateName);
      weekArr = [...weekArr, monthCalendar];
    }
    return weekArr;
  });
  return MonthTable;
};

useMonthCalendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.string,
};
export default useMonthCalendar;

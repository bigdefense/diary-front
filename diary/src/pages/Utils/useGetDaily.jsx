import { DAY_OF_WEEK } from '../../Constants/monthlyConstants';

/**
 *
 * @param {dateInDaily} str (0000-00-00)
 * @returns
 */

const useGetDaily = (date) => {
  const dateInDaily = new Date(date);

  const dailyContent = {
    locdate: date, day: DAY_OF_WEEK[dateInDaily.getDay()], titleText: '', editorContent: '',
  };
  return dailyContent;
};

export default useGetDaily;

import React from 'react';
import PropTypes from 'prop-types';

const WeeklyDisplayPresenter = ({ weekly, weekTextContent, handleChange }) => (
  <div className="relative w-[250px] h-[450px] bg-white rounded-xl border-2 border-black border-dashed">
    <div className="absolute m-3 w-5 h-5 border-2 border-black rounded-full" />
    <div className="text-xl font-bold mt-10">{weekly.day}</div>
    <textarea
      spellCheck="false"
      value={weekTextContent}
      onChange={handleChange}
      className="block min-h-[200px] max-h-[200px] mt-5 mx-auto p-4 border-4 overflow-hidden rounded-lg"
    />
    <p
      className={`absolute bottom-0 right-0 m-3 text-sm ${
        weekly.day === 'Weekly' ? 'hidden' : 'text-gray-400'
      }`}
    >
      {weekly.locdate}
    </p>
  </div>
);

WeeklyDisplayPresenter.propTypes = {
  weekly: PropTypes.shape({
    day: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    locdate: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
  }).isRequired,
  weekTextContent: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default WeeklyDisplayPresenter;

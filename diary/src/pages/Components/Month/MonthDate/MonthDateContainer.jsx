import React from 'react';
import PropTypes from 'prop-types';
import useControlModal from '../../../hooks/useControlModal';
import MonthDatePresenter from './MonthDatePresenter';

/**
 * @param {ctrInputModal}
 * { modalVisible: boolean, modalRef:modalRef,handleModalOpen: {f}, handleModalClose: {f} }
 * @returns
 */

function MonthDateContainer({ dayInfo }) {
  const ctrInputModal = useControlModal(dayInfo.isInMonth);
  return <MonthDatePresenter dayInfo={dayInfo} ctrInputModal={ctrInputModal} />;
}

MonthDateContainer.propTypes = {
  dayInfo: PropTypes.shape({
    date: PropTypes.number.isRequired,
    dateName: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    isHoliday: PropTypes.bool.isRequired,
    isInMonth: PropTypes.bool.isRequired,
    locdate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      todoContent: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
export default MonthDateContainer;

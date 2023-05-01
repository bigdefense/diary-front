/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import Button from '../../Button';
import MonthTodoItemContainer from '../MonthTodoItem/MonthTodoItemContainer';
import MonthListModalContainer from '../MonthModal/MonthListModal/MonthListModalContainer';
import { SHOW_MORE_TODO } from '../../../../Constants/monthlyConstants';

/**
 * @param {dayInfo} obj
 * @param {ctrListModal}
 * { modalVisible: boolean, modalRef:modalRef, handleModalOpen: {f}, handleModalClose: {f}
 * @returns
 */

const MonthTodoPresenter = ({ dayInfo, ctrListModal, viewTodoLen }) => {
  const { todos } = dayInfo;

  return (
    <>
      {todos.map((todo, idx) => {
        if (idx === viewTodoLen) {
          return (
            <div key={v4()}>
              <Button
                key={v4()}
                onClick={() => ctrListModal.handleModalOpen()}
                content={SHOW_MORE_TODO(dayInfo.todos)}
                className="block p-1 pl-2 my-2 mx-auto hover:font-semibold hover:cursor-pointer text-green-900"
              />
              <MonthListModalContainer
                dayInfo={dayInfo}
                listModalVisible={ctrListModal.modalVisible}
                handleListModalClose={ctrListModal.handleModalClose}
                listModalRef={ctrListModal.modalRef}
              />
            </div>
          );
        }
        if (idx < viewTodoLen) {
          return (
            <MonthTodoItemContainer key={v4()} todo={todo} dayInfo={dayInfo} />
          );
        }
      })}
    </>
  );
};

MonthTodoPresenter.propTypes = {
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
  ctrListModal: PropTypes.shape({
    modalVisible: PropTypes.bool,
    modalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
  }).isRequired,
  viewTodoLen: PropTypes.number.isRequired,
};

export default MonthTodoPresenter;

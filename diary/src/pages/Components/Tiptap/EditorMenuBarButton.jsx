import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {onClick} func
 * @param {disabled} bool
 * @param {content} str icon 컴포넌트
 * @returns
 */

const EditorMenuBarButton = ({
  onClick, disabled, className, content,
}) => (
  <button
    type="button"
    onClick={() => onClick()}
    disabled={disabled}
    className={`outline-none focus:outline-none border-r border-gray-200 w-14 h-10 hover:text-indigo-500 active:bg-gray-50 ${className}`}
  >
    {content}
  </button>
);
EditorMenuBarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  className: PropTypes.string,
  content: PropTypes.element.isRequired,
};

EditorMenuBarButton.defaultProps = {
  disabled: true,
  className: '',
};
export default EditorMenuBarButton;

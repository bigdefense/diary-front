import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, content, className }) => (
  <button type="button" className={`cursor-pointer ${className}`} onClick={onClick}>{content}</button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Button.defaultProps = {
  className: '',
};
export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import { ModalInputContainer } from './ModalInput.styles';

const ModalInput = ({
  title,
  placeholder,
  value,
  onChange,
  affixedText,
  type,
  maxTwo,
  maxThree
}) => (
  <ModalInputContainer hasContent={!!value && value.length > 0} maxTwo={maxTwo} maxThree={maxThree}>
    <h3>{title}</h3>
    <label>
      <input value={value} onChange={onChange} placeholder={placeholder} type={type} />
      {affixedText && <p>{affixedText}</p>}
    </label>
  </ModalInputContainer>
);

ModalInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  affixedText: PropTypes.string,
  type: PropTypes.string,
  maxTwo: PropTypes.bool,
  maxThree: PropTypes.bool
};

export default ModalInput;

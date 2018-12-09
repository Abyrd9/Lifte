import React from 'react';
import PropTypes from 'prop-types';
import { ModalDoubleInputContainer } from './ModalDoubleInput.styles';

const ModalInput = ({
  title,
  divider,
  placeholder,
  firstValue,
  secondValue,
  onChangeFirstValue,
  onChangeSecondValue,
  affixedText
}) => (
  <ModalDoubleInputContainer hasContent={firstValue.length > 0 || secondValue.length > 0}>
    <h3>{title}</h3>
    <label>
      <input value={firstValue} onChange={onChangeFirstValue} placeholder={placeholder} />
      <span>{divider}</span>
      <input value={secondValue} onChange={onChangeSecondValue} placeholder={placeholder} />
      {affixedText && <p>{affixedText}</p>}
    </label>
  </ModalDoubleInputContainer>
);

ModalInput.propTypes = {
  title: PropTypes.string,
  divider: PropTypes.oneOfType(PropTypes.string, PropTypes.node),
  placeholder: PropTypes.string,
  firstValue: PropTypes.string.isRequired,
  secondValue: PropTypes.string.isRequired,
  onChangeFirstValue: PropTypes.func.isRequired,
  onChangeSecondValue: PropTypes.func.isRequired,
  affixedText: PropTypes.string
};

export default ModalInput;

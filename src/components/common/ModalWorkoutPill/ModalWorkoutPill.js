import React from 'react';
import PropTypes from 'prop-types';
import { ModalWorkoutPillContainer, ModalPillDeleteIcon } from './ModalWorkoutPill.styles';

const ModalWorkoutPill = ({ text, onClick }) => {
  return (
    <ModalWorkoutPillContainer>
      {text}
      <ModalPillDeleteIcon icon="minus-circle" onClick={onClick} />
    </ModalWorkoutPillContainer>
  );
};

ModalWorkoutPill.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ModalWorkoutPill;

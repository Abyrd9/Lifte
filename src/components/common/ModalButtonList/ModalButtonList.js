import React from 'react';
import PropTypes from 'prop-types';
import { ModalButtonListContainer } from './ModalButtonList.styles';

const ModalButtonList = ({ onCancel, onSave, onDelete, isDisabled, isDelete }) => {
  return (
    <ModalButtonListContainer>
      <button onClick={onCancel}>Cancel</button>
      {isDelete ? (
        <button onClick={onDelete}>Delete</button>
      ) : (
        <button disabled={isDisabled} onClick={onSave}>
          Save
        </button>
      )}
    </ModalButtonListContainer>
  );
};

ModalButtonList.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
  isDelete: PropTypes.bool
};

export default ModalButtonList;

import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
import ModalTitle from '../ModalTitle/ModalTitle';
import ModalButtonList from '../ModalButtonList/ModalButtonList';
import { ModalContentDeleteContainer } from './ModalContentDelete.styles';

const ModalContentDelete = ({ closeModal, itemId, isWorkout }) => {
  return (
    <ModalContentDeleteContainer>
      <ModalTitle title={isWorkout ? 'Delete Workout' : 'Delete Routine'} />
      <p>Are you sure you want to delete this?</p>
      <ModalButtonList
        onCancel={closeModal}
        onDelete={() => {
          if (isWorkout) {
            api.handleDeleteRoutine(itemId);
          } else {
            api.handleDeleteWorkout(itemId);
          }
          closeModal();
        }}
        isDelete
      />
    </ModalContentDeleteContainer>
  );
};

ModalContentDelete.propTypes = {
  closeModal: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  isWorkout: PropTypes.bool
};

export default ModalContentDelete;

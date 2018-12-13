import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AdminWorkoutItemContainer,
  AdminWorkoutItemSection,
  DeleteIcon
} from './AdminWorkoutItem.styles';
import AdminItemBlock from '../AdminItemBlock/AdminItemBlock';
import AdminItemEditButton from '../AdminItemEditButton/AdminItemEditButton';

const AdminWorkoutItem = ({ workout, onEditClick, onDeleteClick }) => {
  const { name, sets, reps, startingWeight, weightToAdd, time } = workout;
  console.log(workout);
  let minutes = !!time.minutes ? time.minutes : '00';
  let seconds = !!time.seconds ? time.seconds : '00';
  return (
    <AdminWorkoutItemContainer>
      <AdminWorkoutItemSection>
        <AdminItemBlock title="Name:" value={name} />
        <AdminItemEditButton onClick={onEditClick} />
        <DeleteIcon icon="minus-circle" onClick={onDeleteClick} />
      </AdminWorkoutItemSection>
      <AdminWorkoutItemSection>
        <AdminItemBlock title="Sets & Reps:" value={`${sets}x${reps}`} />
        <AdminItemBlock title="Starting Weight:" value={`${startingWeight}lbs`} />
        <AdminItemBlock title="Weight To Add:" value={`${weightToAdd}lbs`} />
        <AdminItemBlock title="Timer:" value={`${minutes}:${seconds}`} noSpan />
      </AdminWorkoutItemSection>
    </AdminWorkoutItemContainer>
  );
};

AdminWorkoutItem.propTypes = {
  workout: PropTypes.oneOfType({
    name: PropTypes.string.isRequired,
    startingWeight: PropTypes.string.isRequired,
    weightToAdd: PropTypes.string.isRequired,
    sets: PropTypes.string.isRequired,
    reps: PropTypes.string.isRequired,
    time: PropTypes.oneOfType({
      minutes: PropTypes.string.isRequired,
      seconds: PropTypes.string.isRequired
    }).isRequired
  }),
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AdminWorkoutItem;

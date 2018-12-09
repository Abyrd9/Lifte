import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Divider } from '../Layout';
import {
  BlockContainer,
  ListItemBlock,
  ListItemSetsReps,
  EditButton,
  DeleteButton
} from './AdminListItemElements';
import { AdminContext } from '../../contexts//AdminContext';
import AdminModal from './AdminModal';
import ModalContentWorkout from '../ModalContentWorkout/ModalContentWorkout';
import AdminModalButtons from './AdminModalButtons';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 10px 0px;
    `;
  }}
`;

class AdminWorkoutListItem extends Component {
  state = { editModalIsOpen: false, deleteModalIsOpen: false };
  static contextType = AdminContext;
  render() {
    const { name, sets, reps, startingWeight, weightToAdd, workoutId } = this.props;
    const initialWorkout = {
      name,
      startingWeight,
      weightToAdd,
      sets,
      reps
    };
    return (
      <React.Fragment>
        <Container>
          <BlockContainer>
            <ListItemBlock name="Name:" value={name} />
            <EditButton onClick={() => this.setState({ editModalIsOpen: true })} />
            <DeleteButton onClick={() => this.setState({ deleteModalIsOpen: true })} />
          </BlockContainer>
          <BlockContainer>
            <ListItemSetsReps name="Sets & Reps:" sets={sets} reps={reps} />
            <ListItemBlock name="Starting Weight:" value={`${startingWeight}lbs`} />
            <ListItemBlock name="Weight To Add:" value={`${weightToAdd}lbs`} noSpan />
          </BlockContainer>
          <Divider />
        </Container>
        {this.state.editModalIsOpen && (
          <AdminModal title="Edit Workout">
            <ModalContentWorkout
              type="edit"
              closeModal={() => this.setState({ editModalIsOpen: false })}
              initialWorkout={initialWorkout}
              workoutId={workoutId}
            />
          </AdminModal>
        )}
        {this.state.deleteModalIsOpen && (
          <AdminModal title="Delete Workout" text="Are you sure you want to delete this workout?">
            <AdminModalButtons
              onCancelClick={() => this.setState({ deleteModalIsOpen: false })}
              onActionClick={() => {
                this.context.handleDeleteWorkout(workoutId);
                this.setState({ deleteModalIsOpen: false });
              }}
              disabled={false}
              buttonText="Delete"
            />
          </AdminModal>
        )}
      </React.Fragment>
    );
  }
}

AdminWorkoutListItem.propTypes = {};

export default AdminWorkoutListItem;

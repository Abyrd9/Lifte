import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '../LayoutElements';
import AdminWorkoutItem from '../AdminWorkoutItem/AdminWorkoutItem';
import WorkoutsListener from '../../contexts/WorkoutsListener';
import Modal from '../Modal/Modal';
import ModalContentWorkout from '../ModalContentWorkout/ModalContentWorkout';
import ModalContentDelete from '../ModalContentDelete/ModalContentDelete';

class AdminWorkoutList extends Component {
  state = {
    currentWorkout: {},
    isEditModalOpen: false,
    isDeleteModalOpen: false
  };
  render() {
    const { currentWorkout, isEditModalOpen, isDeleteModalOpen } = this.state;
    return (
      <Fragment>
        <WorkoutsListener>
          {({ workouts }) =>
            !!workouts &&
            workouts.length > 0 &&
            workouts.map(workout => (
              <Fragment>
                <AdminWorkoutItem
                  workout={workout}
                  onEditClick={() => {
                    this.setState({
                      currentWorkout: workout,
                      isEditModalOpen: true,
                      isDeleteModalOpen: false
                    });
                  }}
                  onDeleteClick={() => {
                    this.setState({
                      currentWorkout: workout,
                      isEditModalOpen: false,
                      isDeleteModalOpen: true
                    });
                  }}
                />
                <Divider />
              </Fragment>
            ))
          }
        </WorkoutsListener>
        {isEditModalOpen && currentWorkout.hasOwnProperty('workoutId') && (
          <Modal>
            <ModalContentWorkout
              initialWorkout={currentWorkout}
              closeModal={() => this.setState({ isEditModalOpen: false })}
            />
          </Modal>
        )}
        {isDeleteModalOpen && currentWorkout.hasOwnProperty('workoutId') && (
          <Modal>
            <ModalContentDelete
              closeModal={() => this.setState({ isDeleteModalOpen: false })}
              itemId={currentWorkout.workoutId}
              isWorkout
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

AdminWorkoutList.propTypes = {};

export default AdminWorkoutList;

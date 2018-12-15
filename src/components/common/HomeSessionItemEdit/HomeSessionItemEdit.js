import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
import {
  HomeSessionItemEditContainer,
  HomeSessionItemEditSection,
  TitleSection,
  SetsSection,
  CompletedButton,
  EditButton,
  EditIcon
} from './HomeSessionItemEdit.styles';
import ModalContentTimer from '../ModalContentTimer/ModalContentTimer';
import Modal from '../Modal/Modal';
import ModalContentSession from '../ModalContentSession/ModalContentSession';

class HomeSessionItemEdit extends Component {
  state = { modalOpen: false };
  toggleWorkoutSetComplete = (val, index) => {
    const { workout, currentSessionIndex, routineId } = this.props;
    let newWorkout = JSON.parse(JSON.stringify(workout));
    newWorkout.sessions[currentSessionIndex].completedSetsArr[index].completed = val;
    newWorkout.sessions[currentSessionIndex].completed = newWorkout.sessions[
      currentSessionIndex
    ].completedSetsArr.every(item => item.completed);
    console.log(newWorkout);
    api.handleUpdateSessionInWorkout(routineId, workout.workoutId, newWorkout);
  };

  render() {
    const { modalOpen } = this.state;
    const { workout, currentSessionIndex, routineId } = this.props;
    const {
      name,
      time: { minutes, seconds },
      sessions
    } = workout;
    const { reps, sets, weight, completedSetsArr } = sessions[currentSessionIndex];
    return (
      <Fragment>
        <HomeSessionItemEditContainer>
          <HomeSessionItemEditSection>
            <TitleSection>
              <h1>{name}</h1>
              <div>
                <h2>{weight}lbs</h2>
                <span />
                <p>
                  {sets}x{reps}
                </p>
              </div>
            </TitleSection>
            <SetsSection>
              <h3>Sets:</h3>
              <div>
                {!!completedSetsArr &&
                  completedSetsArr.length > 0 &&
                  completedSetsArr.map((completedSet, i) => (
                    <CompletedButton
                      isComplete={completedSet.completed}
                      onClick={e => {
                        e.stopPropagation();
                        this.toggleWorkoutSetComplete(!completedSet.completed, i);
                      }}
                    />
                  ))}
              </div>
            </SetsSection>
          </HomeSessionItemEditSection>
          <HomeSessionItemEditSection>
            <ModalContentTimer minutes={minutes} seconds={seconds} />
            <EditButton
              onClick={e => {
                e.stopPropagation();
                this.setState({ modalOpen: true });
              }}>
              Edit <EditIcon icon="edit" />
            </EditButton>
          </HomeSessionItemEditSection>
        </HomeSessionItemEditContainer>
        {modalOpen && (
          <Modal>
            <ModalContentSession
              workout={workout}
              currentSessionIndex={currentSessionIndex}
              routineId={routineId}
              closeModal={() => this.setState({ modalOpen: false })}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

HomeSessionItemEdit.propTypes = {};

export default HomeSessionItemEdit;

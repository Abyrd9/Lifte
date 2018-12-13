import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Background, Container, Divider } from './common/LayoutElements';
import Header from './common/Header/Header';
import PageTitle from './common/PageTitle/PageTitle';
import GoalWeightListener from './contexts/GoalWeightListener';
import AdminGoalWeight from './common/AdminGoalWeight/AdminGoalWeight';
import AdminTabs from './common/AdminTabs/AdminTabs';
import AdminAddButton from './common/AdminAddButton/AdminAddButton';
import AdminWorkoutList from './common/AdminWorkoutList/AdminWorkoutList';
import AdminRoutineList from './common/AdminRoutineList/AdminRoutineList';
import ModalContentWorkout from './common/ModalContentWorkout/ModalContentWorkout';
import ModalContentRoutine from './common/ModalContentRoutine/ModalContentRoutine';

import Modal from './common/Modal/Modal';

class Admin extends Component {
  state = {
    currentTab: 'routines',
    changeTab: val => this.setState({ currentTab: val }),
    adminModalOpen: false
  };

  render() {
    const { currentTab, adminModalOpen, changeTab } = this.state;
    return (
      <Background>
        <Header hasBackButton />
        <Container>
          <PageTitle title="Admin" />
          <GoalWeightListener>
            {({ weight }) => <AdminGoalWeight weight={weight} />}
          </GoalWeightListener>
          <AdminTabs currentTab={currentTab} changeTab={changeTab} />
          <Divider />
          <AdminAddButton
            currentTab={currentTab}
            onClick={() => this.setState({ adminModalOpen: true })}
          />
        </Container>
        <Container>
          <PageTitle title={currentTab === 'routines' ? 'Routines' : 'Workouts'} />
          {currentTab === 'workouts' && <AdminWorkoutList />}
          {currentTab === 'routines' && <AdminRoutineList />}
        </Container>
        {adminModalOpen && (
          <React.Fragment>
            {currentTab === 'routines' && (
              <Modal>
                <ModalContentRoutine closeModal={() => this.setState({ adminModalOpen: false })} />
              </Modal>
            )}
            {currentTab === 'workouts' && (
              <Modal>
                <ModalContentWorkout closeModal={() => this.setState({ adminModalOpen: false })} />
              </Modal>
            )}
          </React.Fragment>
        )}
      </Background>
    );
  }
}

Admin.propTypes = {};

export default Admin;

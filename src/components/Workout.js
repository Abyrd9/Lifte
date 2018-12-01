import React, { Component } from 'react';
import firebase from 'firebase';
import { Background, Container } from './common/Layout';
import WorkoutTitle from './common/Workout/WorkoutTitle';
import Header from './common/Header';
import FooterButtonsContainer from './common/FooterButtonsContainer';
import Dropdown from './common/Dropdown';
import AdminContextComponent from './common/Contexts/AdminContext';
import WorkoutRoutineSelector from './common/Workout/WorkoutRoutineSelector';

class Workout extends Component {
  state = {
    isEditable: false,
    routines: [],
    workouts: [],
    currentRoutine: {
      name: '',
      routineId: ''
    }
  };
  render() {
    return (
      <Background hasContainer>
        <Header />
        <AdminContextComponent>
          <Container>
            <WorkoutTitle weight={180} isEditable={this.state.isEditable} />
          </Container>
          <Container>
            <WorkoutRoutineSelector onClick={val => this.setState({ currentRoutine: val })} currentRoutine={this.state.currentRoutine} />
          </Container>
        </AdminContextComponent>
        <FooterButtonsContainer isEditable={this.state.isEditable} onEditClick={() => this.setState({ isEditable: !this.state.isEditable })} />
      </Background>
    );
  }
}

export default Workout;

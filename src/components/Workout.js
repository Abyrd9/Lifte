import React, { Component } from 'react';
import { Background, Container } from './common/Layout';
import WorkoutTitle from './common/Workout/WorkoutTitle';
import Header from './common/Header';
import FooterButtonsContainer from './common/FooterButtonsContainer';
import Dropdown from './common/Dropdown';

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
        <Container>
          <WorkoutTitle weight={180} isEditable={this.state.isEditable} />
        </Container>
        <Container>
          <Dropdown
            placeholder="Choose Your Routine..."
            currentRoutine={this.state.currentRoutine}
            handleChangeCurrentRoutine={val =>
              this.setState({ currentRoutine: val })
            }
          />
        </Container>
        <FooterButtonsContainer
          isEditable={this.state.isEditable}
          onEditClick={() =>
            this.setState({ isEditable: !this.state.isEditable })
          }
        />
      </Background>
    );
  }
}

export default Workout;

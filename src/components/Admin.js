import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { Background, Container, Divider } from './common/Layout';
import Header from './common/Header';
import AdminTabs from './common/Admin/AdminTabs';
import AdminAddButton from './common/Admin/AdminAddButton';
import AdminModal from './common/Admin/AdminModal';
import AdminTitle from './common/Admin/AdminTitle';
import AdminList from './common/Admin/AdminList';
import AdminContextComponent from './common/Contexts/AdminContext';
import WorkoutModalContent from './common/Admin/WorkoutModalContent';
import RoutineModalContent from './common/Admin/RoutineModalContent';
import AdminModalButtons from './common/Admin/AdminModalButtons';

class Admin extends Component {
  state = {
    currentTab: 'routines',
    changeTab: val => this.setState({ currentTab: val }),
    modalIsOpen: false
  };

  render() {
    return (
      <Background>
        <Header hasBackButton />
        <AdminContextComponent>
          <Container>
            <AdminTitle isHalf title="Admin" />
            <AdminTabs
              currentTab={this.state.currentTab}
              changeTab={this.state.changeTab}
            />
            <Divider />
            <AdminAddButton
              currentTab={this.state.currentTab}
              onClick={() => this.setState({ modalIsOpen: true })}
            />
          </Container>
          <Container>
            <AdminTitle
              title={
                this.state.currentTab === 'routines' ? 'Routines' : 'Workouts'
              }
            />
            <AdminList type={this.state.currentTab} />
          </Container>
        </AdminContextComponent>
        {this.state.modalIsOpen && (
          <React.Fragment>
            {this.state.currentTab === 'routines' && (
              <AdminModal title="Create New Routine">
                <RoutineModalContent
                  type="create"
                  closeModal={() => this.setState({ modalIsOpen: false })}
                />
              </AdminModal>
            )}
            {this.state.currentTab === 'workouts' && (
              <AdminModal title="Create New Workout">
                <WorkoutModalContent
                  type="create"
                  closeModal={() => this.setState({ modalIsOpen: false })}
                />
              </AdminModal>
            )}
          </React.Fragment>
        )}
      </Background>
    );
  }
}

Admin.propTypes = {};

export default Admin;

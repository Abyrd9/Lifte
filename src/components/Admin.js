import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { Background, Container, Divider } from './common/Layout';
import Header from './common/Header';
import AdminTabs from './common/Admin/AdminTabs';
import AdminAddButton from './common/Admin/AdminAddButton';
import AdminTitle from './common/Admin/AdminTitle';
import AdminList from './common/Admin/AdminList';
import AdminContextComponent from './contexts/AdminContext';
import ModalContentWorkout from './common/ModalContentWorkout/ModalContentWorkout';
import ModalContentRoutine from './common/ModalContentRoutine/ModalContentRoutine';
import AdminModalButtons from './common/Admin/AdminModalButtons';

import Modal from './common/Modal/Modal';

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
            <AdminTabs currentTab={this.state.currentTab} changeTab={this.state.changeTab} />
            <Divider />
            <AdminAddButton
              currentTab={this.state.currentTab}
              onClick={() => this.setState({ modalIsOpen: true })}
            />
          </Container>
          <Container>
            <AdminTitle title={this.state.currentTab === 'routines' ? 'Routines' : 'Workouts'} />
            <AdminList type={this.state.currentTab} />
          </Container>
        </AdminContextComponent>
        {this.state.modalIsOpen && (
          <React.Fragment>
            {this.state.currentTab === 'routines' && (
              <Modal>
                <ModalContentRoutine closeModal={() => this.setState({ modalIsOpen: false })} />
              </Modal>
            )}
            {this.state.currentTab === 'workouts' && (
              <Modal>
                <ModalContentWorkout closeModal={() => this.setState({ modalIsOpen: false })} />
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

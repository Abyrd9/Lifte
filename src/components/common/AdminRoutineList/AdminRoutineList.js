import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '../LayoutElements';
import RoutinesListener from '../../contexts/RoutinesListener';
import AdminRoutineItem from '../AdminRoutineItem/AdminRoutineItem';
import Modal from '../Modal/Modal';
import ModalContentRoutine from '../ModalContentRoutine/ModalContentRoutine';
import ModalContentDelete from '../ModalContentDelete/ModalContentDelete';

class AdminRoutineList extends Component {
  state = {
    currentRoutine: {},
    isEditModalOpen: false,
    isDeleteModalOpen: false
  };
  render() {
    const { currentRoutine, isEditModalOpen, isDeleteModalOpen } = this.state;
    return (
      <Fragment>
        <RoutinesListener>
          {({ routines }) =>
            !!routines &&
            routines.length > 0 &&
            routines.map((routine, index) => (
              <Fragment>
                <AdminRoutineItem
                  routine={routine}
                  onEditClick={() => {
                    this.setState({
                      currentRoutine: routine,
                      isEditModalOpen: true,
                      isDeleteModalOpen: false
                    });
                  }}
                  onDeleteClick={() => {
                    this.setState({
                      currentRoutine: routine,
                      isEditModalOpen: false,
                      isDeleteModalOpen: true
                    });
                  }}
                />
                {index + 1 !== routines.length && <Divider />}
              </Fragment>
            ))
          }
        </RoutinesListener>
        {isEditModalOpen && currentRoutine.hasOwnProperty('routineId') && (
          <Modal>
            <ModalContentRoutine
              initialRoutine={this.state.currentRoutine}
              closeModal={() => this.setState({ isEditModalOpen: false })}
            />
          </Modal>
        )}
        {isDeleteModalOpen && currentRoutine.hasOwnProperty('routineId') && (
          <Modal>
            <ModalContentDelete
              closeModal={() => this.setState({ isDeleteModalOpen: false })}
              itemId={currentRoutine.routineId}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

AdminRoutineList.propTypes = {};

export default AdminRoutineList;

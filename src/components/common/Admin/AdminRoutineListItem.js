import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Divider } from '../Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  BlockContainer,
  ListItemBlock,
  EditButton,
  ListItemSessions,
  DeleteButton
} from './AdminListItemElements';
import { AdminContext } from '../../contexts/AdminContext';
import AdminModal from './AdminModal';
import RoutineModalContent from './RoutineModalContent';
import AdminModalButtons from './AdminModalButtons';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      margin-left: 5px;
      height: 8px;
    `;
  }}
`;

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css``;
  }}
`;

class AdminRoutineListItem extends Component {
  state = { editModalIsOpen: false, deleteModalIsOpen: false };
  static contextType = AdminContext;
  render() {
    const { name, sessionLength, currentSession, workouts, routineId, onClick } = this.props;
    const initialRoutine = {
      name,
      sessionLength,
      currentSession,
      workouts
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
            <ListItemSessions name="# of Sessions" value={sessionLength} />
          </BlockContainer>
          {this.props.children}
        </Container>
        {this.state.editModalIsOpen && (
          <AdminModal>
            <RoutineModalContent
              type="edit"
              closeModal={() => this.setState({ editModalIsOpen: false })}
              initialRoutine={initialRoutine}
              routineId={routineId}
            />
          </AdminModal>
        )}
        {this.state.deleteModalIsOpen && (
          <AdminModal title="Delete Routine" text="Are you sure you want to delete this routine?">
            <AdminModalButtons
              onCancelClick={() => this.setState({ deleteModalIsOpen: false })}
              onActionClick={() => {
                this.context.handleDeleteRoutine(routineId);
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

AdminRoutineListItem.propTypes = {};

export default AdminRoutineListItem;

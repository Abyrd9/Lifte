import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      margin: 0px 8px;
    `;
  }}
`;

const AddButton = styled(Button)`
  ${props => {
    const { theme } = props;
    return css`
      padding: 10px 0px;
      box-shadow: ${theme.shadow};
    `;
  }}
`;

class AdminAddButton extends Component {
  render() {
    return (
      <AddButton isFullWidth isSecondary onClick={this.props.onClick}>
        {this.props.currentTab === 'routines' && 'Add New Routine'}
        {this.props.currentTab === 'workouts' && 'Add New Workout'}
        <Icon icon="plus-circle" />
      </AddButton>
    );
  }
}

export default AdminAddButton;

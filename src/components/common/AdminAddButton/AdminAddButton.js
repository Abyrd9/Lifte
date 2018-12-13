import React, { Component } from 'react';
import { AddButton, Icon } from './AdminAddButton.styles';

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

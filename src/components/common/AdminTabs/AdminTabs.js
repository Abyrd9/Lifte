import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContainer, TabButton } from './AdminTabs.styles';

class AdminTabs extends Component {
  render() {
    const { currentTab, changeTab } = this.props;
    return (
      <TabContainer>
        <TabButton
          isFullWidth
          isSecondary
          isActive={currentTab === 'routines'}
          onClick={() => changeTab('routines')}>
          Routines
        </TabButton>
        <TabButton
          isFullWidth
          isSecondary
          isActive={currentTab === 'workouts'}
          onClick={() => changeTab('workouts')}>
          Workouts
        </TabButton>
      </TabContainer>
    );
  }
}

AdminTabs.propTypes = {};

export default AdminTabs;

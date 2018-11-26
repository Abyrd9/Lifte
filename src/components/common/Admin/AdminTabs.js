import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../Button';

const TabContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  }}
`;

const TabButton = styled(Button)`
  ${props => {
    const { theme } = props;
    return css`
      &:first-child {
        margin-right: 5px;
      }
      &:last-child {
        margin-left: 5px;
      }
      ${!props.isActive &&
        `
				background-color: ${theme.colors.whiteSecondary};
        color: ${theme.colors.blackSecondary};
			`}
      ${props.isActive &&
        `
				box-shadow: ${theme.shadow};
			`}
    `;
  }}
`;

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

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';
import { AdminContext } from '../../contexts/AdminContext';

const ButtonContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      justify-content: space-evenly;
    `;
  }}
`;

class AdminModalButtons extends Component {
  render() {
    const { buttonText, onCancelClick, onActionClick, disabled } = this.props;
    return (
      <ButtonContainer>
        <Button onClick={onCancelClick}>Cancel</Button>
        <Button disabled={disabled} onClick={onActionClick}>
          {!!buttonText ? buttonText : 'Save'}
        </Button>
      </ButtonContainer>
    );
  }
}

export default AdminModalButtons;

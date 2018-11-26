import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      margin-top: 8px;
      button {
        flex: 1;
        padding: 10px 0;
        background-color: ${theme.colors.primary};
        margin: 0px 5px;
        font-size: 14px;
        font-weight: 600;
        color: ${theme.colors.white};
        border-radius: 3px;
        &:disabled {
          background-color: ${theme.colors.blackSecondary};
          color: ${theme.colors.whiteSecondary};
        }
      }
    `;
  }}
`;

class ModalButtons extends Component {
  render() {
    return (
      <Container>
        <button onClick={this.props.onCancel}>Cancel</button>
        <button onClick={this.props.onSave} disabled={this.props.saveDisabled}>
          Save
        </button>
      </Container>
    );
  }
}

ModalButtons.propTypes = {};

export default ModalButtons;

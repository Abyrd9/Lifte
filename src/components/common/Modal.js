import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const BackDrop = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      width: 100%;
      background-color: ${theme.colors.white};
      padding: 15px;
    `;
  }}
`;

class Modal extends Component {
  modalContainer = document.getElementById('modal');
  modalContent = (
    <BackDrop>
      <Content>{this.props.children}</Content>
    </BackDrop>
  );
  render() {
    return ReactDOM.createPortal(this.modalContent, this.modalContainer);
  }
}

Modal.propTypes = {};

export default Modal;

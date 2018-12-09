import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Modal from '../Modal';
import AdminContextComponent from '../../contexts/AdminContext';

const Title = styled.h1`
  ${props => {
    const { theme } = props;
    return css`
      ${theme.font(18, 400)};
      color: ${theme.colors.black};
      text-align: ${props.isCentered ? 'center' : 'left'};
      span {
        display: block;
        width: 80px;
        height: 2px;
        background-color: ${theme.colors.primary};
        margin: ${props.isCentered ? '10px auto' : '10px 0px'};
      }
      & ~ p {
        ${theme.font(14, 400)};
        color: ${theme.colors.gray};
        text-align: ${props.isCentered ? 'center' : 'left'};
      }
    `;
  }}
`;

class AdminModal extends Component {
  render() {
    const { children, title, text, isCentered } = this.props;
    return (
      <Modal>
        <Title isCentered={isCentered}>
          {title}
          <span />
        </Title>
        {!!text && <p>{text}</p>}
        <AdminContextComponent>{children}</AdminContextComponent>
      </Modal>
    );
  }
}

AdminModal.propTypes = {};

export default AdminModal;

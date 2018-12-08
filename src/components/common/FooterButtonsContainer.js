import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import FooterButton from './FooterButton';
import { Link } from 'react-router-dom';

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  top: calc(100% - 60px);
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
`;

const EllipsesIcon = styled(FooterButton)`
  ${props => css`
		height: 40px;
		width: 40px;
    font-size: 16px;
		transition: ${props.theme.transition('all', 0.1)}
		transform: ${props.isOpen ? 'rotate(-45deg)' : 'rotate(0deg)'};
  `}
`;

const AddIcon = styled(FooterButton)`
  ${props => css`
    position: absolute;
    top: -50px;
    left: calc(100% - 70px);
    transform: ${props.isOpen
      ? 'scale(1) translate(0px, 0px)'
      : 'scale(0) translate(6px, 40px)'};
    transform-origin: bottom right;
    opacity: ${props.isOpen ? '1' : '0'};
    transition: ${props.theme.transition('all', 0.2)};
  `}
`;

const EditIcon = styled(FooterButton)`
  ${props => css`
    position: absolute;
    top: -5px;
    left: calc(100% - 110px);
    transform: ${props.isOpen
      ? 'scale(1) translate(0px, 0px)'
      : 'scale(0) translate(40px, 5px)'};
    transform-origin: bottom right;
    opacity: ${props.isOpen ? '1' : '0'};
    transition: ${props.theme.transition('all', 0.2)};
  `}
`;

class FooterButtonsContainer extends Component {
  state = {
    isOpen: false
  };

  render() {
    const { isOpen } = this.state;
    const { onEditClick, isEditable } = this.props;
    return (
      <Container>
        <Link to="admin">
          <AddIcon
            onClick={() => this.setState({ isOpen: !isOpen })}
            isOpen={isOpen}
            disabled={!isOpen}
            icon="plus"
          />
        </Link>
        <EditIcon
          onClick={onEditClick}
          isOpen={isOpen}
          disabled={!isOpen}
          icon={isEditable ? 'save' : 'edit'}
        />
        <EllipsesIcon
          isOpen={isOpen}
          icon={isOpen ? 'caret-down' : 'ellipsis-v'}
          size="1x"
          onClick={() => this.setState({ isOpen: !isOpen })}
        />
      </Container>
    );
  }
}

export default FooterButtonsContainer;

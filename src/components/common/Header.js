import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const PersonIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      font-size: 18px;
    `;
  }}
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      font-size: 18px;
    `;
  }}
`;

const HeaderContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      display: flex;
      justify-content: ${props.hasBackButton ? 'space-between' : 'flex-end'};
      align-items: center;
      button {
        ${theme.font(14, 600)};
        background-color: ${theme.colors.white};
        border-radius: 2px;
        padding: 5px 8px;
        position: absolute;
        right: 40px;
        top: 12px;
        color: ${theme.colors.black};
        transition: ${theme.transition('all', 0.2)};
        transform: ${props.isOpen ? 'translateX(0)' : 'translate(10px)'};
        opacity: ${props.isOpen ? '1' : '0'};
      }
    `;
  }}
`;

class Header extends Component {
  state = { isOpen: false };
  render() {
    return (
      <HeaderContainer
        isOpen={this.state.isOpen}
        hasBackButton={this.props.hasBackButton}>
        {this.props.hasBackButton && (
          <Link to="/workout">
            <ArrowIcon icon="arrow-left" />
          </Link>
        )}
        <Link to="/login">
          <button
            disabled={!this.state.isOpen}
            onClick={() =>
              firebase
                .auth()
                .signOut()
                .then(() => console.log('succesfully signed out'))
                .catch(err => console.log(err))
            }>
            Sign Out
          </button>
        </Link>
        <PersonIcon
          icon="user"
          size="1x"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        />
      </HeaderContainer>
    );
  }
}

Header.propTypes = {};

export default Header;

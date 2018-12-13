import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HeaderContainer, UserIcon, ArrowIcon } from './Header.styles';
import * as api from '../../../helpers/api';

class Header extends Component {
  state = { menuOpen: false };
  render() {
    const { menuOpen } = this.state;
    const { hasBackButton } = this.props;
    return (
      <HeaderContainer isOpen={menuOpen} hasBackButton={hasBackButton}>
        {hasBackButton && (
          <Link to="/home">
            <ArrowIcon icon="arrow-left" />
          </Link>
        )}
        <Link to="/login">
          <button disabled={!menuOpen} onClick={() => api.handleSignOut()}>
            Sign Out
          </button>
        </Link>
        <UserIcon icon="user" size="1x" onClick={() => this.setState({ menuOpen: !menuOpen })} />
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  hasBackButton: PropTypes.bool
};

export default Header;

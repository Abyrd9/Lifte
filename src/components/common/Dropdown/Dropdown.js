import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, DropdownList, DropdownIcon } from './Dropdown.styles';

class Dropdown extends Component {
  state = {
    isOpen: false
  };
  render() {
    const { placeholder, value, children } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <DropdownButton
          onClick={() => this.setState({ isOpen: !isOpen })}
          hasValue={!!value && value.length > 0}>
          {!!value && value.length > 0 ? value : placeholder}{' '}
          <DropdownIcon icon="caret-down" size="5x" />
          <DropdownList isOpen={isOpen}>{children}</DropdownList>
        </DropdownButton>
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Dropdown;

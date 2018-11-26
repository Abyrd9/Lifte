import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const DropDown = styled.select``;

class RoutineDropdown extends Component {
  render() {
    const { routines } = this.props;
    return (
      <DropDown>
        {routines && routines.map(routine => <option>{routine.name}</option>)}
      </DropDown>
    );
  }
}

RoutineDropdown.propTypes = {};

export default RoutineDropdown;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const SessionItem = styled.div``;

class RoutineSessionList extends Component {
  renderElements = () => {
    const { totalSessionLength } = this.props;
    for (let i; i < totalSessionLength; i++) {
      return <SessionItem>{i}</SessionItem>;
    }
  };

  render() {
    return <Container>{this.renderElements()}</Container>;
  }
}

RoutineSessionList.propTypes = {};

export default RoutineSessionList;

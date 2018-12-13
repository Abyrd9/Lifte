import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HomeGoalWeightContainer } from './HomeGoalWeight.styles';
import { Divider } from '../LayoutElements';

const HomeGoalWeight = ({ weight }) => (
  <Fragment>
    <HomeGoalWeightContainer>
      <h1>{weight}lbs</h1>
    </HomeGoalWeightContainer>
    <Divider />
  </Fragment>
);

HomeGoalWeight.propTypes = {
  weight: PropTypes.string.isRequired
};

export default HomeGoalWeight;

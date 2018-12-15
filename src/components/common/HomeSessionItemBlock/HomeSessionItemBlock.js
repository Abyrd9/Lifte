import React from 'react';
import PropTypes from 'prop-types';
import {
  HomeSessionItemBlockContainer,
  HomeSessionItemBlockSection,
  CompletedIcon
} from './HomeSessionItemBlock.styles';

const HomeSessionItemBlock = ({ name, weight, sets, reps, minutes, seconds, isCompleted }) => {
  return (
    <HomeSessionItemBlockContainer>
      <div>
        <HomeSessionItemBlockSection>
          <h1>{name}</h1>
        </HomeSessionItemBlockSection>
        <HomeSessionItemBlockSection>
          <h2>{weight}lbs</h2>
          <span />
          <p>
            {sets}x{reps}
          </p>
          <span />
          <p>
            {!!minutes ? minutes : '00'}:{!!seconds ? seconds : '00'}
          </p>
        </HomeSessionItemBlockSection>
      </div>
      <CompletedIcon isCompleted={isCompleted} />
    </HomeSessionItemBlockContainer>
  );
};

HomeSessionItemBlock.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.string,
  sets: PropTypes.string,
  reps: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  isCompleted: PropTypes.bool
};

export default HomeSessionItemBlock;

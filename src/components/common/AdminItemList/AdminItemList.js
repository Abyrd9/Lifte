import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AdminItemListContainer, AdminItemListItem } from './AdminItemList.styles';
import { Divider } from '../LayoutElements';

const AdminItemList = ({ workouts }) => {
  return (
    <AdminItemListContainer>
      <h1>Workouts:</h1>
      <Divider isDarker />
      {!!workouts &&
        workouts.length > 0 &&
        workouts.map(workout => {
          const { name, startingWeight, sessions } = workout;
          const { sets, reps } = sessions[0];
          return (
            <Fragment>
              <AdminItemListItem>
                <h2>{name} - </h2>
                <h3>{startingWeight}lbs</h3>
                <span />
                <p>
                  {sets}x{reps}
                </p>
              </AdminItemListItem>
              <Divider isDarker />
            </Fragment>
          );
        })}
    </AdminItemListContainer>
  );
};

AdminItemList.propTypes = {
  workouts: PropTypes.oneOfType([
    {
      name: PropTypes.string.isRequired,
      startingWeight: PropTypes.string.isRequired,
      sessions: PropTypes.oneOfType([
        {
          sets: PropTypes.string.isRequired,
          reps: PropTypes.string.isRequired
        }
      ])
    }
  ])
};

export default AdminItemList;

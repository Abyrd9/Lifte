import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
import { AdminGoalWeightContainer, EditIcon, SaveIcon } from './AdminGoalWeight.styles';
import { Divider } from '../LayoutElements';

class AdminGoalWeight extends Component {
  state = { isEdit: false, weight: '' };

  componentDidMount() {
    const { weight } = this.props;
    if (weight && weight.length > 0) {
      this.setState({ weight });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.weight !== this.props.weight) {
      this.setState({ weight: this.props.weight });
    }
  }

  render() {
    const { isEdit, weight } = this.state;
    return (
      <Fragment>
        <AdminGoalWeightContainer>
          <div>
            <h3>Goal Weight:</h3>{' '}
            <div>
              {isEdit ? (
                <Fragment>
                  <input value={weight} onChange={e => this.setState({ weight: e.target.value })} />
                  <SaveIcon
                    icon="save"
                    onClick={() => {
                      api.handleUpdateGoalWeight(weight);
                      this.setState({ isEdit: false });
                    }}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <h1>{weight}lbs</h1>
                  <EditIcon icon="edit" onClick={() => this.setState({ isEdit: true })} />
                </Fragment>
              )}
            </div>
          </div>
        </AdminGoalWeightContainer>
        <Divider />
      </Fragment>
    );
  }
}

AdminGoalWeight.propTypes = {
  weight: PropTypes.string.isRequired
};

export default AdminGoalWeight;

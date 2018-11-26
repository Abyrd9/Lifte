import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import AdminTextInput from './AdminTextInput';
import AdminNumBlock from './AdminNumBlock';
import AdminSetRepBlock from './AdminSetRepBlock';
import ModalButtons from './ModalButtons';

const WeightBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  }}
`;

const SetRepBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css``;
  }}
`;

class WorkoutAdminModal extends Component {
  state = {
    name: '',
    startingWeight: '',
    weightToAdd: '',
    sets: '',
    reps: ''
  };

  render() {
    const { name, startingWeight, weightToAdd, sets, reps } = this.state;

    let formFilled = false;
    if (
      this.state.name.length > 0 &&
      this.state.startingWeight.length > 0 &&
      this.state.weightToAdd.length > 0 &&
      this.state.sets.length > 0 &&
      this.state.reps.length > 0
    ) {
      formFilled = true;
    } else {
      formFilled = false;
    }

    return (
      <React.Fragment>
        <AdminTextInput
          value={name}
          onChange={e =>
            this.setState({
              name: e.target.value
            })
          }
          labelText="Name: "
          placeholder="Workout Name..."
        />
        <WeightBlock>
          <AdminNumBlock
            type="number"
            value={weightToAdd}
            onChange={e => {
              if (e.target.value.length < 4)
                this.setState({ weightToAdd: e.target.value });
            }}
            hasValue={weightToAdd.length > 0}
            placeholder="0">
            Starting
            <br />
            Weight:{' '}
          </AdminNumBlock>
          <AdminNumBlock
            type="number"
            value={startingWeight}
            onChange={e => {
              if (e.target.value.length < 3)
                this.setState({ startingWeight: e.target.value });
            }}
            hasValue={startingWeight.length > 0}
            placeholder="0">
            Weight
            <br />
            To Add:{' '}
          </AdminNumBlock>
        </WeightBlock>
        <WeightBlock>
          <AdminSetRepBlock
            type="number"
            sets={sets}
            reps={reps}
            onSetChange={e => {
              if (e.target.value.length < 3)
                this.setState({ sets: e.target.value });
            }}
            onRepChange={e => {
              if (e.target.value.length < 3)
                this.setState({ reps: e.target.value });
            }}
          />
        </WeightBlock>
        <ModalButtons
          saveDisabled={!formFilled}
          onCancel={this.props.onCancel}
          onSave={() => {
            this.props.onSave(this.state);
            this.props.onCancel();
          }}
        />
      </React.Fragment>
    );
  }
}

WorkoutAdminModal.propTypes = {};

export default WorkoutAdminModal;

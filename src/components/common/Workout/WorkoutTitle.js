import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '../LayoutElements';
import { AdminContext } from '../../contexts/AdminContext';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.primary};
      min-width: 18px;
    `;
  }}
`;

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin-top: 10px;
      color: ${theme.colors.black};
      h1 {
        color: ${theme.colors.gray};
        text-align: center;
        ${theme.font(18, 400)};
        margin-bottom: 10px;
      }
      p {
        color: ${theme.colors.secondary};
        text-align: center;
        ${theme.font(48, 800)};
      }
      input {
        max-width: 100px;
        ${theme.font(48, 800)};
        border: none;
        color: ${theme.colors.gray};
        border-bottom: 1px solid ${theme.colors.gray};
        &:focus {
          outline: none;
        }
        max-height: 56px;
      }
      div {
        position: relative;
        display: flex;
        justify-content: center;
        svg {
          position: absolute;
          bottom: 10px;
          right: 0;
        }
      }
    `;
  }}
`;

class WorkoutTitle extends Component {
  static contextType = AdminContext;
  state = {
    weight: 0,
    edit: false
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}/goalWeight/`)
      .on('value', snapshot => {
        let goalWeight = snapshot.val();
        if (goalWeight === null) goalWeight = 0;
        this.setState({ weight: goalWeight });
      });
  }

  componentDidUpdate() {
    if (!this.props.isEditable && this.state.edit) {
      this.setState({ edit: false });
    }
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref(`users/${this.context.userId}/goalWeight/`)
      .off();
  }

  handleChangeGoalWeight = async val => {
    try {
      await firebase
        .database()
        .ref(`/users/${this.context.userId}/`)
        .update({ goalWeight: val });
      this.setState({ edit: false, weight: val });
    } catch (err) {
      console.error('Unable to update goal weight.');
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>Goal Weight:</h1>
          <Divider />
          <div>
            {/* Editing Goal Weight */}
            {this.state.edit && (
              <input
                value={this.state.weight}
                onChange={e => {
                  this.setState({ weight: e.target.value });
                }}
                maxLength="3"
              />
            )}

            {/* Showing Goal Weight */}
            {!this.state.edit && <p>{this.state.weight}lbs</p>}

            {/* Edit Icon */}
            {this.props.isEditable && (
              <Icon
                icon={this.state.edit ? 'save' : 'edit'}
                onClick={() => {
                  if (this.state.edit) {
                    let val = this.state.weight;
                    if (val.length <= 0) val = 0;
                    this.handleChangeGoalWeight(val);
                  } else {
                    this.setState({ edit: true });
                  }
                }}
              />
            )}
          </div>
        </Container>
        <Divider />
      </React.Fragment>
    );
  }
}

WorkoutTitle.propTypes = {};

export default WorkoutTitle;

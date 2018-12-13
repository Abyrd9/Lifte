import { Component } from 'react';
import firebase from 'firebase';

class GoalWeightListener extends Component {
  state = {
    weight: ''
  };

  componentDidMount() {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`/users/${userId}/goalWeight/`)
        .on('value', snapshot => {
          let weight = snapshot.val();
          weight ? (weight = weight) : (weight = '');
          this.setState({ weight });
        });
    }
  }

  componentWillUnmount() {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`/users/${userId}/goalWeight/`)
        .off();
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

export default GoalWeightListener;

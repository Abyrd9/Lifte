import firebase from 'firebase';

export const getWorkoutListListener = userId => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`/users/${userId}/workouts/`)
      .on('value', snapshot => {
        let workoutList = snapshot.val();
        workoutList ? (workoutList = Object.values(workoutList)) : (workoutList = []);
        resolve(workoutList);
      });
  });
};

export const getRoutineListListener = userId => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .on('value', snapshot => {
        let routineList = snapshot.val();
        routineList ? (routineList = Object.values(routineList)) : (routineList = []);
        resolve(routineList);
      });
  });
};

export const removeWorkoutListListener = userId => {
  firebase
    .database()
    .ref(`users/${userId}/workouts/`)
    .off();
};

export const removeRoutineListListener = userId => {
  firebase
    .database()
    .ref(`users/${userId}/routines/`)
    .off();
};

export const getWorkoutList = userId => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`/users/${userId}/workouts/`)
      .once('value', snapshot => {
        let workoutList = snapshot.val();
        workoutList ? (workoutList = Object.values(workoutList)) : (workoutList = []);
        resolve(workoutList);
      });
  });
};

export const getRoutineList = userId => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .on('value', snapshot => {
        let routineList = snapshot.val();
        routineList ? (routineList = Object.values(routineList)) : (routineList = []);
        resolve(routineList);
      });
  });
};

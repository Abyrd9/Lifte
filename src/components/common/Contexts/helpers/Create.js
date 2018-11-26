import firebase from 'firebase';

export const createWorkout = (userId, workoutId) => async workout => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/workouts/${workoutId}/`)
      .update({ ...workout, key: workoutId });
  } catch (err) {
    console.error('Unable to create new workout.');
  }
};

export const createRoutine = (userId, routineId) => async routine => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}/`)
      .update({ ...routine, key: routineId });
  } catch (err) {
    console.error('Unable to create new routine.');
  }
};

import firebase from 'firebase';

export const updateWorkout = userId => async (workout, workoutId) => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/workouts/${workoutId}`)
      .update(workout);
  } catch (err) {
    console.error('Unable to update workout.');
  }
};

export const updateRoutine = userId => async (routine, routineId) => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}`)
      .update(routine);
  } catch (err) {
    console.error('Unable to update routine.');
  }
};

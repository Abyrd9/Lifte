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

export const updateRoutineValue = userId => async (routineId, key, value) => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}`)
      .update({ [key]: value });
  } catch (err) {
    console.error('Unable to update routine.');
  }
};

export const updateRoutineWorkoutValue = userId => async (
  routineId,
  workoutId,
  key,
  value
) => {
  try {
    await firebase
      .database()
      .ref(
        `/users/${userId}/routines/${routineId}/workouts/${workoutId}/${key}`
      )
      .update(value);
  } catch (err) {
    console.error('Unable to update routine.');
  }
};

import firebase from 'firebase';

export const deleteWorkout = userId => async key => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/workouts/${key}`)
      .remove();
    let routines = {};
    await firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .once('value', snapshot => {
        routines = snapshot.val() || {};
        !!routines ? (routines = Object.values(routines)) : (routines = []);
        const newRoutineValues = routines.map(routine => {
          const newWorkouts = routine.workouts.filter(
            workout => workout.key !== key
          );
          routine.workouts = newWorkouts;
          if (newWorkouts.length > 0) {
            return routine;
          }
        });
        routines = {};
        newRoutineValues.forEach(routine => {
          if (!!routine) {
            routines = Object.assign({ [routine.key]: routine }, routines);
          }
        })
        if (Object.keys(routines).length === 0) routines = null;
      });
    await firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .set(routines);
  } catch (err) {
    console.error('Unable to remove workout.');
  }
};

export const deleteRoutine = userId => async key => {
  try {
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${key}`)
      .remove()
  } catch (err) {
    console.error('Unable to remove routine.')
  }
};

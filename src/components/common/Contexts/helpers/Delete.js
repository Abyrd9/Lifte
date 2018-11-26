import firebase from 'firebase';

const deleteWorkout = userId => async key => {
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
        routines = routines.map(routine => {
          const newWorkouts = routine.workouts.filter(
            workout => workout.workoutId !== key
          );
          routine.workouts = newWorkouts;
          return routine;
        });
      });
    await firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .update(routines);
  } catch (err) {
    console.error('Unable to remove workout.');
  }
};

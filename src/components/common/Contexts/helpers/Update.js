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
  console.log(routineId, workoutId, key, value);
  try {
    let newWorkouts;
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}/workouts/`)
      .once('value', snapshot => {
        let workouts = snapshot.val();
        workouts ? (workouts = workouts) : (workouts = []);
        newWorkouts = workouts.map(workout => {
          if (workout.key === workoutId) {
            workout.sessions.forEach(session => {
              session[key] = value;
            });
          }
          return workout;
        });
      });
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}/workouts/`)
      .update(newWorkouts);
  } catch (err) {
    console.error('Unable to update routine.', err);
  }
};

export const updateRoutineWorkout = userId => async (
  routineId,
  workoutId,
  workout,
  currentSession
) => {
  console.log(routineId, workoutId, workout, currentSession);
  try {
    let newWorkouts;
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}/workouts/`)
      .once('value', snapshot => {
        let workouts = snapshot.val();
        workouts ? (workouts = workouts) : (workouts = []);
        newWorkouts = workouts.map(workoutVal => {
          if (workoutVal.key === workoutId) {
            workoutVal.name = workout.name;
            const newSessions = workoutVal.sessions.map((session, i) => {
              if (parseInt(currentSession) === i) {
                session.weight = workout.weight;
                session.sets = workout.sets;
                session.reps = workout.reps;
              }
              return session;
            });
            workoutVal.sessions = newSessions;
          }
          return workoutVal;
        });
      });
    await firebase
      .database()
      .ref(`/users/${userId}/routines/${routineId}/workouts/`)
      .set(newWorkouts);
  } catch (err) {
    console.error('Unable to update routine.', err);
  }
};

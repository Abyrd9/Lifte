import firebase from 'firebase';
import Keygen from './Keygen';

export const handleSignOut = async () => {
  try {
    await firebase
      .auth()
      .signOut()
      .then(() => console.log('succesfully signed out'));
  } catch (err) {
    console.warn('Unable to sign out.');
    console.warn(err.code, err.message);
  }
};

export const handleGetWorkouts = async () => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      const workouts = await firebase
        .database()
        .ref(`/users/${userId}/workouts/`)
        .once('value', snapshot => {
          let workoutList = snapshot.val();
          workoutList ? (workoutList = Object.values(workoutList)) : (workoutList = []);
          return workoutList;
        });
      return workouts;
    } catch (err) {
      console.warn('Unable to get workouts.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleGetRoutines = async () => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      const routines = await firebase
        .database()
        .ref(`/users/${userId}/routines/`)
        .once('value', snapshot => {
          let routineList = snapshot.val();
          routineList ? (routineList = Object.values(routineList)) : (routineList = []);
          return routineList;
        });
      return routines;
    } catch (err) {
      console.warn('Unable to get routines.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleCreateWorkout = async workout => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      const workouts = await handleGetWorkouts();
      const workoutId = Keygen(workouts);
      await firebase
        .database()
        .ref(`/users/${userId}/workouts/${workoutId}/`)
        .update({ ...workout, workoutId });
    } catch (err) {
      console.warn('Unable to create workout.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleCreateRoutine = async routine => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      const routines = await handleGetRoutines();
      const routineId = Keygen(routines);
      await firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}/`)
        .update({ ...routine, routineId });
    } catch (err) {
      console.warn('Unable to create routine.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleUpdateWorkout = async (workoutId, workout) => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      await handleUpdateWorkoutInRoutines(userId, workoutId, workout);
      await firebase
        .database()
        .ref(`/users/${userId}/workouts/${workoutId}`)
        .update(workout);
    } catch (err) {
      console.warn('Unable to update workout.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleUpdateRoutine = async (routineId, routine) => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      await firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}`)
        .update(routine);
    } catch (err) {
      console.warn('Unable to update routine.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleUpdateWorkoutInRoutines = async (userId, workoutId, newWorkout) => {
  try {
    // Get list of all routines as an array
    let routines = await handleGetRoutines();
    routines = Object.entries(routines.val());
    // create new routines list, mapping over each routine
    routines = routines.map(routine => {
      // map over routine workouts and change the workout that matches workoutId
      routine[1].workouts.forEach(workout => {
        if (workout.workoutId === workoutId) {
          // Set new workout values
          workout.name = newWorkout.name;
          workout.startingWeight = newWorkout.startingWeight;
          workout.weightToAdd = newWorkout.weightToAdd;
          workout.time = newWorkout.time;

          // Create new sessions based on new workout values
          workout.sessions = workout.sessions.map((session, index) => {
            if (!session.completed) {
              const { startingWeight, weightToAdd, sets, reps } = newWorkout;
              const weight = parseInt(startingWeight) + parseInt(weightToAdd) * index;

              // If the sets have changed, make a new completedSetsArr
              let newCompletedSetsArr = session.completedSetsArr;
              if (session.sets !== sets) {
                newCompletedSetsArr = [];
                for (let i = 0; i < parseInt(sets); i++) {
                  newCompletedSetsArr.push({ completed: false });
                }
              }

              // Set new session values
              session.completed = false;
              session.completedSetsArr = newCompletedSetsArr;
              session.sets = sets;
              session.reps = reps;
              session.weight = weight;
            }
            return session;
          });
        }
      });
      return routine;
    });

    // turn the object.entries back into an object with the key and value pair
    routines = routines.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    // Update all routines in firebase
    await firebase
      .database()
      .ref(`/users/${userId}/`)
      .update({ routines });
  } catch (err) {
    console.log(err.code, err.message);
    console.log('Unable to update workouts within routines.');
  }
};

export const handleUpdateSessionInWorkout = async (routineId, workoutId, newWorkout) => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      let workouts = await firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}/workouts/`)
        .once('value');
      workouts = workouts.val().map(workout => {
        if (workout.workoutId === workoutId) {
          workout = newWorkout;
        }
        return workout;
      });
      await firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}/workouts`)
        .set(workouts);
    } catch (err) {
      console.warn('Unable to update routine.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleUpdateGoalWeight = async val => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      await firebase
        .database()
        .ref(`/users/${userId}/`)
        .update({ goalWeight: val });
    } catch (err) {
      console.error('Unable to update goal weight.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleDeleteWorkout = async workoutId => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      await firebase
        .database()
        .ref(`/users/${userId}/workouts/${workoutId}`)
        .remove();
      await handleDeleteWorkoutsInRoutine(workoutId, userId);
    } catch (err) {
      console.warn('Unable to remove workout.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleDeleteRoutine = async routineId => {
  const auth = firebase.auth();
  if (!!auth.currentUser) {
    const userId = auth.currentUser.uid;
    console.log(userId, 'hey there');
    try {
      await firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}`)
        .remove();
    } catch (err) {
      console.warn('Unable to remove routine.');
      console.warn(err.code, err.message);
    }
  }
};

export const handleDeleteWorkoutsInRoutine = async (workoutId, userId) => {
  try {
    // Get list of all routines as an array
    let routines = await handleGetRoutines();
    routines = Object.entries(routines.val());
    // create new routines list, mapping over each routine
    routines = routines.map(routine => {
      // map over routine workouts and change the workout that matches workoutId
      routine[1].workouts = routine[1].workouts.filter(workout => workout.workoutId !== workoutId);
      return routine;
    });

    // turn the object.entries back into an object with the key and value pair
    routines = routines.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    // Update all routines in firebase
    await firebase
      .database()
      .ref(`/users/${userId}/`)
      .update({ routines });
  } catch (err) {
    console.warn('Unable to remove workout from routines.');
    console.warn(err.code, err.message);
  }
};

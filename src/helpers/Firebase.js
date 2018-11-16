import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyD7Ym-icFfVsOK0rR_F7_DJtKvkjCOAQA0',
  authDomain: 'lifte-bb42d.firebaseapp.com',
  databaseURL: 'https://lifte-bb42d.firebaseio.com',
  projectId: 'lifte-bb42d',
  storageBucket: 'lifte-bb42d.appspot.com',
  messagingSenderId: '502835172616'
};

export const InitializeFirebase = () => {
  firebase.initializeApp(config);
};

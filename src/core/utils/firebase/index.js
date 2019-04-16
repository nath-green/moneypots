import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'moneypots1.firebaseapp.com',
  databaseURL: 'https://moneypots1.firebaseio.com',
  projectId: 'moneypots1',
  storageBucket: 'moneypots1.appspot.com',
  messagingSenderId: '220008115368'
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDM102a4b-QkR-B4gdmELtUA6S5HcmJ0Y8',
  authDomain: 'wippy-5d6a6.firebaseapp.com',
  databaseURL: 'https://wippy-5d6a6.firebaseio.com',
  projectId: 'wippy-5d6a6',
  storageBucket: 'wippy-5d6a6.appspot.com',
  messagingSenderId: '579514767533',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const storage = firebase.storage();

export const firestore = firebase.firestore();

export default firebase;

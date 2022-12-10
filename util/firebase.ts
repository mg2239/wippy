import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDM102a4b-QkR-B4gdmELtUA6S5HcmJ0Y8',
  authDomain: 'wippy-5d6a6.firebaseapp.com',
  databaseURL: 'https://wippy-5d6a6.firebaseio.com',
  projectId: 'wippy-5d6a6',
  storageBucket: 'wippy-5d6a6.appspot.com',
  messagingSenderId: '579514767533',
};

const app = initializeApp(config);

export const db = getFirestore(app);

export const storage = getStorage(app);

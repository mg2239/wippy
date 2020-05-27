import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// import admin from 'firebase-admin';

// const adminConfig = {
//   credential: admin.credential.cert({
//     projectId: process.env.PROJECT_ID,
//     privateKey: process.env.PRIVATE_KEY,
//     clientEmail: process.env.CLIENT_EMAIL,
//   }),
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
// };

// if (!admin.apps.length) {
//   admin.initializeApp(adminConfig);
// }

// export const storageAdmin = admin.storage();

// export const firestoreAdmin = admin.firestore();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;

export const storage = firebase.storage();

export const firestore = firebase.firestore();

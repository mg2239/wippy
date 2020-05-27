import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../utils/initFirebase';

function Login() {
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
}

export default Login;

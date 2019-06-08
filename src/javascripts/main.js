import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/auth/logout';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  logout.logoutEvent();
};

init();

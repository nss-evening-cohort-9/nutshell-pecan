import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/auth/logout';
import authData from './helpers/data/authData';
import newsData from './helpers/data/newsData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  logout.logoutEvent();
  authData.checkLoginStatus();
  newsData.getNewsByUid();
};

init();

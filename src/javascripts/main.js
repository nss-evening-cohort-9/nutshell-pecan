import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/auth/logout';
import authData from './helpers/data/authData';

// import events from './components/Events/events';
import news from './components/news/news';
import events from './components/Events/events';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  logout.logoutEvent();
  authData.checkLoginStatus();
  // events.getEvents();
  news.navBarActivation();
  events.getEvents();
};

init();

import firebase from 'firebase/app';
import 'firebase/auth';
import googleButton from './login.png';
import util from '../../helpers/util';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const user = firebase.auth().signInWithPopup(provider);
  console.error(user);
};

const authStringBuilder = () => {
  let domString = '<button id="google-auth" class="btn btn-warning">';
  domString += `<img src=${googleButton}>`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };

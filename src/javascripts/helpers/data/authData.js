import firebase from 'firebase/app';
import 'firebase/auth';
import diary from '../../components/diary/diary';

const authDiv = document.getElementById('auth');
const logoutDiv = document.getElementById('nav-button-logout');
const eventsDiv = document.getElementById('events-div');
const newsDiv = document.getElementById('news-div');
const diaryDiv = document.getElementById('diary-div');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      logoutDiv.classList.remove('hide');
      eventsDiv.classList.remove('hide');
      newsDiv.classList.remove('hide');
      diaryDiv.classList.remove('hide');
      diary.showWholeDiary();
    } else {
      authDiv.classList.remove('hide');
      logoutDiv.classList.add('hide');
      eventsDiv.classList.add('hide');
      newsDiv.classList.add('hide');
      diaryDiv.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };

import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'nav-button-logout') {
        firebase.auth().signOut();
      }
    });
  }
};

export default { logoutEvent };

import './diary.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import diaryData from '../../helpers/data/diaryData';
import util from '../../helpers/util';

const createNewEntry = (e) => {
  e.preventDefault();
  const newDiary = {
    date: document.getElementById('entry-date').value,
    title: document.getElementById('entry-title').value,
    entry: document.getElementById('diary-text').value,
    imageUrl: document.getElementById('diary-image').value,
    uid: firebase.auth().currentUser.uid,
  };
  diaryData.addNewEntry(newDiary)
    .then(() => {
      document.getElementById('entry-date').value = '';
      document.getElementById('entry-title').value = '';
      document.getElementById('diary-text').value = '';
      document.getElementById('diary-image').value = '';
      showWholeDiary(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no added entry', err));
};

const diaryEvents = () => {
  document.getElementById('post-new-diary').addEventListener('click', createNewEntry);
};

const displayDiary = (diary) => {
  let domString = '';
  diary.forEach((entry) => {
    domString += '<div class="card">';
    domString += `<h3 class="card-header">${entry.title}</h3>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-subtitle" text-muted>${entry.date}</h5>`;
    domString += `<img id="diary-pic" src=${entry.imageUrl}>`;
    domString += `<div>${entry.entry}</div>`;
    domString += '<div>';
    domString += '<button id="diary-edit">Edit</button>';
    domString += '<button id="diary-delete">Delete</button>';
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('diary-entries', domString);
  diaryEvents();
};

const showWholeDiary = () => {
  diaryData.getDiaryByUid()
    .then((diary) => {
      displayDiary(diary);
    })
    .catch(err => console.error('diary problem', err));
};

export default { showWholeDiary };

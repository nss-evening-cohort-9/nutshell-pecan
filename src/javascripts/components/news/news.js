import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const createNewStory = (e) => {
  e.preventDefault();
  const newStory = {
    title: document.getElementById('newsTitleForm').value,
    imageUrl: document.getElementById('imageUrlForm').value,
    synopsis: document.getElementById('synopsisForm').value,
    uid: firebase.auth().currentUser.uid,
  };
  newsData.addNewStory(newStory)
    .then(() => {
      document.getElementById('newsTitleForm').value = '';
      document.getElementById('imageUrlForm').value = '';
      document.getElementById('synopsisForm').value = '';
      getNews(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new story for you', err));
};

const deleteStoryEvent = (e) => {
  const storyId = e.target.id;
  newsData.deleteStory(storyId)
    .then(() => getNews(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

// const saveEdit = (storyId) => {
//   console.error(storyId);
//   document.getElementById('saveButton').classList.remove('hide');
//   document.getElementById('saveEditButton').classList.add('hide');
//   const news = {
//     id: storyId,
//     imageUrl: document.getElementById('imageUrlForm').value,
//     synopsis: document.getElementById('synopsisForm').value,
//     title: document.getElementById('newsTitleForm').value,
//     uid: firebase.auth().currentUser.uid,
//   };
//   // console.error(news);
//   newsData.editStory(storyId, news)
//   // getNews(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
//     .then(() => getNews(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
//   // .then(() => getNews(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
//     .catch(err => console.error('no edit', err));
// };

const eArray = [];

const editStoryEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
  // const eArray = [];
  // const storyId = e.target.id;
  // eArray.push(storyId);
  // console.error(eArray);
  // const editId = eArray.pop();
  document.getElementById('saveButton').classList.add('hide');
  document.getElementById('saveEditButton').classList.remove('hide');
  const newsTitle = $(e.target).closest('div').find('h3')[0].id;
  const storyImageUrl = $(e.target).closest('div').find('.img')[0].id;
  const storySynopsis = $(e.target).closest('div').find('p')[0].id;
  document.getElementById('newsTitleForm').value = newsTitle;
  document.getElementById('imageUrlForm').value = storyImageUrl;
  document.getElementById('synopsisForm').value = storySynopsis;
  const runArray = () => {
    const storyId = e.target.id;
    // console.error(storyId);
    eArray.push(storyId);
    // console.error(eArray);
    console.error(eArray.pop());
  };
  document.getElementById('saveEditButton').addEventListener('click', runArray, false);
};

const addEvents = () => {
  document.getElementById('saveButton').addEventListener('click', createNewStory);
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteStoryEvent);
  }
  const editButtons = document.getElementsByClassName('editButton');
  for (let i = 0; i < editButtons.length; i += 1) {
    editButtons[i].addEventListener('click', editStoryEvent);
  }
};

const domStringBuilder = (news) => {
  let domString = '';
  domString += '<div class="row text-center">';
  news.forEach((story) => {
    domString += `<div id="${story.id}" class="card col-3" style="width: 50rem;">`;
    domString += `<h3 id="${story.title}" class="title">${story.title}</h3>`;
    domString += `<img class="img" id="${story.imageUrl}" src="${story.imageUrl}" alt="news story image"/>`;
    domString += `<p id="${story.synopsis}" class="synopsis">${story.synopsis}</p>`;
    domString += `<button id="${story.id}" class="btn btn-danger deleteButton">Delete</button>`;
    domString += `<button id="${story.id}" class="btn btn-warning editButton">Edit</button>`;
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('news-div', domString);
  addEvents();
};

const getNews = (uid) => {
  document.getElementById('news-div').classList.remove('hide');
  newsData.getNewsByUid(uid)
    .then((news) => {
      domStringBuilder(news);
    })
    .catch(err => console.error('no news.js', err));
};

const navBarActivation = () => {
  document.getElementById('nav-button-news').addEventListener('click', getNews);
  document.getElementById('events-div').classList.add('hide');
  document.getElementById('diary-div').classList.add('hide');
};

export default { navBarActivation };

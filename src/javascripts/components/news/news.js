// import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

// const addEvents = () => {
//   document.getElementById('navbar-button-addMovie').addEventListener('click', newMovieBtn);
//   const addStoryButtons = document.getElementsByClassName('watchlist');
//   for (let i = 0; i < watchlistButtons.length; i += 1) {
//     watchlistButtons[i].addEventListener('click', addToWatchlistEvent);
//   }
//   const deleteButtons = document.getElementsByClassName('delete');
//   for (let i = 0; i < deleteButtons.length; i += 1) {
//     deleteButtons[i].addEventListener('click', deleteWatchlistMovieEvent);
//   }
// };

const domStringBuilder = (news) => {
  let domString = '';
  domString += '<div class="row text-center">';
  news.forEach((story) => {
    domString += `<div id="${story.id}" class="card col-3" style="width: 50rem;">`;
    domString += `<h3 id="${story.title}" class="title">${story.title}</h3>`;
    domString += `<img class="img" id="${story.imageUrl}" src="${story.imageUrl}" alt="birthday location"/>`;
    domString += `<p id="${story.synopsis}" class="synopsis">${story.synopsis}</p>`;
    domString += `<button id="${story.id}" class="btn btn-danger delete">delete</button>`;
    domString += `<button id="${story.id}" class="btn btn-warning delete">Edit</button>`;
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('news-div', domString);
  // addEvents();
};

const getNews = (uid) => {
  newsData.getNewsByUid(uid)
    .then((news) => {
      domStringBuilder(news);
    })
    .catch(err => console.error('no news.js', err));
};

export default { getNews };

import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNewsByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="jVjZ5Kl7N6OnVkn6hnke7KlJiCm1"`)
    .then((results) => {
      // console.error(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`);
      const newsResults = results.data;
      const news = [];
      console.error(newsResults);
      Object.keys(newsResults).forEach((newsId) => {
        newsResults[newsId].id = newsId;
        news.push(newsResults[newsId]);
      });
      console.error(news);
      resolve(news);
    })
    .catch(err => reject(err));
});

export default { getNewsByUid };

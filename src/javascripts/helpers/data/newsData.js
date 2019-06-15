import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewStory = storyObject => axios.post(`${firebaseUrl}/news.json`, storyObject);

const getNewsByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="jVjZ5Kl7N6OnVkn6hnke7KlJiCm1"`)
    .then((results) => {
      // console.error(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`);
      const newsResults = results.data;
      const news = [];
      Object.keys(newsResults).forEach((newsId) => {
        newsResults[newsId].id = newsId;
        news.push(newsResults[newsId]);
      });
      // console.error(news);
      resolve(news);
    })
    .catch(err => reject(err));
});

const deleteStory = storyId => axios.delete(`${firebaseUrl}/news/${storyId}.json`);

const editStory = (storyId, news) => axios.put(`${firebaseUrl}/news/${storyId}.json`, news);

export default {
  getNewsByUid, addNewStory, deleteStory, editStory,
};
